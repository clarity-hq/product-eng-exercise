import {
  AccessorFn,
  Row,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import cx from 'classnames';
import { useEffect, useState } from 'react';

type Props<RowType> = {
  className?: string;
  data: RowType[];
  schema: {
    cellRenderer: AccessorFn<RowType>;
    headerName: string;
    sortingFunction?: (rowA: Row<RowType>, rowB: Row<RowType>) => number;
  }[];
  fullWidth?: boolean;
  onRowClick?: (row: RowType) => void;
  initialSortState?: SortingState;
};

export function DataTable<RowType>({
  className,
  data,
  schema,
  fullWidth,
  onRowClick,
  initialSortState,
}: Props<RowType>) {
  const [rowData, _setData] = useState(() => [...data]);
  const [sorting, setSorting] = useState<SortingState>(initialSortState || []);

  useEffect(() => {
    _setData(data);
  }, [data]);

  const columnHelper = createColumnHelper<RowType>();

  const columns = schema.map((columnSchema) =>
    columnHelper.accessor(columnSchema.cellRenderer, {
      header: columnSchema.headerName,
      cell: (info) => info.renderValue(),
      sortingFn: columnSchema.sortingFunction,
      enableSorting: !!columnSchema.sortingFunction,
      sortUndefined: 'last',
    })
  );

  const table = useReactTable({
    data: rowData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="hide-scroll-bar h-full overflow-hidden overflow-y-auto rounded-lg border bg-white">
      <table className={cx({ 'w-full': fullWidth }, className, ' bg-white')}>
        <thead className="border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="bg-white sticky border-b  px-6 text-left font-semibold hover:cursor-default"
                  style={{ height: 64, top: 0 }}
                  onClick={header.column.getToggleSortingHandler()}
                  title={
                    header.column.getCanSort()
                      ? header.column.getNextSortingOrder() === 'asc'
                        ? 'Sort ascending'
                        : header.column.getNextSortingOrder() === 'desc'
                        ? 'Sort descending'
                        : 'Clear sort'
                      : undefined
                  }
                >
                  <div className="flex items-center justify-between whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody style={{ overflow: 'auto' }}>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:cursor-default hover:bg-gray-100"
              onMouseDown={(e) => e.button === 0 && onRowClick?.(row.original)}
              style={{ height: 64 }}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border-b px-6"
                  style={{ height: 64 }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
