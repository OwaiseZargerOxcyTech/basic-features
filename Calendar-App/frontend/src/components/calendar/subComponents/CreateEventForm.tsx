import {
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { memo, useEffect, useState } from "react";
import ColorPickerComponent from "../../common/ColorPickerComponent";
import CustomDateRangePicker from "../../common/CustomDateRangePicker";
import { timeOptions } from "../data";
import SelectOption from "../../common/SelectOption";
import CustomMultilineTextField from "../../common/CustomMultilineTextField";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import { decode } from "html-entities";
import PrimaryButton from "../../common/PrimaryButton";
import SecondaryButton from "../../common/SecondaryButton";
import CustomLinkField from "../../common/CustomLinkField";
import EmailInput from "../../common/EmailInput";
import { selectDecodedToken } from "../../../redux/actions/userSlice";
import { useSelector } from "react-redux";

interface DateRange {
  start: string;
  end: string;
}

interface Event {
  id: number;
  event_name: string;
  event_color: string;
  start: Date;
  end: Date;
  type: string;
  email_addresses?: string;
  meeting_link?: string;
  event_description: any;
}

interface FormValues {
  event_name: string;
  event_color: string;
  event_start_date: string;
  event_end_date: string;
  event_start_time: string;
  event_end_time: string;
  meeting_link?: string;
  event_description: string;
}

interface CreateEventFormProps {
  dateRange: DateRange;
  handleCloseDialog?: () => void;
  fetchEvents: () => void;
  setCreateDialogOpen?: any;
  editMode: boolean;
  event: Event;
  selectedForm: string;
  setSelectedForm: any;
  emails: any;
  setEmails: any;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({
  dateRange,
  handleCloseDialog,
  fetchEvents,
  setCreateDialogOpen,
  editMode,
  event,
  selectedForm,
  setSelectedForm,
  emails,
  setEmails,
}) => {
  const [formValues, setFormValues] = useState<FormValues>({
    event_name: "",
    event_color: "",
    event_start_date: "",
    event_end_date: "",
    event_start_time: "",
    event_end_time: "",
    meeting_link: "",
    event_description: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<string>(""); // to pick color
  // Decode HTML entities
  const decodedDescription = decode(event?.event_description);
  const decodedToken = useSelector(selectDecodedToken);

  useEffect(() => {
    if (editMode) {
      setFormValues({
        event_name: event.event_name,
        event_color: event.event_color,
        event_start_date: moment(event.start).format("YYYY-MM-DD"),
        event_start_time: moment.utc(event.start).format("HH:mm:ss"),
        event_end_date: moment(event.end).format("YYYY-MM-DD"),
        event_end_time: moment.utc(event.end).format("HH:mm:ss"),
        meeting_link: event.meeting_link,
        event_description: decodedDescription,
      });
      setSelectedClass(event?.event_color);
      setSelectedForm(event.type);
      setEmails(event.email_addresses);
    } else {
      setFormValues({
        event_name: "",
        event_color: "",
        event_start_date: dateRange.start,
        event_start_time: moment(dateRange.start).format("HH:mm:ss"),
        event_end_date: dateRange.end,
        event_end_time: moment(dateRange.end).format("HH:mm:ss"),
        meeting_link: event.meeting_link,
        event_description: "",
      });
      setSelectedClass("");
      setSelectedForm("event");
      setEmails([]);
    }
  }, [editMode, event, dateRange]);

  const handleChange =
    (fieldName: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues({
        ...formValues,
        [fieldName]: event.target.value,
      });
    };

  const handleMultilineChange =
    (fieldName: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormValues({
        ...formValues,
        [fieldName]: event.target.value,
      });
    };

  const handleCreateEdit = async () => {
    const {
      event_name,
      event_start_date,
      event_start_time,
      event_end_date,
      event_end_time,
      meeting_link,
      event_description,
    } = formValues;

    // Frontend Validation
    if (
      !event_name ||
      event_name.trim().length < 4 ||
      event_name.trim().length > 30
    ) {
      return toast.error(
        "Event name must be between 4 and 30 characters long!"
      );
    }
    if (!selectedClass || selectedClass.trim().length < 4) {
      return toast.error("Please choose an event color!");
    }
    // Validate Start Date
    if (!event_start_date) {
      return toast.error("Please select a start date!");
    }

    // Validate Start Time
    if (!event_start_time) {
      return toast.error("Please select a start time!");
    }

    // Validate End Date
    if (!event_end_date) {
      return toast.error("Please select an end date!");
    }

    // Validate End Time
    if (!event_end_time) {
      return toast.error("Please select an end time!");
    }

    if (moment(event_start_date).isAfter(moment(event_end_date))) {
      return toast.error("Start date cannot be after end date!");
    }

    if (selectedForm === "meeting") {
      if (!meeting_link || !meeting_link.trim()) {
        return toast.error("Meeting link is required for a meeting!");
      }

      // Validate that the meeting link is a valid URL
      const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator

      if (!urlPattern.test(meeting_link?.trim())) {
        return toast.error("Meeting link must be a valid URL!");
      }

      // Validate email addresses if they are provided
      if (emails && emails.length > 0) {
        const invalidEmails = emails.filter(
          (email: string) => !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
        );
        if (invalidEmails.length > 0) {
          return toast.error("Please provide valid email addresses!");
        }
      }
    }

    if (!event_description || event_description.trim().length < 30) {
      return toast.error(
        "Event description must be at least 30 characters long!"
      );
    }

    const data = {
      created_by: decodedToken?.id,
      event_name: event_name.trim(),
      event_color: selectedClass.trim(),
      start: `${moment(event_start_date).format(
        "YYYY-MM-DD"
      )}T${event_start_time}.000Z`,
      end: `${moment(event_end_date).format(
        "YYYY-MM-DD"
      )}T${event_end_time}.000Z`,
      type: selectedForm,
      email_addresses: selectedForm === "meeting" ? emails || [] : [],
      meeting_link: selectedForm === "meeting" ? meeting_link?.trim() : null,
      event_description: event_description.trim(),
    };

    console.log(data);
    setLoading(true);
    try {
      const response = !editMode
        ? await axios.post(
            `${import.meta.env.VITE_API_URL}calendar/create-event`,
            data
          )
        : await axios.patch(
            `${import.meta.env.VITE_API_URL}calendar/event/${event?.id}`,
            data
          );
      fetchEvents();
      setCreateDialogOpen(false);
      toast.success(response.data.message);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } else {
        // Generic error handling
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormValues({
      ...formValues,
      event_name: "",
      event_color: "",
      event_start_date: dateRange.start,
      event_start_time: moment(dateRange.start).format("HH:mm:ss"),
      event_end_date: dateRange.end,
      event_end_time: moment(dateRange.end).format("HH:mm:ss"),
      meeting_link: "",
      event_description: "",
    });
    setSelectedClass("");
    setEmails([]);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedForm(event.target.value);
    resetForm();
  };

  const handleLinkCancel = () => {
    setFormValues({ ...formValues, meeting_link: "" });
  };

  return (
    <>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <FormControl>
              <RadioGroup row value={selectedForm} onChange={handleFormChange}>
                <FormControlLabel
                  value="event"
                  control={<Radio />}
                  label="Event"
                />
                <FormControlLabel
                  value="meeting"
                  control={<Radio />}
                  label="Meeting"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Title */}
          <Grid item xs={12} sm={6}>
            <CustomLabelTextField
              name="event_name"
              placeholder="Title*"
              value={formValues.event_name}
              onChange={handleChange("event_name")}
              required={true}
            />
          </Grid>

          {/* Choose Color */}
          <Grid item xs={12} sm={6}>
            <ColorPickerComponent
              setSelectedClass={setSelectedClass}
              selectedClass={selectedClass}
            />
          </Grid>

          {/* Start Date and End Date */}
          <Grid item xs={12} sm={12}>
            <CustomDateRangePicker
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>

          {/* Start Time */}
          <Grid item xs={12} sm={6}>
            <SelectOption
              defaultValue={{ label: "12:00 AM", value: "00:00:00" }}
              label="Start time*"
              hideLabel={true}
              required={true}
              field="event_start_time"
              idKey="value"
              getOptionLabel={(option) => option.label}
              staticOptions={timeOptions}
              formValues={formValues}
              setFormValues={setFormValues}
              isDisabled={false}
            />
          </Grid>

          {/* End Time */}
          <Grid item xs={12} sm={6}>
            <SelectOption
              defaultValue={{ label: "12:30 AM", value: "00:30:00" }}
              label="End time*"
              hideLabel={true}
              required={true}
              field="event_end_time"
              idKey="value"
              getOptionLabel={(option) => option.label}
              staticOptions={timeOptions}
              formValues={formValues}
              setFormValues={setFormValues}
              isDisabled={false}
            />
          </Grid>

          {selectedForm === "meeting" && (
            <>
              {/* Meeting Link */}
              <Grid item xs={12} sm={12}>
                <EmailInput emails={emails} setEmails={setEmails} />
              </Grid>

              {/* Meeting Link */}
              <Grid item xs={12} sm={12}>
                <CustomLinkField
                  placeholder="Meeting link*"
                  value={formValues.meeting_link}
                  onChange={handleChange("meeting_link")}
                  onCancel={handleLinkCancel}
                />
              </Grid>
            </>
          )}

          {/* Event Description */}
          <Grid item xs={12} sm={12}>
            <CustomMultilineTextField
              label=""
              name="event_description"
              required={true}
              placeholder="Description*"
              value={formValues.event_description}
              onChange={handleMultilineChange("event_description")}
              rows={selectedForm === "meeting" ? 5 : 13}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <SecondaryButton onClick={handleCloseDialog} disabled={loading}>
          Cancel
        </SecondaryButton>
        <PrimaryButton
          onClick={handleCreateEdit}
          loading={loading}
          disabled={loading}>
          {editMode ? "Save" : "Create"}
        </PrimaryButton>
      </DialogActions>
    </>
  );
};

export default memo(CreateEventForm);
