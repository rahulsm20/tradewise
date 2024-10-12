import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import dayjs from "dayjs";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  TrendingUp,
} from "lucide-react";
import { cloneElement, useEffect, useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  Pie,
  PieChart,
  XAxis,
} from "recharts";
import { z } from "zod";
import { Button } from "../../@/components/ui/button";
import { Calendar } from "../../@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../@/components/ui/chart";
import {
  assetColumns,
  debtColumns,
  expenditureColumns,
  incomeColumns,
} from "../../@/components/ui/columns";
import { DataTable } from "../../@/components/ui/data-table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../@/components/ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../@/components/ui/tabs";
import { cn, formatToLocalCurrency } from "../../@/lib/utils";
import { addUpdateExpenseItem, getExpenseData } from "../../api";
import { setExpenseData } from "../../store/expensesSlice";
import { AssetType } from "../../types";
import { chartColors } from "../../utils/constants";
import { StoreRootState } from "../../utils/types";
import Modal from "../Modal";
import TWInput from "../TWInput";

const Expenses = () => {
  const expenseData = useSelector(
    (state: StoreRootState) => state.expenses.expenseData
  );

  const dispatch = useDispatch();

  const fetchData = async () => {
    const response = await getExpenseData();
    const { assets, incomes, expenditures, debts } = response.user;
    const totalAssetsValue = assets.reduce(
      (acc: number, curr: { name: string; value: number }) => acc + curr.value,
      0
    );

    const totalIncome = incomes.reduce(
      (acc: number, curr: { name: string; value: number }) => acc + curr.value,
      0
    );
    const totalExpenditure = expenditures.reduce(
      (acc: number, curr: { name: string; value: number }) => acc + curr.value,
      0
    );
    dispatch(
      setExpenseData({
        assets,
        incomes,
        expenditures,
        debts,
        totalAssetsValue,
        totalIncome,
        totalExpenditure,
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row justify-between gap-5">
          <div className="flex flex-col gap-1">
            <CardTitle>Assets</CardTitle>
            <CardDescription>All your treasures, right here.</CardDescription>
          </div>
          <AddAssetModal fetchData={fetchData} />
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div>
            <p className="text-xl font-semibold">Total Value</p>
            <span className="text-2xl font-semibold">
              {expenseData?.totalAssetsValue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>
          <DataTable
            columns={assetColumns}
            data={expenseData ? expenseData.assets : []}
            paginate
            showPageData={false}
            previousIcon={<ChevronLeft />}
            nextIcon={<ChevronRight />}
          />
        </CardContent>
      </Card>
      <ExpenseCard
        title="Income"
        description="Track your minimum wage salary."
        AddItemButton={<AddIncomeModal fetchData={fetchData} />}
        content={
          <section className="flex flex-col gap-5">
            <div>
              <p className="text-xl font-semibold">Total Income</p>
              <span className="text-2xl font-semibold">
                {expenseData?.totalIncome.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
            <DataTable
              columns={incomeColumns}
              paginate
              showPageData={false}
              previousIcon={<ChevronLeft />}
              nextIcon={<ChevronRight />}
              data={expenseData ? expenseData.incomes : []}
            />
          </section>
        }
      />
      <ExpenseCard
        title="Expenditure"
        description="See where your money vanishes."
        AddItemButton={<AddExpenditureModal fetchData={fetchData} />}
        content={
          <DataTable
            showPageData={false}
            paginate
            previousIcon={<ChevronLeft />}
            nextIcon={<ChevronRight />}
            columns={expenditureColumns}
            data={expenseData ? expenseData.expenditures : []}
          />
        }
      />
      <ExpenseCard
        title="Analysis"
        description="Wow cool graph."
        span="lg:col-span-2"
        addableItem={false}
        content={<AnalysisSection assets={expenseData.assets} />}
      />
      <ExpenseCard
        title="Debt"
        description="Your looming financial doom."
        AddItemButton={<AddDebtModal fetchData={fetchData} />}
        content={
          <DataTable
            columns={debtColumns}
            data={expenseData ? expenseData.debts : []}
          />
        }
      />
    </div>
  );
};

const ExpenseCard = ({
  title,
  description,
  content,
  footer,
  span,
  addableItem = true,
  AddItemButton = (
    <Button className="flex gap-2">
      <Plus className="h-4 w-4" />
    </Button>
  ),
  addItem = () => {},
}: {
  title: string;
  description: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  span?: string;
  addableItem?: boolean;
  addItem?: () => void;
  AddItemButton?: React.ReactElement;
}) => {
  return (
    <Card className={`flex flex-col ${span}`}>
      <CardHeader className={`flex flex-row justify-between gap-5`}>
        <div className="flex flex-col gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {addableItem && cloneElement(AddItemButton, { onClick: addItem })}
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
};

const AnalysisSection = ({ assets }: { assets: AssetType[] }) => {
  return (
    <Tabs className="flex flex-col gap-2 w-full" defaultValue="overview">
      <div className="flex w-full items-center justify-between gap-2">
        <TabsList className="dark:bg-zinc-900 bg-slate-200 flex justify-start">
          <TabsTrigger value="overview">Assets</TabsTrigger>
          <TabsTrigger value="incomeVExpenditure">
            Income v Expenditure
          </TabsTrigger>
        </TabsList>
        {/* <TWSelect
          name="timeframe"
          className="ml-auto"
          options={[
            { label: "1D", value: "1D" },
            { label: "1W", value: "1W" },
            { label: "1M", value: "1M" },
            { label: "1Y", value: "1Y" },
            { label: "ALL", value: "ALL" },
          ]}
          value={timeFrame}
          onChange={(option) => setTimeFrame(option)}
        /> */}
      </div>
      <TabsContent value="overview">
        <Card className="flex flex-col">
          <CardHeader className="items-center">
            <CardTitle>Typewise Breakdown of Assets</CardTitle>
            <CardDescription>{dayjs().format("MMMM YYYY")}</CardDescription>
          </CardHeader>
          <CardContent>
            <AnalysisPie data={assets} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="incomeVExpenditure">
        <IncomeExpenditureChart />
      </TabsContent>
    </Tabs>
  );
};

const AnalysisPie = ({ data }: { data?: AssetType[] }) => {
  const chartData: { type: string; total: number; fill: string }[] = [];
  if (data && data.length > 0) {
    data.forEach((asset) => {
      const index = chartData.findIndex((item) => item.type === asset.type);
      if (index === -1) {
        chartData.push({
          type: asset.type,
          total: asset.value,
          fill: chartColors[chartData.length],
        });
      } else {
        chartData[index].total += asset.value;
      }
    });
  }
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.total, 0);
  }, []);

  const [innerRadius, setInnerRadius] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      const lgScreen = window.matchMedia("(min-width: 1024px)");

      if (lgScreen.matches) {
        setInnerRadius(80);
      } else {
        setInnerRadius(60);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px] lg:max-h-[400px]"
    >
      <PieChart width={500} height={400}>
        <Legend />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="total"
          nameKey="type"
          innerRadius={innerRadius}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-lg font-bold"
                    >
                      {formatToLocalCurrency(totalVisitors)}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Total Value
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

const AddAssetModal = ({ fetchData }: { fetchData: () => Promise<void> }) => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const assetFormSchema = z.object({
    name: z.string().min(2, {
      message: "Asset name must be atleast 2 characters long",
    }),
    type: z.string().min(2, {
      message: "Asset type must be atleast 2 characters long",
    }),
    value: z.coerce.number().min(0, {
      message: "Value must be greater than 0",
    }),
  });

  const assetForm = useForm({
    resolver: zodResolver(assetFormSchema),
    mode: "onBlur",
  });
  const onSubmit = async (asset: FieldValues) => {
    try {
      setLoading(true);
      await addUpdateExpenseItem({ asset });
      await fetchData();
      setLoading(false);
    } catch (err) {
      console.log({ err });
    }
  };
  return (
    <Modal
      title="Add an asset"
      description=""
      okText="Add"
      cancelText="Cancel"
      trigger={
        <Button className="flex gap-2">
          <Plus className="h-4 w-4" />
        </Button>
      }
      loading={loading}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      onOk={() => assetForm.handleSubmit(onSubmit)()}
    >
      <Form {...assetForm}>
        <form className="flex flex-col gap-3">
          <FormField
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <TWInput
                    label="Name"
                    placeholder="Name of the asset"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            name="type"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <TWInput
                    label="Type"
                    placeholder="Type of the asset"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            name="value"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <TWInput
                    label="Value (in $)"
                    type="number"
                    placeholder="Value of the asset"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Modal>
  );
};

const AddIncomeModal = ({ fetchData }: { fetchData: () => Promise<void> }) => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const incomeFormSchema = z.object({
    date: z.date(),
    source: z.string().min(2, {
      message: "Asset type must be atleast 2 characters long",
    }),
    value: z.coerce.number().min(0, {
      message: "Value must be greater than 0",
    }),
  });

  const incomeForm = useForm({
    resolver: zodResolver(incomeFormSchema),
    mode: "onBlur",
  });

  const onSubmit = async (income: FieldValues) => {
    try {
      setLoading(true);
      await addUpdateExpenseItem({ income });
      await fetchData();
      setModalOpen(false);
      setLoading(false);
      incomeForm.reset();
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add an income source"
      description=""
      okText="Add"
      cancelText="Cancel"
      trigger={
        <Button className="flex gap-2">
          <Plus className="h-4 w-4" />
        </Button>
      }
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      loading={loading}
      onOk={() => incomeForm.handleSubmit(onSubmit)()}
    >
      <Form {...incomeForm}>
        <form className="flex flex-col gap-3">
          <FormField
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="source"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <TWInput
                    label="Source"
                    placeholder="Source of the income"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            name="value"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <TWInput
                    label="Value (in $)"
                    type="number"
                    placeholder="Value of the asset"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Modal>
  );
};

const IncomeExpenditureChart = () => {
  const incomes = useSelector(
    (state: StoreRootState) => state.expenses.expenseData.incomes
  );
  const expenditures = useSelector(
    (state: StoreRootState) => state.expenses.expenseData.expenditures
  );
  let charts: {
    month: string;
    Income?: number;
    Expenditure?: number;
    color: string;
  }[] = [];

  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (incomes.length > 0) {
    incomes.forEach((income) => {
      const month = dayjs(income.date).format("MMMM");
      const index = charts.findIndex((item) => item.month === month);
      if (index === -1) {
        charts.push({
          month,
          Income: income.value,
          Expenditure: 0,
          color: "var(--color-desktop)",
        });
      } else {
        charts[index].Income = charts[index].Income
          ? charts[index].Income + income.value
          : income.value;
      }
    });
  }

  if (expenditures.length > 0) {
    expenditures.forEach((expenditure) => {
      const month = dayjs(expenditure.date).format("MMMM");
      const index = charts.findIndex((item) => item.month === month);
      if (index === -1) {
        charts.push({
          month,
          Expenditure: expenditure.value,
          Income: 0,
          color: "var(--color-desktop)",
        });
      } else {
        charts[index].Expenditure = charts[index].Expenditure
          ? charts[index].Expenditure + expenditure.value
          : expenditure.value;
      }
    });
  }

  charts = charts.sort((a, b) => {
    return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
  });
  const chartConfig = {
    income: {
      label: "Income",
      color: "hsl(var(--chart-1))",
    },
    expenditure: {
      label: "Expenditure",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income v Expenditure</CardTitle>
        <CardDescription>{`${dayjs()
          .subtract(6, "months")
          .format("MMM")} - ${dayjs().format("MMM YYYY")}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={charts}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="Income" fill="var(--color-income)" radius={4} />
            <Bar
              dataKey="Expenditure"
              fill="var(--color-expenditure)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

const AddExpenditureModal = ({
  fetchData,
}: {
  fetchData: () => Promise<void>;
}) => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const expenditureFormSchema = z.object({
    date: z.date(),
    name: z.string().min(2, {
      message: "Asset type must be atleast 2 characters long",
    }),
    value: z.coerce.number().min(0, {
      message: "Value must be greater than 0",
    }),
  });

  const expenditureForm = useForm({
    resolver: zodResolver(expenditureFormSchema),
    mode: "onBlur",
  });
  const onSubmit = async (expenditure: FieldValues) => {
    try {
      setLoading(true);
      await addUpdateExpenseItem({ expenditure });
      await fetchData();
      setLoading(false);
      setModalOpen(false);
      expenditureForm.reset();
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Add an income source"
      description=""
      okText="Add"
      cancelText="Cancel"
      trigger={
        <Button className="flex gap-2">
          <Plus className="h-4 w-4" />
        </Button>
      }
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      loading={loading}
      onOk={() => expenditureForm.handleSubmit(onSubmit)()}
    >
      <Form {...expenditureForm}>
        <form className="flex flex-col gap-3">
          <FormField
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <TWInput
                    label="Name"
                    placeholder="What did you spend on?"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            name="value"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <TWInput
                    label="Cost (in $)"
                    type="number"
                    placeholder="How much did you spend?"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Modal>
  );
};

const AddDebtModal = ({ fetchData }: { fetchData: () => Promise<void> }) => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const debtSchema = z.object({
    startDate: z.date(),
    name: z.string().min(2, {
      message: "Asset type must be atleast 2 characters long",
    }),
    amount: z.coerce.number().min(0, {
      message: "Value must be greater than 0",
    }),
    interestRate: z.coerce.number().min(0, {
      message: "Value must be greater than 0",
    }),
  });

  const debtForm = useForm({
    resolver: zodResolver(debtSchema),
    mode: "onBlur",
  });
  const onSubmit = async (debt: FieldValues) => {
    try {
      setLoading(true);
      await addUpdateExpenseItem({ debt });
      await fetchData();
      setModalOpen(false);
      setLoading(false);
      debtForm.reset();
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add a debt"
      description=""
      okText="Add"
      cancelText="Cancel"
      trigger={
        <Button className="flex gap-2">
          <Plus className="h-4 w-4" />
        </Button>
      }
      modalOpen={modalOpen}
      loading={loading}
      onOk={() => debtForm.handleSubmit(onSubmit)()}
    >
      <Form {...debtForm}>
        <form className="flex flex-col gap-3">
          <FormField
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <TWInput
                    label="Name"
                    placeholder="Name of the debt"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            name="amount"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <TWInput
                    label="Amount (in $)"
                    type="number"
                    placeholder="Debt amount"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            name="interestRate"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <TWInput
                    label="Interest Rate (% p/a)"
                    placeholder="Enter the interest rate"
                    type="number"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Modal>
  );
};

export default Expenses;
