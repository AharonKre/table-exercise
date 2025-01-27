import { useEffect, useRef, useState } from 'react';
import { FaDownload } from 'react-icons/fa6';
import styles from './TableActionRow.module.scss';

interface TableActionRowProps {
	totalRows: number;
	totalSelectedFiles: number;
	totalFilesToDownload: number;
	onSelectAllChanged: (select: boolean) => void;
	onDownloadClicked: () => void;
}

export default function TableActionRow({
	totalRows,
	totalSelectedFiles,
	totalFilesToDownload,
	onSelectAllChanged,
	onDownloadClicked
}: TableActionRowProps) {
	const [checked, setChecked] = useState(false);
	const checkboxRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (totalSelectedFiles !== totalRows) {
			if (checked) setChecked(false);
			(checkboxRef.current as HTMLInputElement).indeterminate =
				totalSelectedFiles > 0;
		} else if (totalSelectedFiles === totalRows) {
			setChecked(true);
			(checkboxRef.current as HTMLInputElement).indeterminate = false;
		}
	}, [checked, totalSelectedFiles, totalRows]);

	const handleOnChange = () => {
		onSelectAllChanged(!checked);
	};

	return (
		<div className={styles.tableActionRow}>
			<input
				className={styles.selectAll}
				type="checkbox"
				checked={checked}
				onChange={handleOnChange}
				ref={checkboxRef}
			/>
			<span className={styles.totalSelected}>
				{totalSelectedFiles
					? `Selected ${totalSelectedFiles}`
					: 'None Selected'}
			</span>
			<button disabled={!totalFilesToDownload} onClick={onDownloadClicked}>
				<FaDownload />
				<span className={styles.btnTxt}>Download Selected</span>
			</button>
		</div>
	);
}
