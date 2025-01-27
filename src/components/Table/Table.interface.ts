/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties } from 'react';

interface TableAction {
	action: (val?: any) => void;
	disable?: (val?: any) => boolean;
	text: string;
}

export interface TableColumn {
	label: string;
	field: string;
	width: {
		min: string;
		max: string;
	};
	selected?: boolean;
	style?: CSSProperties;
}

export interface TableConfig<T> {
	actions?: TableAction[];
	tableColumns: TableColumn[];
	isSelectable?: boolean;
	data: Array<T>;
}

export interface TableData {
	selected: boolean;
}
