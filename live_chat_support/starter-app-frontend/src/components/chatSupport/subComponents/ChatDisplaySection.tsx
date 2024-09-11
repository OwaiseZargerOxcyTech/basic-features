import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { format, isToday, isYesterday } from "date-fns";

interface ChatMessage {
  scmsg_id: number;
  scm_id: number;
  sc_id: number;
  user_id: number;
  msg: string;
  msg_date: string;
  custom_msg: string | "";
}

interface ChatDisplaySectionProps {
  allMessages: ChatMessage[];
}

const ChatDisplaySection: React.FC<ChatDisplaySectionProps> = ({
  allMessages,
}) => {
  const user_id: number | null = localStorage.getItem("live_support_id")
    ? parseInt(localStorage.getItem("live_support_id") as string, 10)
    : null; //Logged In User ID - Number

  // Ref for the chat container
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Group messages by date
  const messagesByDate = allMessages.reduce((acc, message) => {
    const date = format(new Date(message.msg_date), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {} as Record<string, ChatMessage[]>);

  // Helper function to format the date
  const getDisplayDate = (date: string) => {
    const dateObj = new Date(date);
    if (isToday(dateObj)) return "Today";
    if (isYesterday(dateObj)) return "Yesterday";
    return format(dateObj, "MMMM dd, yyyy");
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [allMessages]);

  return (
    <Box
      ref={chatContainerRef} // Attach the ref here
      sx={{
        padding: "10px",
        paddingBottom: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        overflowY: "auto",
        height: "100%",
      }}
    >
      {Object.entries(messagesByDate).map(([date, messages]) => (
        <React.Fragment key={date}>
          {/* Date Separator */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px 10px",
              borderRadius: "20px",
              backgroundColor: "#e0e0e0",
              alignSelf: "center",
              margin: "10px 0",
            }}
          >
            <Typography variant="caption" color="textSecondary">
              {getDisplayDate(date)}
            </Typography>
          </Box>

          {messages.map((message) => (
            <>
              {message.custom_msg && message.custom_msg == "yes" ? (
                <Box
                  key={message.scmsg_id}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    backgroundColor: "#e0e0e0",
                    alignSelf: "center",
                    margin: "10px 0",
                  }}
                >
                  <Typography variant="caption" color="textSecondary">
                    {message.msg}
                  </Typography>
                </Box>
              ) : (
                <Box
                  key={message.scmsg_id}
                  sx={{
                    display: "flex",
                    justifyContent:
                      message.user_id === user_id ? "flex-end" : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "70%",
                      backgroundColor:
                        message.user_id === user_id ? "#1976d2" : "#e0e0e0",
                      color: message.user_id === user_id ? "#fff" : "#000",
                      borderRadius: "10px",
                      padding: "10px",
                      wordWrap: "break-word",
                    }}
                  >
                    <Typography variant="body1">{message.msg}</Typography>
                  </Box>
                </Box>
              )}
            </>
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ChatDisplaySection;
