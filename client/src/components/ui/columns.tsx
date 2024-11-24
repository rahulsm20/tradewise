import { ColumnDef } from "@tanstack/react-table";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { weiToEth } from "../../lib/utils";
import dayjs from "dayjs";
import {
  AssetType,
  DebtType,
  ExpenditureType,
  IncomeType,
  TransactionType,
} from "../../types";
import { ArrowUpDown } from "lucide-react";
import { Button } from "./button";

export const Columns: ColumnDef<TransactionType>[] = [
  {
    accessorKey: "hash",
    header: "Transaction Hash",
    cell: (info) => (
      <div
        style={{
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <TooltipProvider>
          <Tooltip>
            <CopyToClipboard text={info.cell.row.original.hash}>
              <TooltipTrigger className="hover:underline">
                {`${info.cell.row.original.hash.slice(
                  0,
                  6
                )}..${info.cell.row.original.hash.slice(-3)}`}
              </TooltipTrigger>
            </CopyToClipboard>
            <TooltipContent>
              <p>{"Copy Txn Hash"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: (info) =>
      info.cell.row.original.timestamp
        ? dayjs(new Date(info.cell.row.original.timestamp * 1000)).format(
            "YYYY-MM-DD HH:mm:ss"
          )
        : "",
  },
  {
    accessorKey: "to",
    header: "To",
    cell: (info) => (
      <TooltipProvider>
        <Tooltip>
          <CopyToClipboard text={info.cell.row.original.to}>
            <TooltipTrigger className="hover:underline">
              {`${info.cell.row.original.to.slice(
                0,
                6
              )}..${info.cell.row.original.to.slice(-3)}`}
            </TooltipTrigger>
          </CopyToClipboard>
          <TooltipContent>
            <p>{"Copy To Address"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "from",
    header: "From",
    cell: (info) => (
      <TooltipProvider>
        <Tooltip>
          <CopyToClipboard text={info.cell.row.original.from}>
            <TooltipTrigger className="hover:underline">
              {`${info.cell.row.original.from.slice(
                0,
                6
              )}..${info.cell.row.original.from.slice(-3)}`}
            </TooltipTrigger>
          </CopyToClipboard>
          <TooltipContent>
            <p>{"Copy From Address"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "value",
    header: "Value (ETH)",
    cell: (info) => `${weiToEth(info.cell.row.original.value)}`,
  },
  {
    accessorKey: "gas",
    header: "Gas (Wei)",
    cell: (info) => `${info.cell.row.original.gas || ""}`,
  },
];

export const assetColumns: ColumnDef<AssetType>[] = [
  {
    accessorKey: "name",
    header: "Asset",
    cell: (info) => info.cell.row.original.name,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (info) => info.cell.row.original.type,
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-inherit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) =>
      `${info.cell.row.original.value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}`,
  },
];

export const incomeColumns: ColumnDef<IncomeType>[] = [
  {
    accessorKey: "source",
    header: "Source",
    cell: (info) => info.cell.row.original.source,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (info) => dayjs(info.cell.row.original.date).format("Do MMM"),
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-inherit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) =>
      `${info.cell.row.original.value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}`,
  },
];

export const expenditureColumns: ColumnDef<ExpenditureType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.cell.row.original.name,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (info) => dayjs(info.cell.row.original.date).format("Do MMM"),
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-inherit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) =>
      `${info.cell.row.original.value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}`,
  },
];

export const debtColumns: ColumnDef<DebtType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.cell.row.original.name,
  },
  {
    accessorKey: "startDate",
    header: "Date",
    cell: (info) => dayjs(info.cell.row.original.startDate).format("Do MMM"),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-inherit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) =>
      `${info.cell.row.original.amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}`,
  },
  {
    accessorKey: "interestRate",
    cell: (info) => `${info.cell.row.original.interestRate}%`,
  },
];
