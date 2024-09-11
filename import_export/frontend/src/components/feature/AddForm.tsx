import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';

interface FormData {
  username: string;
  email: string;
  phone: string;
}

const AddForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    phone: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/file/add-data', formData);
      if (response.data.success) {
        setSuccess('Data added successfully!');
        setError(null);
        setFormData({ username: '', email: '', phone: '' });
      } else {
        setSuccess(null);
        setError('Failed to add data');
      }
    } catch (error) {
      setSuccess(null);
      setError('An error occurred');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 6,mb:4, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Add New Data
        </Typography>
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              variant="outlined"
              margin="normal"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined"
              margin="normal"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              variant="outlined"
              margin="normal"
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
          >
            Add Data
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddForm;
