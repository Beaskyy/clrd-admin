"use client";

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";
import { useState, useRef } from "react";
import { format, parse, isAfter, isBefore, isEqual } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import Image from "next/image";
import React from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  tableName: string;
  tableDescription?: string;
  currentPage: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onRowClick?: (row: TData) => void;
  showFilter?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  // searchKey,
  tableName,
  tableDescription,
  currentPage,
  totalPages,
  onPageChange,
  onRowClick,
  showFilter = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<TData[]>(data);

  // Update filteredData when data changes (e.g., on page change)
  React.useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Helper: handle status checkbox
  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // Helper: parse date string (for company data)
  const parseDate = (dateStr: string) => {
    // Try to parse formats like "Sep 4, 2021 at 12:14 am"
    return parse(dateStr, "MMM d, yyyy 'at' hh:mm a", new Date());
  };

  // Apply filter logic
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleApply = () => {
    let filtered = data;
    // Status filter
    if (selectedStatuses.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filtered = filtered.filter((row: TData) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectedStatuses.includes((row as any).status?.toString().trim() || "")
      );
    }
    // Date filter (only if row has date_requested)
    if (fromDate || toDate) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filtered = filtered.filter((row: TData) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dateRequested = (row as any).date_requested;
        if (!dateRequested) return true;
        const rowDate = parseDate(dateRequested);
        let afterFrom = true;
        let beforeTo = true;
        if (fromDate)
          afterFrom = isAfter(rowDate, fromDate) || isEqual(rowDate, fromDate);
        if (toDate)
          beforeTo = isBefore(rowDate, toDate) || isEqual(rowDate, toDate);
        return afterFrom && beforeTo;
      });
    }
    setFilteredData(filtered);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 50,
        pageIndex: 0,
      },
    },
    manualPagination: true,
    pageCount: totalPages || 1,
  });

  // const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;
  // const totalItems = table.getFilteredRowModel().rows.length;
  // const startItem = pageIndex * pageSize + 1;
  // const endItem = Math.min((pageIndex + 1) * pageSize, totalItems);

  // Call onPageChange whenever pageIndex changes
  const handlePageChange = (newPageIndex: number) => {
    console.log(newPageIndex, "current page");
    table.setPageIndex(newPageIndex); // Update table's pageIndex
    onPageChange?.(newPageIndex + 1); // Trigger parent callback (adjust for 1-based indexing)
  };

  return (
    <div className="w-full mb-6">
      <div className="border border-[#EAECF0] rounded-2xl bg-white">
        <div className="flex justify-between items-center gap-4 px-6 rounded-t-xl md:h-[81px] bg-white border-b border-[#EAECF0]">
          <div className="flex flex-col gap-1.5 py-5">
            <h3 className="md:text-lg text-base text-[#101828] font-medium leading-[18px]">
              {tableName}
            </h3>
            <h3 className="md:text-sm text-xs text-[#667085] leading-[]14px">
              {tableDescription}
            </h3>
          </div>
          {showFilter && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  asChild
                  className="bg-white text-[#344054] rounded-lg md:text-sm text-xs font-normal md:py-2.5 py-1 md:px-[14px] px-4 md:w-[111px] w-24 border border-[#F3F4F6] md:h-11 h-9 hover:bg-[#f7f7f7]"
                >
                  <span className="flex items-center gap-2">
                    <ListFilter className="size-5 text-[#344054]" />
                    Filter by
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[287px] border border-[#F1F5F9] p-4">
                <div className="flex flex-col justify-between gap-8 min-h-[80vh]">
                  <div>
                    <SheetTitle className="">Filter by</SheetTitle>
                    <SheetDescription>
                      Select how you’ll like to filter this list
                    </SheetDescription>
                    <div className="flex flex-col gap-8 mt-8">
                      <div className="flex flex-col gap-5">
                        <h6 className="text-sm text-[#0F172A] font-semibold">
                          Status
                        </h6>
                        <div className="flex flex-col gap-[22px]">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={selectedStatuses.includes("Success")}
                              onCheckedChange={() =>
                                handleStatusChange("Success")
                              }
                            />
                            <span className="text-xs text-[#0F172A] font-medium">
                              Success
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={selectedStatuses.includes("Pending")}
                              onCheckedChange={() =>
                                handleStatusChange("Pending")
                              }
                            />
                            <span className="text-xs text-[#0F172A] font-medium">
                              Pending
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={selectedStatuses.includes("Failed")}
                              onCheckedChange={() =>
                                handleStatusChange("Failed")
                              }
                            />
                            <span className="text-xs text-[#0F172A] font-medium">
                              Failed
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-5">
                        <h4 className="text-sm text-[#0F172A] font-semibold">
                          Date added
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div
                            className="flex justify-between items-center border border-[#F3F4F6] rounded-lg p-2.5 h-[38px] cursor-pointer relative"
                            ref={fromRef}
                            tabIndex={0}
                            onClick={() => setShowFromCalendar((v) => !v)}
                          >
                            <span className="text-xs text-[#9CA3AF]">
                              {fromDate
                                ? format(fromDate, "MMM d, yyyy")
                                : "From"}
                            </span>
                            <Image
                              src="/images/calendar.svg"
                              alt="calendar"
                              width={18}
                              height={18}
                            />
                          </div>
                          <div
                            className="flex justify-between items-center border border-[#F3F4F6] rounded-lg p-2.5 h-[38px] cursor-pointer relative"
                            ref={toRef}
                            tabIndex={0}
                            onClick={() => setShowToCalendar((v) => !v)}
                          >
                            <span className="text-xs text-[#9CA3AF]">
                              {toDate ? format(toDate, "MMM d, yyyy") : "To"}
                            </span>
                            <Image
                              src="/images/calendar.svg"
                              alt="calendar"
                              width={18}
                              height={18}
                            />
                          </div>
                        </div>
                        {/* Calendar Overlays */}
                        {showFromCalendar && (
                          <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
                            onClick={() => setShowFromCalendar(false)}
                          >
                            <div
                              className="bg-white border border-[#F3F4F6] rounded-lg shadow-lg p-4"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <DayPicker
                                mode="single"
                                selected={fromDate}
                                onSelect={(date) => {
                                  setFromDate(date);
                                  setShowFromCalendar(false);
                                }}
                              />
                            </div>
                          </div>
                        )}
                        {showToCalendar && (
                          <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
                            onClick={() => setShowToCalendar(false)}
                          >
                            <div
                              className="bg-white border border-[#F3F4F6] rounded-lg shadow-lg p-4"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <DayPicker
                                mode="single"
                                selected={toDate}
                                onSelect={(date) => {
                                  setToDate(date);
                                  setShowToCalendar(false);
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-transparent border border-[#F3F4F6] drop-shadow-xs text-xs text-[#344054] font-medium hover:bg-muted h-8">
                      Cancel
                    </Button>
                    <Button
                      className="h-8 drop-shadow-xs"
                      onClick={handleApply}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-sm text-[#667085] h-11 font-medium leading-5 bg-[#FCFCFD] px-6 py-4 whitespace-nowrap min-w-0"
                      >
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
              {filteredData.length ? (
                filteredData.map((row: TData, idx: number) => {
                  const tableRow = table.getRowModel().rows[idx];
                  return (
                    <TableRow
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      key={(row as any).id || idx}
                      data-state={tableRow?.getIsSelected() && "selected"}
                      className={
                        onRowClick ? "cursor-pointer hover:bg-gray-100" : ""
                      }
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                    >
                      {tableRow
                        ? tableRow.getVisibleCells().map((cell) => (
                            <TableCell
                              key={cell.id}
                              className="px-6 py-4 text-sm first:text-[#101828] text-[#667085] h-[72px] border-y border-[#EAECF0] font-medium leading-[20.3px] max-w-0 truncate"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))
                        : null}
                    </TableRow>
                  );
                })
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
        <div className="flex lg:flex-row flex-col justify-between items-end lg:items-center gap-4 px-6 py-4 h-[52px] border-b rounded-b-xl border-[#EAECF0] bg-[#F7F7F8]">
          <div className="text-sm text-[#414141] font-semibold">
            Page {currentPage} of {table.getPageCount()}
          </div>
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pageIndex - 1)} // Handle previous page
              disabled={!table.getCanPreviousPage()}
              className="border border-[#F2F4F7] p-2 bg-white"
            >
              <ChevronLeft className="size-5 text-black" />
            </Button>
            {Array.from({ length: table.getPageCount() }).map((_, i) => (
              <Button
                key={i}
                variant={i === currentPage - 1 ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(i)}
                className={`rounded-full p-[13px] size-8 ${
                  i === currentPage - 1 ? "bg-black text-white" : ""
                }`}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pageIndex + 1)} // Handle next page
              disabled={!table.getCanNextPage()}
              className="border border-[#F2F4F7] p-2 bg-white"
            >
              <ChevronRight className="size-5 text-black" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
