//Chat Type & send message page
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import axios from "axios";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import {
  closeCnfModal,
  openCnfModal,
} from "../../../redux/actions/confirmationModalSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

interface ChatInputSectionProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (data: {
    scmid: number;
    scid: number;
    user_id: number | null;
    msg: string;
    msg_date: string;
    custom_msg: string | "";
  }) => void;
  scid: number;
  scmid: number;
  userType: string;
  setDisplayChatMainSection: React.Dispatch<React.SetStateAction<boolean>>;
  setSCID: React.Dispatch<React.SetStateAction<number>>;
  newUser: (get_data: { refresh_list: string | "" }) => void;
  setRefreshData: React.Dispatch<React.SetStateAction<string>>;
  fetchAllUsers: () => Promise<void>;
}

const ChatInputSection: React.FC<ChatInputSectionProps> = ({
  message,
  setMessage,
  sendMessage,
  scid,
  scmid,
  userType,
  setDisplayChatMainSection,
  setSCID,
  newUser,
  setRefreshData,
  fetchAllUsers,
}) => {
  const dispatch = useDispatch();
  const user_id: number | null = localStorage.getItem("live_support_id")
    ? parseInt(localStorage.getItem("live_support_id") as string, 10)
    : null; //Logged In User ID - Number

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const insertMessageURL =
    import.meta.env.VITE_API_URL + "chat-support/insert-message";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const res = await axios.post(insertMessageURL, {
        scmid,
        scid,
        user_id,
        msg: message,
      });
      const get_scid = res.data.sc_id;
      const get_pass_status = res.data.pass_status;
      setSCID(get_scid);

      const data = {
        scmid,
        scid: get_scid,
        user_id,
        msg: message,
        msg_date: new Date().toISOString(),
        custom_msg: "",
      };

      // Auto refresh if new chat arrived
      let refresh_list = "";
      if (get_pass_status === "open") {
        setRefreshData("yes");
        refresh_list = "yes";
      } else {
        setRefreshData("");
        refresh_list = "";
      }
      const pass_data = {
        refresh_list,
      };

      // Call both socket functions concurrently if condition is met
      if (refresh_list === "yes") {
        await Promise.all([sendMessage(data), newUser(pass_data)]);
      } else {
        sendMessage(data);
      }
      setMessage(""); // Clear input after sending
    } catch (error) {
      console.error("There was an error while sending the message:", error);
    }
  };

  const closeChat =
    import.meta.env.VITE_API_URL + "chat-support/close-support-chat";

  const handleCloseChat = () => {
    dispatch(
      openCnfModal({
        modalName: "close-chat",
        title: "Are you sure?",
        description: "You want to Close this Chat",
      })
    );
  };

  const handleCloseChatYes = async () => {
    if (scid === null) return; // Guard clause to avoid making a request with null sc_id
    if (user_id === null) return; // Guard clause to avoid making a request with null sc_id

    try {
      const response = await axios.patch(`${closeChat}/${scid}/${user_id}`);
      if (response.data) {
        toast.success(response.data.message);
        setDisplayChatMainSection(false);
        const data = {
          scmid,
          scid: scid,
          user_id,
          msg: "This chat is closed by supporter. Type new message to start chat.",
          msg_date: new Date().toISOString(),
          custom_msg: "yes",
        };

        //Auto refresh if new chat arrived
        fetchAllUsers();
        sendMessage(data);
        dispatch(closeCnfModal({ modalName: "close-chat" }));
      }
    } catch (error) {
      console.error("Error closing chat:", error);
      alert("Failed to close the chat. Please try again.");
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: 1,
          borderColor: "divider",
          padding: "10px",
          bgcolor: "#F7F7F7",
        }}
      >
        <TextField
          fullWidth
          size="small"
          multiline
          rows={2}
          placeholder="Type Message"
          variant="outlined"
          required
          value={message}
          onChange={handleChange}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
        {userType === "supporter" && (
          <Button
            variant="contained"
            color="error"
            sx={{ marginLeft: "10px" }}
            onClick={() => handleCloseChat()}
          >
            Close
          </Button>
        )}
      </Box>

      <ConfirmationDialog value={"close-chat"} handleYes={handleCloseChatYes} />
    </>
  );
};

export default ChatInputSection;
