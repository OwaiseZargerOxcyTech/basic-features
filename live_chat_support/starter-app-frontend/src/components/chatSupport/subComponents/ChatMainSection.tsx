// ChatMainSection.tsx
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import ChatDisplaySection from "./ChatDisplaySection";
import ChatInputSection from "./ChatInputSection";
import { Socket } from "socket.io-client";

interface ChatMainSectionProps {
  scid: number;
  userType: string;
  setDisplayChatMainSection: React.Dispatch<React.SetStateAction<boolean>>;
  setSCID: React.Dispatch<React.SetStateAction<number>>;
  socket: Socket | null; // Accept the socket as a prop
  newUser: (get_data: { refresh_list: string | "" }) => void;
  setRefreshData: React.Dispatch<React.SetStateAction<string>>;
  fetchAllUsers: () => Promise<void>;
}

interface ChatMessage {
  scmsg_id: number;
  scm_id: number;
  sc_id: number;
  user_id: number;
  msg: string;
  msg_date: string;
  custom_msg: string | "";
}

const ChatMainSection: React.FC<ChatMainSectionProps> = ({
  scid,
  userType,
  setDisplayChatMainSection,
  setSCID,
  socket,
  newUser,
  setRefreshData,
  fetchAllUsers,
}) => {
  const user_id: number | null = localStorage.getItem("live_support_id")
    ? parseInt(localStorage.getItem("live_support_id") as string, 10)
    : null; //Logged In User ID - Number
  const [message, setMessage] = useState<string>("");
  const [allMessages, setAllMessages] = useState<ChatMessage[]>([]);
  const [scmid, setSCMID] = useState<number>(0);

  const getChatDetail =
    import.meta.env.VITE_API_URL + "chat-support/get-user-chat-detail";

  const fetchChatDetail = async (
    scid: number | null,
    user_id: number | null
  ) => {
    try {
      const response = await axios.get(getChatDetail, {
        params: { scid, user_id },
      });
      setSCMID(response.data.scm_id);
      setAllMessages(response.data.messages);
    } catch (err) {
      alert(`Error: ${err}`);
    }
  };

  useEffect(() => {
    if (scid !== 0) {
      fetchChatDetail(scid, user_id);
    }
  }, [scid]);

  useEffect(() => {
    if (socket != null) {
      socket.on("message", (data) => {
        const receivedScid = Number(data.scid);

        if (receivedScid === scid) {
          setAllMessages((prevMessages) => [...prevMessages, data]);
        }
      });

      return () => {
        socket.off("message");
      };
    }
  }, [scid, socket]);

  const sendMessage = (data: {
    scmid: number;
    scid: number;
    user_id: number | null;
    msg: string;
    msg_date: string;
    custom_msg: string | "";
  }) => {
    if (data.msg.trim() && socket) {
      socket.emit("message", data);
      setMessage(""); // Clear input after sending
    }
  };

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
        <Box sx={{ height: "77vh" }}>
          <ChatDisplaySection allMessages={allMessages} />
        </Box>
        <Box sx={{ height: "13vh" }}>
          <ChatInputSection
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            scid={scid}
            scmid={scmid}
            userType={userType}
            setDisplayChatMainSection={setDisplayChatMainSection}
            setSCID={setSCID}
            newUser={newUser}
            setRefreshData={setRefreshData}
            fetchAllUsers={fetchAllUsers}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMainSection;
