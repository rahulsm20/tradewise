import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "./button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginate?: boolean;
  previousIcon?: string | React.ReactNode;
  nextIcon?: string | React.ReactNode;
  showPageData?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  paginate = false,
  previousIcon = "Previous",
  nextIcon = "Next",
  showPageData = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: paginate ? getPaginationRowModel() : undefined,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      sorting,
    },
  });
  return (
    <div className="text-center w-full">
      <div className="rounded-md border text-xs ">
        <Table className="overflow-x-scroll border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className=" text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPageData && data && data.length ? (
        <TableCaption className="flex justify-center">
          Showing your last {data && data.length < 25 ? data.length : "25"}{" "}
          transactions
        </TableCaption>
      ) : (
        <></>
      )}
      {paginate && (
        <div className="flex items-center justify-end space-x-2 py-4 flex-col gap-4 md:flex-row">
          <div className="flex gap-2">
            {showPageData && (
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {previousIcon}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {nextIcon}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
