import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface DataItem {
  id: number;
  username: string;
  email: string;
  phone: string;
}

function AllData() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>('http://localhost:3000/file/get-data');
        setData(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadAll = async (): Promise<void> => {
    try {
      const response = await axios.get('http://localhost:3000/file/download', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'all_documents.xlsx');

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading all data:', err);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{`Error: ${error}`}</Alert>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Document Data
      </Typography>
      <Button
        variant="contained"
        color="success"
        onClick={handleDownloadAll}
        sx={{ marginBottom: 2 }}
      >
        Download All
      </Button>

      <Button  variant="contained"
        color="success"
        sx={{ marginBottom: 2 ,ml:2}}>
      <Link style={{textDecoration:"none",color:"white"}} to={'/file-upload'}>Upload File</Link>
      </Button>
      <Button  variant="contained"
        color="success"
        sx={{ marginBottom: 2 ,ml:2}}>
      <Link style={{textDecoration:"none",color:"white"}} to={'/feature-add-data'}>Add Data</Link>
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell align="center">{item.id}</TableCell>
                <TableCell align="center">{item.username}</TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AllData;
