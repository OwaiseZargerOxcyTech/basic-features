import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const specialCharAtEndRegex = /[^\w@.-]$/;

interface EmailInputProps {
  emails: string[]; // emails is an array of strings
  setEmails: React.Dispatch<React.SetStateAction<string[]>>; // setEmails is a function that updates the emails array
}

const EmailInput: React.FC<EmailInputProps> = ({emails, setEmails}) => {

  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addEmail(inputValue.trim());
    }
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addEmail(inputValue.trim());
    }
  };

  const addEmail = (email: string) => {
    if (!emailRegex.test(email)) {
      setError('Invalid email address');
    } else if (specialCharAtEndRegex.test(email)) {
      setError('Email cannot end with a special character');
    } else if (emails?.includes(email)) {
      setError('Email already added');
    } else {
      setEmails([...emails, email]);
      setInputValue('');
      setError('');
    }
  };

  const handleDelete = (emailToDelete: string) => {
    setEmails(emails.filter((email) => email !== emailToDelete));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: emails?.length > 0 ? 1 : 0,
      }}>
      <TextField
        placeholder="Email Addresses*"
        variant="outlined"
        size="small"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        error={!!error}
        helperText={error || "Press enter or comma to add email"}
        fullWidth
      />
      {emails?.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {emails?.map((email, index) => (
            <Chip
              key={index}
              label={email}
              onDelete={() => handleDelete(email)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default EmailInput;
