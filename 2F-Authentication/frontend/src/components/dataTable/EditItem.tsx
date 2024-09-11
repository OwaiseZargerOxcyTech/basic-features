// import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Grid, Typography, FormControl, Select, MenuItem, Chip, SelectChangeEvent } from "@mui/material";
import { useState, FormEvent } from 'react';
import axios from 'axios';

export const EditItem = () => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { state: rowData } = location;
    const [projectName, setProjectName] = useState(rowData?.projectName);
    const [name, setName] = useState(rowData?.name);
    const [email, setEmail] = useState(rowData?.email);
    const [cost, setCost] = useState(rowData?.cost);
    const [projectType, setProjectType] = useState(rowData?.projectType);
    const [serviceType, setServiceType] = useState(rowData?.serviceType);
    const [priority, setPriority] = useState(rowData?.priority);
    const [teamLeader, setTeamLeader] = useState(rowData?.teamLeader);
    const [teamMember, setTeamMember] = useState<string[]>(rowData?.teamMember || []);
    const [size, setSize] = useState(rowData?.size);
    const [date, setDate] = useState(() => {
      if(rowData.date){
        return new Date(rowData.date).toISOString().split('T')[0];
      }
      return '';
    });
    const [details, setDetails] = useState(rowData?.details);

    const editUrl = import.meta.env.VITE_API_URL + `form/updateProfile/${id}`;

    const handleSelectChange = (event: SelectChangeEvent<typeof teamMember>) => {
      const {
          target: { value },
      } = event;
  
      setTeamMember(
          typeof value === 'string' ? value.split(',') : value,
      );
  };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const dateString = event.target.value;
      setDate(dateString);
    };

    const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const numericValue = value ? Number(value) : 0; 
  
      setCost(numericValue);
  };

    const handleEditData = async (e: FormEvent) =>{
        e.preventDefault();
        const isoDate = new Date(date).toISOString();
        await axios.patch(editUrl, {
            projectName:projectName,
            name: name,
            email: email,
            cost: cost,
            projectType: projectType,
            serviceType:serviceType,
            priority: priority,
            teamLeader: teamLeader,
            teamMember: teamMember,
            size: size,
            date: isoDate,
            details: details
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
            console.log(response, "edit form Response");
            alert("Form editted successfully!!");
            navigate("/table");
        })
        .catch((err) => {
            console.log(err, "error submitting edit form");
        })
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
          Edit Form
        </Typography>
      </Box>
      <Box sx={{ bgcolor: "#FFFFFF", borderRadius: 5, p: 3 }}>
        <form onSubmit={handleEditData}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>Project Name</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>Client Name</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Client Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" sx={{ mb: 1 }}>Email</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Email"
                InputLabelProps={{ shrink: true }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" sx={{ mb: 1 }}>Cost</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Project Cost"
                value={cost}
                onChange={handleCostChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small" required>
                <Typography variant="body2" sx={{ mb: 1 }}>Project Type</Typography>
                <Select
                  label="Project Type"
                  defaultValue=""
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                >
                  {/* <MenuItem value="" disabled>Choose...</MenuItem> */}
                  <MenuItem value="Hourly">Hourly</MenuItem>
                  <MenuItem value="Fixed">Fixed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <Typography variant="body2" sx={{ mb: 1 }}>Service Type</Typography>
                <Select
                  defaultValue=""
                  label="Category"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  {/* <MenuItem value="" disabled>Choose...</MenuItem> */}
                  <MenuItem value="Developer">Developer</MenuItem>
                  <MenuItem value="Designer">Designer</MenuItem>
                  <MenuItem value="Analyst">Analyst</MenuItem>
                  <MenuItem value="Scientist">Scientist</MenuItem>
                  <MenuItem value="Architect">Architect</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <Typography variant="body2" sx={{ mb: 1 }}>Priority</Typography>
                <Select
                  defaultValue=""
                  label="Priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  {/* <MenuItem value="" disabled>Choose...</MenuItem> */}
                  <MenuItem value="Urgent">Urgent</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <Typography variant="body2" sx={{ mb: 1 }}>Select Team Leader</Typography>
                <Select
                  defaultValue=""
                  label="Select Team Leader"
                  value={teamLeader}
                  onChange={(e) => setTeamLeader(e.target.value)}
                >
                  <MenuItem value="Zahid Khan">Zahid Khan</MenuItem>
                  <MenuItem value="Raviraj Navale">Raviraj Navale</MenuItem>
                  <MenuItem value="Owais Zarger">Owais Zarger</MenuItem>
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
                  value={teamMember}
                  onChange={handleSelectChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="Furqan Shaikh">Furqan Shaikh</MenuItem>
                  <MenuItem value="Mohammad Rehan">Mohammad Rehan</MenuItem>
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
              <FormControl fullWidth size="small">
                <Typography variant="body2" sx={{ mb: 1 }}>Size</Typography>
                <Select
                  defaultValue=""
                  label="Size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
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
                value={date}
                onChange={handleDateChange}
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
                value={details}
                onChange={(e) => setDetails(e.target.value)}
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
                  Edit Form
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  )
}
