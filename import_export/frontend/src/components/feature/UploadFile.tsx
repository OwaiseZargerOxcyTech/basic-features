import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Button, Box, Typography } from '@mui/material';

const UploadFile: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/file/upload-data', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success response
      console.log('File uploaded successfully:', response.data);
      alert('File uploaded and processed successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file!');
    }
  };

  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Upload Excel File
      </Typography>
      <form onSubmit={handleSubmit}>
        <Button
          variant="contained"
          component="label"
          color="primary"
        >
          Select File
          <input
            type="file"
            accept=".xlsx, .xls"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!selectedFile}
          >
            Upload Excel File
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UploadFile;
