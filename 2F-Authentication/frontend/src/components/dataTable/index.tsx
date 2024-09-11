import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material';
import { Row } from './types';
// import { rows as initialRows } from './data';
// import ActionsMenu from './ActionsMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DataTable = () => {
  const [searchText] = useState<string>('');
  const [filterText] = useState<string>('');
  // const [rows, setRows] = useState<Row[]>(initialRows);
  const [profileData, setProfileData] = useState<Row[]>([]);
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const profileUrl = import.meta.env.VITE_API_URL + "form/allProfiles";


  // const handleUpdateStatus = (id: number, newStatus: Row['status']) => {
  //   setRows(prevRows =>
  //     prevRows.map(row => (row.idInvoice === id ? { ...row, status: newStatus } : row))
  //   );
  // };

  const formatDate = (dateString: string): string => {
    if (!dateString) {
      return '';
    }
  
    const date = new Date(dateString);
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return '';
    }
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const columns = useMemo<MRT_ColumnDef<Row>[]>(
    () => [
      { accessorKey: 'id', header: 'Invoice ID', size: 50 },
      { accessorKey: 'date', header: 'Date', size: 100,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue<string>();
          return formatDate(dateValue);
        },
       },
      { accessorKey: 'name', header: 'Name', size: 100 },
      { accessorKey: 'email', header: 'Email', size: 200 },
      { accessorKey: 'serviceType', header: 'Service Type', size: 120 },
      // {
      //   accessorKey: 'status',
      //   header: 'Status',
      //   size: 90,
      //   Cell: ({ cell }) => {
      //     const status = cell.getValue<string>();

      //     let backgroundColor = '';
      //     let textColor = '';

      //     if (status === 'Cancel') {
      //       backgroundColor = 'grey';
      //       textColor = 'white';
      //     }
      //     if (status === 'Pending') {
      //       backgroundColor = '#e5383b';
      //       textColor = 'white';
      //     }
      //     if (status === 'Complete') {
      //       backgroundColor = '#80ed99';
      //       textColor = 'white';
      //     }

      //     return (
      //       <Button
      //         sx={{
      //           color: textColor,
      //           backgroundColor,
      //           borderRadius: '15px',
      //           fontSize: 10,
      //           borderColor: 'transparent',
      //           '&:hover': {
      //             backgroundColor,
      //             borderColor: 'transparent',
      //           },
      //         }}
      //         size="small"
      //       >
      //         {status}
      //       </Button>
      //     );
      //   },
      // },
      {
        accessorKey: 'actions',
        header: 'Action',
        size: 50,
        // Cell: ({ cell }) => <ActionsMenu row={cell.row.original} onUpdateStatus={handleUpdateStatus} />,
        Cell: ({ cell }) => <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={() => handleEditItem(cell.row.original)}>Edit</Button>
          <Button variant="contained" onClick={() => handleClickOpen(cell.row.original)} color='error'>Delete</Button>
        </Stack>
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const filteredRows = useMemo(
    () =>
      profileData.filter((row) =>
        Object.values(row).some(
          (val) =>
            typeof val === 'string' &&
            val.toLowerCase().includes(searchText.toLowerCase())
        ) &&
        row.serviceType.toLowerCase().includes(filterText.toLowerCase())
      ),
    [searchText, filterText, profileData]
  );

  const getAllProfiles = () => {
    axios
      .get(profileUrl)
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() =>{
    getAllProfiles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleEditItem = (row: Row) => {
    console.log(row.id, "row id");
    navigate(`/editItem/${row.id}`, { state: row });
  }

  const handleClickOpen = (row: Row) => {
    setSelectedItemId(row.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleDeleteItem = async () => {
    if (selectedItemId === null) {
      return; // No item is selected to delete
    }

    const deleteUrl = import.meta.env.VITE_API_URL + `form/deleteItem/${selectedItemId}`;

    try {
      await axios.delete(deleteUrl);
      // setProfileData(prevData => prevData.filter(item => item.id !== selectedItemId));
      getAllProfiles();
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setOpen(false);
    }    
  };  

  return (
    <div style={{ width: '100%', padding: '1rem' }}>
      <Typography fontSize="1rem" gutterBottom sx={{ fontWeight: 'bold' }}>
        Payment History
      </Typography>
      
      <div style={{ overflowX: 'auto' }}>
        <MaterialReactTable
          columns={columns}
          data={filteredRows}
          initialState={{ pagination: { pageIndex: 0, pageSize: 5 }, density: 'compact' }}
          enableRowSelection
          enableDensityToggle={false}
        />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete The Item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete the item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDeleteItem}>Yes</Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;
