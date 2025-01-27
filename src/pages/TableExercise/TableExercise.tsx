import Table from '@/components/Table/Table';
import { TableColumn, TableConfig } from '@/components/Table/Table.interface';

interface TableDataRow {
	name: string;
	device: string;
	path: string;
	status: string;
}

const DATA: TableDataRow[] = [
	{
		name: 'smss.exe',
		device: 'Mario',
		path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
		status: 'scheduled'
	},
	{
		name: 'netsh.exe',
		device: 'Luigi',
		path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
		status: 'available'
	},
	{
		name: 'uxtheme.dll',
		device: 'Peach',
		path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
		status: 'available'
	},
	{
		name: 'aries.sys',
		device: 'Daisy',
		path: '\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys',
		status: 'scheduled'
	},
	{
		name: 'cryptbase.dll',
		device: 'Yoshi',
		path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
		status: 'scheduled'
	},
	{
		name: '7za.exe',
		device: 'Toad',
		path: '\\Device\\HarddiskVolume1\\temp\\7za.exe',
		status: 'scheduled'
	}
];

export default function TableExercise() {
	const tableColCfg: TableColumn[] = [
		{
			label: 'Name',
			field: 'name',
			width: {
				min: '150px',
				max: '1.5fr'
			}
		},
		{
			label: 'Device',
			field: 'device',
			width: {
				min: '150px',
				max: '1.5fr'
			}
		},
		{
			label: 'Path',
			field: 'path',
			width: {
				min: '300px',
				max: '5fr'
			}
		},
		{
			label: 'Status',
			field: 'status',
			width: {
				min: '150px',
				max: '1fr'
			},
			style: { textTransform: 'capitalize' }
		}
	];

	const tableCfg: TableConfig<TableDataRow> = {
		isSelectable: true,
		tableColumns: tableColCfg,
		data: [...DATA]
	};

	return <Table<TableDataRow> {...tableCfg} />;
}
