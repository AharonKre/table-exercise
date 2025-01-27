/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableConfig } from '../Table.interface';
import styles from './TableBody.module.scss';

interface TableBodyProps extends TableConfig<any> {
	onRowSelectClicked: (row: any, idx: number) => void;
}

export default function TableBody({
	data,
	tableColumns,
	isSelectable,
	onRowSelectClicked
}: TableBodyProps) {
	const handleSelectChange = (row: any, idx: number) => {
		row.selected = !row.selected;
		onRowSelectClicked(row, idx);
	};

	return (
		<tbody className={styles.tableBody}>
			{data.map((row, idx) => (
				<tr key={idx} className={row.selected ? styles.selectedRow : ''}>
					{isSelectable && (
						<td>
							<input
								className="row-checkbox"
								type="checkbox"
								checked={row.selected}
								onChange={() => handleSelectChange(row, idx)}
							/>
						</td>
					)}
					{tableColumns.map((col, colIdx) => (
						<td key={colIdx} style={col.style}>
							{row[col.field]}
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
}
