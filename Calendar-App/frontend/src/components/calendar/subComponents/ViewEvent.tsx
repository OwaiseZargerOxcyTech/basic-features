import {
  Box,
  Chip,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { memo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getCustomStyle } from "../getCustomStyle";
import EventColorBox from "../../common/EventColorBox";
import { useDispatch } from "react-redux";
import {
  closeCnfModal,
  openCnfModal,
} from "../../../redux/actions/confirmationModalSlice";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import axios from "axios";
import toast from "react-hot-toast";
import { decode } from "html-entities";
import moment from "moment";
import { OpenInNew, PersonAddAlt1Outlined } from "@mui/icons-material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface Event {
  id: number;
  event_name: string;
  event_color: string;
  start: Date;
  end: Date;
  type: string;
  email_addresses: string[];
  meeting_link: string;
  event_description: any;
}

interface CreateEventFormProps {
  handleCloseDialog: () => void;
  fetchEvents: () => void;
  setCreateDialogOpen: any;
  setEditMode: any;
  event: Event;
}

const ViewEvent: React.FC<CreateEventFormProps> = ({
  event,
  handleCloseDialog,
  fetchEvents,
  setCreateDialogOpen,
  setEditMode,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      openCnfModal({
        modalName: "delete-event",
        title: "Are you sure?",
        description: `You want to Delete this ${
          event?.type === "event" ? "event" : "meeting"
        }`,
      })
    );
  };

  const handleClose = () => {
    dispatch(closeCnfModal({ modalName: "delete-event" }));
  };

  const handleDeleteYes = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}calendar/event/${event?.id}`
      );
      handleClose();
      handleCloseDialog();
      fetchEvents();
      toast.success(response.data.message);
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    handleCloseDialog();
    setCreateDialogOpen(true);
  };

  const styleObject = getCustomStyle(event);

  // Decode HTML entities
  const decodedDescription = decode(event?.event_description);

  const startDate = event?.start
    ? moment.utc(event.start).format("dddd, MMMM Do YYYY, h:mm a")
    : "";
  const endDate = event?.end
    ? moment.utc(event.end).format("dddd, MMMM Do YYYY, h:mm a")
    : "";

  return (
    <>
      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignevents: "start",
            gap: 2,
          }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              mb: 1,
            }}>
            <EventColorBox
              backgroundColor={styleObject.backgroundColor}
              color={styleObject.color}
            />
            <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
              {event?.event_name}
            </Typography>
          </Box>

          {/* {startDate && endDate && (
            <Typography
              sx={{
                fontSize: "13px", // Slightly smaller font size
                textAlign: "left", // Left-aligns the text
                color: "#000000", // Custom gray color
                lineHeight: "1.5", // Adds space between lines for readability
                letterSpacing: "0.5px", // Adds spacing between letters
                fontWeight: 400, // Keeps the font-weight at a normal level
                fontFamily: "Roboto, sans-serif", // Ensures consistent font family
              }}>
              {event?.type === "meeting"
                ? `Meeting starts on ${startDate} and ends on ${endDate}.`
                : `Event starts on ${startDate} and ends on ${endDate}.`}
            </Typography>
          )} */}

          {startDate && endDate && (
            <Stack direction="row" spacing={1} alignItems="top">
              <EventIcon sx={{ color: "#808080", fontSize: "24px" }} />
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#000000",
                  lineHeight: "1.5",
                  letterSpacing: "0.5px",
                  fontWeight: 400,
                  fontFamily: "Roboto, sans-serif",
                }}>
                {event?.type === "meeting"
                  ? `Meeting starts on ${startDate} and ends on ${endDate}.`
                  : `Event starts on ${startDate} and ends on ${endDate}.`}
              </Typography>
            </Stack>
          )}

          {/*Meeting Link */}
          {event?.meeting_link && event?.meeting_link !== null && (
            <Stack direction="row" spacing={1} alignItems="top">
              <OpenInNew sx={{ color: "#808080", fontSize: "24px" }} />
              <a
                href={event?.meeting_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}>
                <Typography
                  component="h5"
                  sx={{
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#0084FF",
                    cursor: "pointer",
                    "&:hover": { color: "#0a47ff" },
                  }}>
                  {event?.meeting_link}
                </Typography>
              </a>
            </Stack>
          )}

          {/* Invitees */}
          {event?.email_addresses?.length > 0 && (
            <Stack direction="row" spacing={1} alignItems="top">
              <PersonAddAlt1Outlined
                sx={{ color: "#808080", fontSize: "24px", mr: 1 }}
              />
              <Stack direction="row" alignItems="top" spacing={1}>
                <Typography
                  component="h5"
                  sx={{ fontSize: "13px", fontWeight: "700" }}>
                  Invitees:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap:1
                  }}>
                  {event?.email_addresses.map((email, index) => (
                    <Chip
                      key={index}
                      label={email}
                      sx={{
                        fontSize: "0.7rem",
                        height: "18px",
                        color: "#50a5f1",
                        backgroundColor: "rgba(80, 165, 241, .18);",
                        display: "flex",
                        alignItems: "center",
                      }}
                    />
                  ))}
                </Box>
              </Stack>
            </Stack>
          )}

          <Typography
            sx={{
              fontSize: "13px", // Slightly smaller font size
              textAlign: "justify", // aligns the text
              color: "#666666", // Custom gray color
              lineHeight: "1.5", // Adds space between lines for readability
              letterSpacing: "0.5px", // Adds spacing between letters
              fontWeight: 400, // Keeps the font-weight at a normal level
              fontFamily: "Roboto, sans-serif", // Ensures consistent font family
            }}>
            {decodedDescription}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Tooltip title="Delete event" arrow placement="top">
          <IconButton onClick={handleDelete} sx={{ fontSize: "20px", mr: 1 }}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit event" arrow placement="top">
          <IconButton onClick={handleEdit} sx={{ fontSize: "20px" }}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </DialogActions>

      <ConfirmationDialog value={"delete-event"} handleYes={handleDeleteYes} />
    </>
  );
};

export default memo(ViewEvent);
