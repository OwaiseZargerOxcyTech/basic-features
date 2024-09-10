export interface Event {
  id: number;
  start: string;
  end: string;
  event_name: string;
  event_color: string;
  event_description: any;
}

export const events: Event[] = [
  {
    id: 1,
    start: "2024-08-15T00:00:00.000Z",
    end: "2024-08-16T00:00:00.000Z",
    event_name: "This is Event 01",
    event_color: "bg-color-1",
    event_description: "This is a test description.",
  },
  {
    id: 2,
    start: "2024-09-01T00:00:00.000Z",
    end: "2024-09-01T23:59:59.000Z",
    event_name: "Project Deadline",
    event_color: "bg-color-2",
    event_description: "Deadline for the XYZ project submission.",
  },
  {
    id: 3,
    start: "2024-09-05T10:00:00.000Z",
    end: "2024-09-05T11:00:00.000Z",
    event_name: "Team Meeting",
    event_color: "bg-color-3",
    event_description: "Weekly team meeting to discuss project progress.",
  },
  {
    id: 4,
    start: "2024-09-10T14:00:00.000Z",
    end: "2024-09-10T15:00:00.000Z",
    event_name: "Client Presentation",
    event_color: "bg-color-4",
    event_description:
      "Presentation of the latest project updates to the client.",
  },
  {
    id: 5,
    start: "2024-09-15T09:00:00.000Z",
    end: "2024-09-15T18:00:00.000Z",
    event_name: "Product Launch",
    event_color: "bg-color-5",
    event_description: "Launch event for the new product release.",
  },
  {
    id: 6,
    start: "2024-09-20T13:00:00.000Z",
    end: "2024-09-20T16:00:00.000Z",
    event_name: "Training Session",
    event_color: "bg-color-6",
    event_description: "Employee training on new software tools.",
  },
  {
    id: 7,
    start: "2024-09-25T18:00:00.000Z",
    end: "2024-09-25T21:00:00.000Z",
    event_name: "Networking Event",
    event_color: "bg-color-7",
    event_description:
      "Networking event to connect with industry professionals.",
  },
];

export const priorities: string[] = [
  "No Priority",
  "High Priority",
  "Medium Priority",
  "Low Priority",
];

export interface PriorityColors {
  backgroundColor: string;
}

export const priorityColors: Record<string, PriorityColors> = {
  No: { backgroundColor: "#E4E4E4" },
  High: { backgroundColor: "#FF5733" },
  Medium: { backgroundColor: "#F7DC6F" },
  Low: { backgroundColor: "#85C1E9" },
};

export interface TimeOption {
  label: string;
  value: string;
}

export const timeOptions: TimeOption[] = [
  { label: "12:00 AM", value: "00:00:00" },
  { label: "12:15 AM", value: "00:15:00" },
  { label: "12:30 AM", value: "00:30:00" },
  { label: "12:45 AM", value: "00:45:00" },
  { label: "01:00 AM", value: "01:00:00" },
  { label: "01:15 AM", value: "01:15:00" },
  { label: "01:30 AM", value: "01:30:00" },
  { label: "01:45 AM", value: "01:45:00" },
  { label: "02:00 AM", value: "02:00:00" },
  { label: "02:15 AM", value: "02:15:00" },
  { label: "02:30 AM", value: "02:30:00" },
  { label: "02:45 AM", value: "02:45:00" },
  { label: "03:00 AM", value: "03:00:00" },
  { label: "03:15 AM", value: "03:15:00" },
  { label: "03:30 AM", value: "03:30:00" },
  { label: "03:45 AM", value: "03:45:00" },
  { label: "04:00 AM", value: "04:00:00" },
  { label: "04:15 AM", value: "04:15:00" },
  { label: "04:30 AM", value: "04:30:00" },
  { label: "04:45 AM", value: "04:45:00" },
  { label: "05:00 AM", value: "05:00:00" },
  { label: "05:15 AM", value: "05:15:00" },
  { label: "05:30 AM", value: "05:30:00" },
  { label: "05:45 AM", value: "05:45:00" },
  { label: "06:00 AM", value: "06:00:00" },
  { label: "06:15 AM", value: "06:15:00" },
  { label: "06:30 AM", value: "06:30:00" },
  { label: "06:45 AM", value: "06:45:00" },
  { label: "07:00 AM", value: "07:00:00" },
  { label: "07:15 AM", value: "07:15:00" },
  { label: "07:30 AM", value: "07:30:00" },
  { label: "07:45 AM", value: "07:45:00" },
  { label: "08:00 AM", value: "08:00:00" },
  { label: "08:15 AM", value: "08:15:00" },
  { label: "08:30 AM", value: "08:30:00" },
  { label: "08:45 AM", value: "08:45:00" },
  { label: "09:00 AM", value: "09:00:00" },
  { label: "09:15 AM", value: "09:15:00" },
  { label: "09:30 AM", value: "09:30:00" },
  { label: "09:45 AM", value: "09:45:00" },
  { label: "10:00 AM", value: "10:00:00" },
  { label: "10:15 AM", value: "10:15:00" },
  { label: "10:30 AM", value: "10:30:00" },
  { label: "10:45 AM", value: "10:45:00" },
  { label: "11:00 AM", value: "11:00:00" },
  { label: "11:15 AM", value: "11:15:00" },
  { label: "11:30 AM", value: "11:30:00" },
  { label: "11:45 AM", value: "11:45:00" },
  { label: "12:00 PM", value: "12:00:00" },
  { label: "12:15 PM", value: "12:15:00" },
  { label: "12:30 PM", value: "12:30:00" },
  { label: "12:45 PM", value: "12:45:00" },
  { label: "01:00 PM", value: "13:00:00" },
  { label: "01:15 PM", value: "13:15:00" },
  { label: "01:30 PM", value: "13:30:00" },
  { label: "01:45 PM", value: "13:45:00" },
  { label: "02:00 PM", value: "14:00:00" },
  { label: "02:15 PM", value: "14:15:00" },
  { label: "02:30 PM", value: "14:30:00" },
  { label: "02:45 PM", value: "14:45:00" },
  { label: "03:00 PM", value: "15:00:00" },
  { label: "03:15 PM", value: "15:15:00" },
  { label: "03:30 PM", value: "15:30:00" },
  { label: "03:45 PM", value: "15:45:00" },
  { label: "04:00 PM", value: "16:00:00" },
  { label: "04:15 PM", value: "16:15:00" },
  { label: "04:30 PM", value: "16:30:00" },
  { label: "04:45 PM", value: "16:45:00" },
  { label: "05:00 PM", value: "17:00:00" },
  { label: "05:15 PM", value: "17:15:00" },
  { label: "05:30 PM", value: "17:30:00" },
  { label: "05:45 PM", value: "17:45:00" },
  { label: "06:00 PM", value: "18:00:00" },
  { label: "06:15 PM", value: "18:15:00" },
  { label: "06:30 PM", value: "18:30:00" },
  { label: "06:45 PM", value: "18:45:00" },
  { label: "07:00 PM", value: "19:00:00" },
  { label: "07:15 PM", value: "19:15:00" },
  { label: "07:30 PM", value: "19:30:00" },
  { label: "07:45 PM", value: "19:45:00" },
  { label: "08:00 PM", value: "20:00:00" },
  { label: "08:15 PM", value: "20:15:00" },
  { label: "08:30 PM", value: "20:30:00" },
  { label: "08:45 PM", value: "20:45:00" },
  { label: "09:00 PM", value: "21:00:00" },
  { label: "09:15 PM", value: "21:15:00" },
  { label: "09:30 PM", value: "21:30:00" },
  { label: "09:45 PM", value: "21:45:00" },
  { label: "10:00 PM", value: "22:00:00" },
  { label: "10:15 PM", value: "22:15:00" },
  { label: "10:30 PM", value: "22:30:00" },
  { label: "10:45 PM", value: "22:45:00" },
  { label: "11:00 PM", value: "23:00:00" },
  { label: "11:15 PM", value: "23:15:00" },
  { label: "11:30 PM", value: "23:30:00" },
  { label: "11:45 PM", value: "23:45:00" },
];

