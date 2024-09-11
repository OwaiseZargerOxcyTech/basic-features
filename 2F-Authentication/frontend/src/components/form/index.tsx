import React, { FormEvent, useState } from "react";
import { Box, TextField, Button, Grid, Typography, FormControl, Select, MenuItem, Chip } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";

interface FormData{
  name: string;
  email: string;
  serviceType: string;
  projectName: string;
  teamLeader: string;
  teamMember: string[];
  cost: number | null;
  size: string;
  priority: string;
  projectType: string;
  details: string;
  date: Date | null;
}

// const formatDate = (date: Date | null): string => {
//   if (!date) return '';
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const year = date.getFullYear();
//   return `${day}-${month}-${year}`;
// };

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    serviceType: "",
    projectName: "",
    teamLeader: "",
    teamMember: [],
    cost: null,
    size: "",
    priority: "",
    projectType: "",
    details: "",
    date: null
  });

  const formUrl = import.meta.env.VITE_API_URL + "form/form-details"

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData(prevState => ({
        ...prevState,
        [key]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const {
        target: { value },
    } = event;

    setFormData((prevData) => ({
        ...prevData,
        teamMember: typeof value === 'string' ? value.split(',') : value,
    }));
  };


  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value ? new Date(event.target.value) : null;
    setFormData((prevData) => ({
        ...prevData,
        date: selectedDate,
    }));
  };

  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = value ? Number(value) : 0; 

    setFormData((prevData) => ({
        ...prevData,
        cost: numericValue,
    }));
};

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    try{
      const response = await axios.post(formUrl,formData, {
        headers: {
          'Content-Type': 'application/json' // Explicitly setting the Content-Type header
        }
      });

      console.log("response", response);
      setFormData({
        name: "",
        email: "",
        serviceType: "",
        projectName: "",
        teamLeader: "",
        teamMember: [],
        cost: null,
        size: "",
        priority: "",
        projectType: "",
        details: "",
        date: null
      });
    }
    catch(err){
      console.log(`There was an error while login:${err}`);
    }
  }
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#F6F7F8",
        p: 2,
        width: "100%",
        maxWidth: "100%",
        margin: "auto",
        borderRadius: 5,
      }}
    >
      <Box sx={{ bgcolor: "#F5F5F8", p: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Add Form
        </Typography>
      </Box>
      <Box sx={{ bgcolor: "#FFFFFF", borderRadius: 5, p: 3 }}>
        <form onSubmit={handleSubmitForm}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>Project Name</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Project Name"
                required
                value={formData.projectName}
                onChange={(e) => handleChange('projectName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>Client Name</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Client Name"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" sx={{ mb: 1 }}>Email</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Email"
                InputLabelProps={{ shrink: true }}
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" sx={{ mb: 1 }}>Cost</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Project Cost"
                required
                value={formData.cost}
                onChange={handleCostChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small" required>
                <Typography variant="body2" sx={{ mb: 1 }}>Project Type</Typography>
                <Select
                  defaultValue=""
                  label="Project Type"
                  value={formData.projectType}
                  onChange={(e) => handleChange('projectType', e.target.value)}
                >
                  <MenuItem value="" disabled>Choose...</MenuItem>
                  <MenuItem value="Hourly">Hourly</MenuItem>
                  <MenuItem value="Fixed">Fixed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small" required>
                <Typography variant="body2" sx={{ mb: 1 }}>Service Type</Typography>
                <Select
                  defaultValue=""
                  label="Category"
                  value={formData.serviceType}
                  onChange={(e) => handleChange('serviceType', e.target.value)}
                >
                  <MenuItem value="" disabled>Choose...</MenuItem>
                  <MenuItem value="Developer">Developer</MenuItem>
                  <MenuItem value="Designer">Designer</MenuItem>
                  <MenuItem value="Analyst">Analyst</MenuItem>
                  <MenuItem value="Scientist">Scientist</MenuItem>
                  <MenuItem value="Architect">Architect</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small" required>
                <Typography variant="body2" sx={{ mb: 1 }}>Priority</Typography>
                <Select
                  defaultValue=""
                  label="Priority"
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                >
                  <MenuItem value="" disabled>Choose...</MenuItem>
                  <MenuItem value="Urgent">Urgent</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small" required>
                <Typography variant="body2" sx={{ mb: 1 }}>Select Team Leader</Typography>
                <Select
                  defaultValue=""
                  label="Select Team Leader"
                  value={formData.teamLeader}
                  onChange={(e) => handleChange('teamLeader', e.target.value)}
                >
                  <MenuItem value="Nathan Cooper">Nathan Cooper</MenuItem>
                  <MenuItem value="Owen Davis">Owen Davis</MenuItem>
                  <MenuItem value="Zoey Jenkins">Zoey Jenkins</MenuItem>
                  <MenuItem value="Alexis Taylor">Alexis Taylor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <Typography variant="body2" sx={{ mb: 1 }}>Select Members</Typography>
                <Select
                  multiple
                  value={formData.teamMember}
                  onChange={handleSelectChange}
                  // renderValue={(selected) => (selected as string[]).join(', ')}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="Nathan Cooper">Nathan Cooper</MenuItem>
                  <MenuItem value="Owen Davis">Owen Davis</MenuItem>
                  <MenuItem value="Zoey Jenkins">Zoey Jenkins</MenuItem>
                  <MenuItem value="Alexis Taylor">Alexis Taylor</MenuItem>
                  <MenuItem value="Leonel Hodges">Leonel Hodges</MenuItem>
                  <MenuItem value="Emelia Green">Emelia Green</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small" required>
                <Typography variant="body2" sx={{ mb: 1 }}>Size</Typography>
                <Select
                  defaultValue=""
                  label="Size"
                  value={formData.size}
                  onChange={(e) => handleChange('size', e.target.value)}
                >
                  <MenuItem value="" disabled>Choose...</MenuItem>
                  <MenuItem value="Small">Small</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Large">Large</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" sx={{ mb: 1 }}>Start Date</Typography>
              <TextField
                fullWidth
                size="small"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.date ? formData.date.toISOString().split('T')[0] : ''}
                // value={formData.date}
                onChange={handleDateChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>Details</Typography>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={4}
                placeholder="Enter Project details"
                variant="outlined"
                required
                value={formData.details}
                onChange={(e) => handleChange('details', e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>Upload Documents</Typography>
              <input
                style={{ width: "100%" }}
                type="file"
                multiple
                required
              />
            </Grid> */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button variant="contained" color="primary" type="submit">
                  Add
                </Button>
                <Button variant="outlined" color="secondary">
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default FormComponent;
