import { useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

interface Row {
  username: string | null;
  email: string | null;
  sc_status: string | null;
  sc_id: number | null;
}

interface AllUsersListProps {
  setSCID: React.Dispatch<React.SetStateAction<number>>;
  setDisplayChatMainSection: React.Dispatch<React.SetStateAction<boolean>>;
  rows: Row[];
}

const AllUsersList: React.FC<AllUsersListProps> = ({
  setSCID,
  setDisplayChatMainSection,
  rows,
}) => {
  const [searchText] = useState<string>("");

  const checkChatStatus =
    import.meta.env.VITE_API_URL + "chat-support/check-chat-status";

  const handleCheckChatStatus = async (sc_id: number | null) => {
    if (sc_id === null) return; // Guard clause to avoid making a request with null sc_id
    const response = await axios.get(checkChatStatus, {
      params: { sc_id },
    });
    if (response.data.sc_status === "open") {
      setSCID(sc_id);
      setDisplayChatMainSection(true);
    } else {
      toast.error(
        "You cannot chat with this user! Chat is closed or Other supporter is assigned!"
      );
    }
  };

  const columns = useMemo<MRT_ColumnDef<Row>[]>(
    () => [
      { accessorKey: "username", header: "Username", size: 100 },
      { accessorKey: "email", header: "Email", size: 100 },
      {
        accessorKey: "sc_status",
        header: "Status",
        size: 90,
        Cell: ({ row, cell }) => {
          const status = cell.getValue<string>();
          const sc_id = row.original.sc_id;

          return (
            <>
              {status}
              {status == "open" && (
                <Button
                  sx={{
                    color: "#ffffff",
                    backgroundColor: "#0f2af1b5",
                    borderRadius: "15px",
                    fontSize: 10,
                    borderColor: "transparent",
                    "&:hover": {
                      backgroundColor: "#0f2af1b5",
                      borderColor: "transparent",
                    },
                    marginLeft: "20px",
                  }}
                  size="small"
                  onClick={() => handleCheckChatStatus(sc_id)}
                >
                  Start Chat
                </Button>
              )}
            </>
          );
        },
      },
    ],
    []
  );

  const filteredRows = useMemo(
    () =>
      rows.filter((row) =>
        Object.values(row).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(searchText.toLowerCase())
        )
      ),
    [searchText, rows]
  );

  return (
    <div style={{ width: "100%", padding: "1rem" }}>
      <Typography fontSize="1rem" gutterBottom sx={{ fontWeight: "bold" }}>
        All Users
      </Typography>

      <div style={{ overflowX: "auto" }}>
        <MaterialReactTable
          columns={columns}
          data={filteredRows}
          initialState={{
            pagination: { pageIndex: 0, pageSize: 5 },
            density: "compact",
          }}
          enableDensityToggle={false}
        />
      </div>
    </div>
  );
};

export default AllUsersList;
