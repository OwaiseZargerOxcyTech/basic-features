import { Calendar, CalendarProps, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { memo } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calenderStyle.css";

const localizer = momentLocalizer(moment);
const BigCalendar = (props: Omit<CalendarProps, "localizer">) => {
  return (
    <div
      className="calendar-container"
      style={{
        height: "90vh",
        width: "100%",
        padding: "15px",
      }}>
      <Calendar {...props} localizer={localizer} />
    </div>
  );
};

export default memo(BigCalendar);
