import React from "react";
import { Box, TextField, Button, Grid, Typography, FormControl, Select, MenuItem, Chip } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

const FormComponent: React.FC = () => {
  const [selectedMembers, setSelectedMembers] = React.useState<string[]>([]);
  
  const handleMemberChange = (event: SelectChangeEvent<typeof selectedMembers>) => {
    const {
      target: { value },
    } = event;
    setSelectedMembers(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1 }}>Project Name</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Project Name"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1 }}>Client Name</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Client Name"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" sx={{ mb: 1 }}>Cost</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Project Cost"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small" required>
              <Typography variant="body2" sx={{ mb: 1 }}>Project Type</Typography>
              <Select
                defaultValue=""
                label="Project Type"
              >
                <MenuItem value="" disabled>Choose...</MenuItem>
                <MenuItem value="Hourly">Hourly</MenuItem>
                <MenuItem value="Fixed">Fixed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small" required>
              <Typography variant="body2" sx={{ mb: 1 }}>Category</Typography>
              <Select
                defaultValue=""
                label="Category"
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
                value={selectedMembers}
                onChange={handleMemberChange}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" sx={{ mb: 1 }}>End Date</Typography>
            <TextField
              fullWidth
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
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
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: 1 }}>Upload Documents</Typography>
            <input
              style={{ width: "100%" }}
              type="file"
              multiple
              required
            />
          </Grid>
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
      </Box>
    </Box>
  );
};

export default FormComponent;
