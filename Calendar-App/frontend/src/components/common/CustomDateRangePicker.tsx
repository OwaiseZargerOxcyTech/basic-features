import React, { memo } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Grid, IconButton, InputLabel } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from "moment";

interface FormValues {
  event_name: string;
  event_color: string;
  event_start_date: string ;
  event_end_date: string;
  event_start_time: string;
  event_end_time: string;
  event_description: string;
}

interface CustomDateRangePickerProps {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  startlabel?: string;
  endlabel?: string;
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
  formValues,
  setFormValues,
  startlabel,
  endlabel,
}) => {

  
  const handleStartDateChange = (date: Date | null): void => {
    setFormValues({
      ...formValues,
      event_start_date: date ? moment(date).format("YYYY-MM-DD") : "",
    });
  };

  const handleEndDateChange = (date: Date | null): void => {
    setFormValues({
      ...formValues,
      event_end_date: date ? moment(date).format("YYYY-MM-DD") : "",
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        {startlabel ? (
          <InputLabel sx={{ fontSize: "14px", mb: 1, textAlign: "start" }}>
            {startlabel}
          </InputLabel>
        ) : null}

        <DatePicker
          selected={
            formValues?.event_start_date
              ? moment(formValues.event_start_date).toDate()
              : undefined
          }
          onChange={handleStartDateChange}
          selectsStart
          startDate={
            formValues?.event_start_date
              ? moment(formValues.event_start_date).toDate()
              : undefined
          }
          endDate={
            formValues?.event_end_date
              ? moment(formValues.event_end_date).toDate()
              : undefined
          }
          placeholderText="Start date*"
          dateFormat="yyyy-MM-dd"
          maxDate={new Date("9999-12-31")}
          customInput={
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              value={
                formValues?.event_start_date
                  ? moment(formValues.event_start_date).format("YYYY-MM-DD")
                  : ""
              }
              InputProps={{
                endAdornment: (
                  <IconButton size="small" sx={{ fontSize: "1.2rem" }}>
                    <CalendarMonthIcon fontSize="inherit" />
                  </IconButton>
                ),
              }}
            />
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        {endlabel ? (
          <InputLabel sx={{ fontSize: "14px", mb: 1, textAlign: "start" }}>
            {endlabel}
          </InputLabel>
        ) : null}
        <DatePicker
          selected={
            formValues?.event_end_date
              ? moment(formValues.event_end_date).toDate()
              : undefined
          }
          onChange={handleEndDateChange}
          selectsEnd
          startDate={
            formValues?.event_start_date
              ? moment(formValues.event_start_date).toDate()
              : undefined
          }
          endDate={
            formValues?.event_end_date
              ? moment(formValues.event_end_date).toDate()
              : undefined
          }
          minDate={
            formValues?.event_start_date
              ? moment(formValues.event_start_date).toDate()
              : undefined
          }
          placeholderText="End date*"
          dateFormat="yyyy-MM-dd"
          maxDate={new Date("9999-12-31")}
          customInput={
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              value={
                formValues?.event_end_date
                  ? moment(formValues.event_end_date).format("YYYY-MM-DD")
                  : ""
              }
              InputProps={{
                endAdornment: (
                  <IconButton size="small" sx={{ fontSize: "1.2rem" }}>
                    <CalendarMonthIcon fontSize="inherit" />
                  </IconButton>
                ),
              }}
            />
          }
        />
      </Grid>
    </Grid>
  );
};

export default memo(CustomDateRangePicker);
