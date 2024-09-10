import { memo, useEffect, useRef, useState } from "react";
import BigCalendar from "./BigCalendar";
import CustomCalendarEvent from "./subComponents/CustomCalendarEvent";
import moment from "moment";
import ReusableDialog from "./subComponents/ReusableDialog";
import CreateEventForm from "./subComponents/CreateEventForm";
import ViewEvent from "./subComponents/ViewEvent";
import axios from "axios";
import toast from "react-hot-toast";
import { selectDecodedToken } from "../../redux/actions/userSlice";
import { useSelector } from "react-redux";

interface DateRange {
  start: string;
  end: string;
}

interface CalendarEvent {
  id: number;
  event_name: string;
  event_color: string;
  start: Date;
  end: Date;
  event_description: any;
  type: string;
  email_addresses: any;
  meeting_link: string;
}

const Calendar: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({ start: "", end: "" });
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [viewDialogOpen, setViewDialogOpen] = useState<boolean>(false);
  const [event, setEvent] = useState<CalendarEvent>({
    id: 0,
    event_name: "",
    event_color: "",
    start: new Date(),
    end: new Date(),
    event_description: "",
    type: "",
    email_addresses: [],
    meeting_link: "",
  });
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [selectedForm, setSelectedForm] = useState<string>("event");
  const [emails, setEmails] = useState<string[]>([]);
  const isFirstRender = useRef(true);
  const decodedToken = useSelector(selectDecodedToken);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}calendar/events/${decodedToken?.id}`
      );
      setCalendarEvents(response.data);
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchEvents();
    }
  }, []);

  const components = {
    event: ({ event }: { event: any }) => {
      return <CustomCalendarEvent event={event} />;
    },
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setEditMode(false);
    setDateRange({
      start: moment(start).format("YYYY-MM-DDTHH:mm:ss"),
      end: moment(end).format("YYYY-MM-DDTHH:mm:ss"),
    });
    setCreateDialogOpen(true); // Open the dialog when a slot is selected
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
  };

  const handleEventSelect = (event: any) => {
    setEvent(event);
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
  };

  return (
    <>
      <BigCalendar
        events={calendarEvents}
        startAccessor={(event) => {
          //removed .000Z
          const convertedStart = moment
            .utc(event.start)
            .format("YYYY-MM-DDTHH:mm:ss");
          const start = moment(convertedStart).toDate();
          return start;
        }}
        endAccessor={(event) => {
          //removed .000Z
          const convertedEnd = moment
            .utc(event.end)
            .format("YYYY-MM-DDTHH:mm:ss");
          const end = moment(convertedEnd).toDate();
          return end;
        }}
        components={components}
        onSelectSlot={handleSelectSlot}
        selectable={true}
        onSelectEvent={handleEventSelect}
      />

      <ReusableDialog
        open={createDialogOpen}
        onClose={handleCloseCreateDialog}
        title={
          editMode
            ? "Edit Event"
            : selectedForm === "event"
            ? "Create Event"
            : "Schedule Meeting"
        }
        content={
          <CreateEventForm
            dateRange={dateRange}
            handleCloseDialog={handleCloseCreateDialog}
            fetchEvents={fetchEvents}
            setCreateDialogOpen={setCreateDialogOpen}
            editMode={editMode}
            event={event}
            selectedForm={selectedForm}
            setSelectedForm={setSelectedForm}
            emails={emails}
            setEmails={setEmails}
          />
        }
      />

      <ReusableDialog
        open={viewDialogOpen}
        onClose={handleCloseViewDialog}
        title={event?.type === "event" ? "Event" : "Meeting"}
        content={
          <ViewEvent
            event={event}
            handleCloseDialog={handleCloseViewDialog}
            fetchEvents={fetchEvents}
            setCreateDialogOpen={setCreateDialogOpen}
            setEditMode={setEditMode}
          />
        }
      />
    </>
  );
};

export default memo(Calendar);
