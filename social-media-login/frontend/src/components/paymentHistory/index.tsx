import React, { useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Button, Typography, TextField, Box, IconButton, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { rows } from "./row";
import { Row } from "./type";

const columns: GridColDef[] = [
  { field: "idInvoice", headerName: "Invoice ID", width: 100 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "serviceType", headerName: "Service Type", width: 160 },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params: GridRenderCellParams) => {
      const { status } = params.row;

      let backgroundColor = "";
      let textColor = "";

      if (status === "Cancel") {
        backgroundColor = "grey";
        textColor = "white";
      }
      if (status === "Pending") {
        backgroundColor = "#e5383b";
        textColor = "white";
      }
      if (status === "Complete") {
        backgroundColor = "#80ed99";
        textColor = "white";
      }

      return (
        <Button
          variant="outlined"
          sx={{
            color: textColor,
            backgroundColor,
            borderRadius: "20px",
            fontSize: 10,
            borderColor: "transparent",
            "&:hover": {
              backgroundColor,
              borderColor: "transparent",
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
    field: "actions",
    headerName: "Actions",
    width: 80,
    renderCell: (params: GridRenderCellParams) => <ActionsMenu params={params} />,
  },
];

const ActionsMenu = ({ params }: { params: GridRenderCellParams }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus: string) => {
    setRowStatus:String(newStatus);
    // Update the status in the rows data (you would typically update this in your state or backend)
    params.row.status = newStatus;
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleStatusChange("Pending")}>Pending</MenuItem>
        <MenuItem onClick={() => handleStatusChange("Complete")}>Complete</MenuItem>
        <MenuItem onClick={() => handleStatusChange("Cancel")}>Cancel</MenuItem>
      </Menu>
    </>
  );
};

export default function DataTable() {
  const [searchText, setSearchText] = useState<string>("");
  const [filterText, setFilterText] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (val) =>
        typeof val === "string" &&
        val.toLowerCase().includes(searchText.toLowerCase())
    ) &&
    row.serviceType.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div style={{ height: 500, width: "100%", padding: "1rem" }}>
      <Typography fontSize="1rem" gutterBottom sx={{ fontWeight: "bold" }}>
        Payment History
      </Typography>
      <Box sx={{ mb: 1, display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: "grey" }} />,
          }}
          sx={{ width: "10rem" }} // Reduced width
        />
        <TextField
          size="small"
          placeholder="Filter by Service Type..."
          value={filterText}
          onChange={handleFilterChange}
          sx={{ width: "10rem" }} // Reduced width
        />
      </Box>
      <Box
        sx={{
          '& .MuiDataGrid-root': {
            '& .MuiDataGrid-virtualScroller': {
              overflow: 'hidden !important',
            },
          },
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row: Row) => row.idInvoice}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          checkboxSelection
        />
      </Box>
    </div>
  );
}