export const style_classes: Array<{
  backgroundColor: string;
  color: string;
  color_class: string;
}> = [
  {
    backgroundColor: "#f4433647",
    color: "#F44336 !important",
    color_class: "bg-color-1",
  },
  {
    backgroundColor: "#e91e632e",
    color: "#E91E63 !important",
    color_class: "bg-color-2",
  },
  {
    backgroundColor: "#9c27b042",
    color: "#9C27B0 !important",
    color_class: "bg-color-3",
  },
  {
    backgroundColor: "#673ab76e",
    color: "#673AB7 !important",
    color_class: "bg-color-4",
  },
  {
    backgroundColor: "#3f51b569",
    color: "#3F51B5 !important",
    color_class: "bg-color-5",
  },
  {
    backgroundColor: "#2687d570",
    color: "#2687d5 !important",
    color_class: "bg-color-6",
  },
  {
    backgroundColor: "#03a9f42b",
    color: "#03A9F4 !important",
    color_class: "bg-color-7",
  },
  {
    backgroundColor: "#00422547",
    color: "#004225 !important",
    color_class: "bg-color-8",
  },
  {
    backgroundColor: "#00968847",
    color: "#009688 !important",
    color_class: "bg-color-9",
  },
  {
    backgroundColor: "#4caf505e",
    color: "#4CAF50 !important",
    color_class: "bg-color-10",
  },
  {
    backgroundColor: "#8bc34a47",
    color: "#8BC34A !important",
    color_class: "bg-color-11",
  },
  {
    backgroundColor: "#cddc3947",
    color: "#CDDC39 !important",
    color_class: "bg-color-12",
  },
  {
    backgroundColor: "#ffeb3b40",
    color: "#FFEB3B !important",
    color_class: "bg-color-13",
  },
  {
    backgroundColor: "#ffc1075c",
    color: "#FFC107 !important",
    color_class: "bg-color-14",
  },
  {
    backgroundColor: "#ff572226",
    color: "#FF5722 !important",
    color_class: "bg-color-15",
  },
  {
    backgroundColor: "#ff98004a",
    color: "#FF9800 !important",
    color_class: "bg-color-16",
  },
  {
    backgroundColor: "#bf715561",
    color: "#bf7155 !important",
    color_class: "bg-color-17",
  },
  {
    backgroundColor: "#7955484d",
    color: "#795548 !important",
    color_class: "bg-color-18",
  },
  {
    backgroundColor: "#6a6a6a4a",
    color: "#6a6a6a !important",
    color_class: "bg-color-19",
  },
  {
    backgroundColor: "#5f788521",
    color: "#5f7885 !important",
    color_class: "bg-color-20",
  },
];
