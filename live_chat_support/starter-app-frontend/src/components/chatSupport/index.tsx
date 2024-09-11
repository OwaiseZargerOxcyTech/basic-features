import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import ChatMainSection from "./subComponents/ChatMainSection";
import AllUsersList from "./subComponents/AllUsersList";
import Loading from "../common/Loading";
import { io, Socket } from "socket.io-client";

interface Row {
  username: string | null;
  email: string | null;
  sc_status: string | null;
  sc_id: number | null;
}

const ChatSupport: React.FC = () => {
  const user_id: number | null = localStorage.getItem("live_support_id")
    ? parseInt(localStorage.getItem("live_support_id") as string, 10)
    : null; //Logged In User ID - Number
  const [scid, setSCID] = useState<number>(0);
  const [userType, setUserType] = useState<string>("");
  const [displayChatMainSection, setDisplayChatMainSection] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userAvailability, setUserAvailability] = useState<string>("");
  const [refreshData, setRefreshData] = useState<string>("");
  const [rows, setRows] = useState<Row[]>([]);

  const [socket, setSocket] = useState<Socket | null>(null);

  const getUserDetail =
    import.meta.env.VITE_API_URL + "chat-support/get-user-detail";

  const fetchUserDetail = async (user_id: number | null) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get(getUserDetail, {
        params: { user_id },
      });

      if (response.data.type !== "supporter") {
        setSCID(response.data.sc_id);
        setUserType(response.data.type);
        setUserAvailability(response.data.user_availability);
      } else {
        setSCID(response.data.sc_id);
        setUserType(response.data.type);
        setUserAvailability(response.data.user_availability);
        if (parseInt(response.data.sc_id) != 0) {
          setDisplayChatMainSection(true);
        }
      }
    } catch (err) {
      alert(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // Use refs to store latest values
  const userAvailabilityRef = useRef(userAvailability);
  const userTypeRef = useRef(userType);

  // Update refs when state changes
  useEffect(() => {
    userAvailabilityRef.current = userAvailability;
    userTypeRef.current = userType;
  }, [userAvailability, userType]);

  useEffect(() => {
    if (user_id) {
      fetchUserDetail(user_id);

      const socketInstance: Socket = io(import.meta.env.VITE_API_SOCKET_URL);
      setSocket(socketInstance);

      if (user_id) {
        socketInstance.emit("register", user_id);
      }

      socketInstance.on("newUser", (get_data) => {
        if (
          userAvailabilityRef.current === "" &&
          userTypeRef.current === "supporter"
        ) {         
          if (get_data.refresh_list === "yes") {
            fetchAllUsers();
          }
        }
      });

      return () => {
        socketInstance.off("newUser");
        // socketInstance.disconnect();
      };
    }
  }, [user_id, refreshData]);

  const newUser = (get_data: { refresh_list: string | "" }) => {
    if (get_data.refresh_list.trim() && socket) {
      socket.emit("newUser", get_data);
    }
  };

  const getAllUsers =
    import.meta.env.VITE_API_URL + "chat-support/get-all-users";

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(getAllUsers);
      setRows(response.data);
    } catch (err) {
      alert(`Error: ${err}`);
    }
  };

  useEffect(() => {
    if (user_id && userType === "supporter") {
      fetchAllUsers();
    }
  }, [user_id, userType]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "90vh",
          overflow: "hidden",
        }}
      >
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          {userType !== "supporter" ? (
            <ChatMainSection
              scid={scid}
              userType={userType}
              setDisplayChatMainSection={setDisplayChatMainSection}
              setSCID={setSCID}
              socket={socket} // Pass the socket instance here
              newUser={newUser}
              setRefreshData={setRefreshData}
              fetchAllUsers={fetchAllUsers}
            />
          ) : (
            <>
              {displayChatMainSection ? (
                <ChatMainSection
                  scid={scid}
                  userType={userType}
                  setDisplayChatMainSection={setDisplayChatMainSection}
                  setSCID={setSCID}
                  socket={socket} // Pass the socket instance here
                  newUser={newUser}
                  setRefreshData={setRefreshData}
                  fetchAllUsers={fetchAllUsers}
                />
              ) : (
                <AllUsersList
                  setSCID={setSCID}
                  setDisplayChatMainSection={setDisplayChatMainSection}
                  rows={rows}
                />
              )}
            </>
          )}
        </Box>
      </Box>
    );
  }
};

export default ChatSupport;
