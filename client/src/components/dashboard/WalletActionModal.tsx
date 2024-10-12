import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { parseEther } from "viem";
import { useSendTransaction } from "wagmi";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../@/components/ui/form";
import { Separator } from "../../@/components/ui/separator";
import Modal from "../Modal";
import TWInput from "../TWInput";
import TWSelect from "../TWSelect";
import tokenList from "../tokenList.json";

const WalletActionModal = ({ ...props }) => {
  const { sendTransaction } = useSendTransaction();
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState([]);
  const [txDetails, setTxDetails] = useState({});
  const sendFormSchema = z.object({
    to: z.string().min(42, {
      message: "Wallet address must be 42 characters long",
    }),
    value: z.coerce.number().min(0, {
      message: "Value must be greater than 0",
    }),
  });

  const sendForm = useForm({
    resolver: zodResolver(sendFormSchema),
    mode: "onBlur",
  });

  const swapFormSchema = z.object({
    to: z.coerce.number().min(0, {
      message: "Value must be greater than 0",
    }),
    toToken: z.string().min(1, {
      message: "To Token must be selected",
    }),
    from: z.coerce.number().min(0, {
      message: "Value must be greater than 0",
    }),
    fromToken: z.string().min(1, {
      message: "From Token must be selected",
    }),
  });

  const swapForm = useForm({
    resolver: zodResolver(swapFormSchema),
    mode: "onBlur",
  });

  const swapValues = swapForm.watch();

  const tokenOptions = tokenList.map((token, idx) => ({
    label: (
      <div className="flex gap-2 items-center justify-center" key={idx}>
        <span>{token.name}</span>
        <img src={token.img} alt={token.name} className="w-4 h-4" />
      </div>
    ),
    value: token.address,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async ({ to, value }) => {
    setLoading(true);
    console.log({ to, value });
    try {
      sendTransaction({ to, value: parseEther(`${value}`) });
    } catch (e) {
      console.log({ e });
    } finally {
      setLoading(false);
    }
  };

  async function fetchPrices(one: string, two: string) {
    const res = await axios.get(`http://localhost:3001/tokenPrice`, {
      params: { addressOne: one, addressTwo: two },
    });

    setPrices(res.data);
  }
  const tokenOne = swapForm.watch("fromToken");
  const tokenOneAmount = swapForm.watch("from");
  const tokenTwo = swapForm.watch("toToken");

  async function fetchDexSwap() {
    console.log({ props });
    const allowance = await axios.get(
      `https://api.1inch.io/v5.0/1/approve/allowance?tokenAddress=${tokenOne}&walletAddress=${props.address}`
    );

    if (allowance.data.allowance === "0") {
      const approve = await axios.get(
        `https://api.1inch.io/v5.0/1/approve/transaction?tokenAddress=${tokenOne}`
      );

      setTxDetails(approve.data);
      console.log("not approved");
      return;
    }
    const tx = await axios.get(
      `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${tokenOne}&toTokenAddress=${tokenTwo}&amount=${tokenOneAmount.padEnd(
        tokenOne.decimals + tokenOneAmount.length,
        "0"
      )}&fromAddress=${props.address}`
    );

    let decimals = Number(`1E${tokenTwo.decimals}`);
    console.log((Number(tx.data.toTokenAmount) / decimals).toFixed(2));

    setTxDetails(tx.data.tx);
  }

  useEffect(() => {
    // fetchPrices(tokenList[0].address, tokenList[1].address);
    fetchDexSwap();
  }, [tokenOne, tokenOneAmount, tokenTwo]);

  useEffect(() => {
    console.log({ txDetails });
  }, [txDetails]);

  useEffect(() => {
    console.log({ swapValues });
    const { setValue } = swapForm;
    if (swapValues.from && swapValues.fromToken) {
      setValue("to", swapValues.from * 2);
    }
  }, [swapValues.from]);

  return (
    <Modal
      onOk={() => {
        console.log("ok");
        try {
          sendForm.handleSubmit(onSubmit)();
        } catch (err) {
          console.log({ err });
        }
      }}
      loading={loading}
      {...props}
    >
      {props.title == "Send" ? (
        <Form {...sendForm}>
          <form className="flex flex-col gap-5">
            <FormField
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TWInput
                      placeholder="Enter address to send to"
                      label="To"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TWInput
                      placeholder="Enter value to send"
                      label="Value (ETH)"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <Form {...swapForm}>
          <form className="flex flex-col gap-5">
            <div className="flex gap-5">
              <FormField
                name="from"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <TWInput
                          placeholder="Enter value to send"
                          label="From"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="fromToken"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TWSelect
                        placeholder="Enter value to send"
                        label="Token"
                        options={tokenOptions}
                        gap="1.5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator />
            <div className="flex gap-5">
              <FormField
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TWInput
                        label="To"
                        type="number"
                        disabled={true}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="toToken"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TWSelect
                        placeholder="Enter value to send"
                        label="Token"
                        options={tokenOptions}
                        gap="1.5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      )}
    </Modal>
  );
};

export default WalletActionModal;
