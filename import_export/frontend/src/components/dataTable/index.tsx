import { useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Typography, Button } from '@mui/material';
import { Row } from './types';
import { rows as initialRows } from './data';
import ActionsMenu from './ActionsMenu';
import * as XLSX from 'xlsx';

const DataTable = () => {
  const [searchText] = useState<string>('');
  const [filterText] = useState<string>('');
  const [rows, setRows] = useState<Row[]>(initialRows);

  const handleUpdateStatus = (id: number, newStatus: Row['status']) => {
    setRows(prevRows =>
      prevRows.map(row => (row.idInvoice === id ? { ...row, status: newStatus } : row))
    );
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payment History');
    XLSX.writeFile(workbook, 'Payment_History.xlsx');
  };

  const columns = useMemo<MRT_ColumnDef<Row>[]>(
    () => [
      { accessorKey: 'idInvoice', header: 'Invoice ID', size: 100 },
      { accessorKey: 'date', header: 'Date', size: 100 },
      { accessorKey: 'name', header: 'Name', size: 100 },
      { accessorKey: 'email', header: 'Email', size: 200 },
      { accessorKey: 'serviceType', header: 'Service Type', size: 120 },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 90,
        Cell: ({ cell }) => {
          const status = cell.getValue<string>();

          let backgroundColor = '';
          let textColor = '';

          if (status === 'Cancel') {
            backgroundColor = 'grey';
            textColor = 'white';
          }
          if (status === 'Pending') {
            backgroundColor = '#e5383b';
            textColor = 'white';
          }
          if (status === 'Complete') {
            backgroundColor = '#80ed99';
            textColor = 'white';
          }

          return (
            <Button
              sx={{
                color: textColor,
                backgroundColor,
                borderRadius: '15px',
                fontSize: 10,
                borderColor: 'transparent',
                '&:hover': {
                  backgroundColor,
                  borderColor: 'transparent',
                },
              }}
              size="small"
            >
              {status}
            </Button>
          );
        },
      },
      {
        accessorKey: 'actions',
        header: '',
        size: 50,
        Cell: ({ cell }) => <ActionsMenu row={cell.row.original} onUpdateStatus={handleUpdateStatus} />,
      },
    ],
    []
  );

  const filteredRows = useMemo(
    () =>
      rows.filter((row) =>
        Object.values(row).some(
          (val) =>
            typeof val === 'string' &&
            val.toLowerCase().includes(searchText.toLowerCase())
        ) &&
        row.serviceType.toLowerCase().includes(filterText.toLowerCase())
      ),
    [searchText, filterText, rows]
  );

  return (
    <div style={{ width: '100%', padding: '1rem' }}>
      <Typography fontSize="1rem" gutterBottom sx={{ fontWeight: 'bold' }}>
        Payment History
      </Typography>
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleDownloadExcel}
        sx={{ marginBottom: '1rem' }}
      >
        Download Excel
      </Button>

      <div style={{ overflowX: 'auto' }}>
        <MaterialReactTable
          columns={columns}
          data={filteredRows}
          initialState={{ pagination: { pageIndex: 0, pageSize: 5 }, density: 'compact' }}
          enableRowSelection
          enableDensityToggle={false}
        />
      </div>
    </div>
  );
};

export default DataTable;
