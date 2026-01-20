import { forwardRef } from 'react';

const Table = forwardRef(function Table({ children, className = '', ...props }, ref) {
    return (
        <div className="overflow-x-auto rounded-xl border-2 border-[#90353D]/20">
            <table ref={ref} className={`w-full divide-y divide-[#90353D]/20 ${className}`} {...props}>
                {children}
            </table>
        </div>
    );
});

const TableHeader = forwardRef(function TableHeader({ children, className = '', ...props }, ref) {
    return (
        <thead ref={ref} className={`bg-[#90353D]/10 ${className}`} {...props}>
            {children}
        </thead>
    );
});

const TableBody = forwardRef(function TableBody({ children, className = '', ...props }, ref) {
    return (
        <tbody ref={ref} className={`bg-[#FAF6F0] divide-y divide-[#90353D]/20 ${className}`} {...props}>
            {children}
        </tbody>
    );
});

const TableRow = forwardRef(function TableRow({ children, className = '', hoverable = true, ...props }, ref) {
    const hoverStyles = hoverable ? 'hover:bg-[#90353D]/5 transition-colors duration-300' : '';
    return (
        <tr ref={ref} className={`${hoverStyles} ${className}`} {...props}>
            {children}
        </tr>
    );
});

const TableHead = forwardRef(function TableHead({ children, className = '', ...props }, ref) {
    return (
        <th
            ref={ref}
            scope="col"
            className={`px-5 py-4 text-left text-xs font-semibold text-[#4A3C35] uppercase tracking-wider ${className}`}
            {...props}
        >
            {children}
        </th>
    );
});

const TableCell = forwardRef(function TableCell({ children, className = '', ...props }, ref) {
    return (
        <td ref={ref} className={`px-5 py-4 text-sm text-[#4A3C35] ${className}`} {...props}>
            {children}
        </td>
    );
});

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
export default Table;
