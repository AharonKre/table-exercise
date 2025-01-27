/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { TableConfig, TableData } from './Table.interface';
import TableActionRow from './TableActionRow/TableActionRow';
import TableHeader from './TableHeader/TableHeader';
import TableBody from './TableBody/TableBody';
import styles from './Table.module.scss';

export default function Table<T>({
	data,
	tableColumns,
	isSelectable
}: TableConfig<T>) {
	const [loading, setLoading] = useState<boolean>(true);
	const [, setSelectedFiles] = useState<Map<number, T>>(new Map());
	const [filesToDownload, setFilesToDownload] = useState<Map<number, T>>(
		new Map()
	);
	const [gridTemplateCol, setGridTemplateCol] = useState<string>();
	const [totalSelectedFiles, setTotalSelectedFiles] = useState<number>(0);
	const [tableData, setTableData] = useState<Array<(TableData & T) | T>>([]);

	useEffect(() => {
		let template = isSelectable ? '50px' : '';

		for (const col of tableColumns) {
			template += ` minmax(${col.width.min}, ${col.width.max})`;
		}

		setGridTemplateCol(template);
	}, [isSelectable, tableColumns]);

	useEffect(() => {
		setTableData(
			isSelectable ? data.map((row) => ({ ...row, selected: false })) : data
		);
		setLoading(false);
	}, [data, isSelectable]);

	const onRowSelectClicked = (row: any, idx: number) => {
		if (row.selected) {
			setSelectedFiles((prev) => {
				prev.set(idx, row);
				setTotalSelectedFiles(prev.size);
				return prev;
			});
			if (row.status === 'available') {
				setFilesToDownload((prev) => prev.set(idx, row));
			}
		} else {
			setSelectedFiles((prev) => {
				prev.delete(idx);
				setTotalSelectedFiles(prev.size);
				return prev;
			});
			if (row.status === 'available') {
				setFilesToDownload((prev) => {
					prev.delete(idx);
					return prev;
				});
			}
		}
	};

	const handleSelectAllChanged = (selected: boolean) => {
		setTotalSelectedFiles(selected ? tableData.length : 0);
		setTableData(
			tableData.map((row: any, idx) => {
				const updatedRow = { ...row, selected };
				setSelectedFiles((prev) => {
					if (selected) {
						prev.set(idx, updatedRow);
						if (row.status === 'available') {
							setFilesToDownload((prev) => prev.set(idx, updatedRow));
						}
					}
					return prev;
				});
				return updatedRow;
			})
		);
		if (!selected) {
			setSelectedFiles((prev) => {
				prev.clear();
				return prev;
			});
			setFilesToDownload((prev) => {
				prev.clear();
				return prev;
			});
		}
	};

	const handleDownloadClicked = () => {
		let text = '';
		filesToDownload.forEach((file: any) => {
			text += `Device - ${file.device}, Path - ${file.path}\n`;
		});
		alert(text);
	};

	return loading ? (
		<div className={styles.loading}>
			<div className={styles.loader}></div>
		</div>
	) : (
		<>
			{isSelectable && (
				<TableActionRow
					onSelectAllChanged={handleSelectAllChanged}
					totalRows={tableData.length}
					totalSelectedFiles={totalSelectedFiles}
					totalFilesToDownload={filesToDownload.size}
					onDownloadClicked={handleDownloadClicked}
				/>
			)}
			<table
				className={styles.table}
				style={{ gridTemplateColumns: gridTemplateCol }}
			>
				<TableHeader tableColumns={tableColumns} isSelectable={isSelectable} />
				<TableBody
					data={tableData}
					tableColumns={tableColumns}
					isSelectable={isSelectable}
					onRowSelectClicked={onRowSelectClicked}
				/>
			</table>
		</>
	);
}
