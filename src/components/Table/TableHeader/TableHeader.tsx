import { TableColumn } from "../Table.interface";
import styles from "./TableHeader.module.scss";

interface TableHeadProps {
  tableColumns: TableColumn[];
  isSelectable?: boolean;
}

export default function TableHeader({
  tableColumns,
  isSelectable,
}: TableHeadProps) {
  const thStyle = { top: isSelectable ? "51px" : 0 };
  return (
    <thead className={styles.tableHead}>
      <tr>
        {isSelectable && <th style={thStyle}></th>}
        {tableColumns.map((col, colIdx) => (
          <th key={colIdx} style={thStyle}>
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
