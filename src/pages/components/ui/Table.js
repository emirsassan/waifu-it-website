import { forwardRef } from "react";

const Table = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <div className="w-full overflow-auto rounded-lg border border-secondary dark:border-dark-secondary">
      <table
        ref={ref}
        className={`w-full border-collapse bg-background dark:bg-dark-background text-text dark:text-dark-text ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  );
});

const TableHeader = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={`bg-secondary dark:bg-dark-secondary ${className}`}
      {...props}
    >
      {children}
    </thead>
  );
});

const TableBody = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className={`divide-y divide-secondary dark:divide-dark-secondary ${className}`}
      {...props}
    >
      {children}
    </tbody>
  );
});

const TableRow = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={`hover:bg-secondary/50 dark:hover:bg-dark-secondary/50 transition-colors ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
});

const TableHead = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={`px-4 py-3 text-left font-semibold ${className}`}
      {...props}
    >
      {children}
    </th>
  );
});

const TableCell = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={`px-4 py-3 ${className}`}
      {...props}
    >
      {children}
    </td>
  );
});

Table.displayName = "Table";
TableHeader.displayName = "TableHeader";
TableBody.displayName = "TableBody";
TableRow.displayName = "TableRow";
TableHead.displayName = "TableHead";
TableCell.displayName = "TableCell";

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
