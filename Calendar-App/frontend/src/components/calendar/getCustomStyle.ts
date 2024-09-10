interface Event {
  event_color: string;
}

export const getCustomStyle = (event: Event) => {
  const baseStyle: React.CSSProperties = {
    backgroundColor: "#f4433647",
    color: "#F44336 !important",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    borderRadius: "3px",
    textAlign: "center",
    borderLeft: "4px solid #F44336",
    padding: "2px 2px !important",
  };

  switch (event?.event_color) {
    case "bg-color-1":
      return {
        ...baseStyle,
        backgroundColor: "#f4433647",
        color: "#F44336 !important",
        borderLeft: "4px solid #F44336",
      };
    case "bg-color-2":
      return {
        ...baseStyle,
        backgroundColor: "#e91e632e",
        color: "#E91E63 !important",
        borderLeft: "4px solid #E91E63",
      };
    case "bg-color-3":
      return {
        ...baseStyle,
        backgroundColor: "#9c27b042",
        color: "#9C27B0 !important",
        borderLeft: "4px solid #9C27B0",
      };
    case "bg-color-4":
      return {
        ...baseStyle,
        backgroundColor: "#673ab76e",
        color: "#673AB7 !important",
        borderLeft: "4px solid #673AB7",
      };
    case "bg-color-5":
      return {
        ...baseStyle,
        backgroundColor: "#3f51b569",
        color: "#3F51B5 !important",
        borderLeft: "4px solid #3F51B5",
      };
    case "bg-color-6":
      return {
        ...baseStyle,
        backgroundColor: "#2687d570",
        color: "#2687d5 !important",
        borderLeft: "4px solid #2687d5",
      };
    case "bg-color-7":
      return {
        ...baseStyle,
        backgroundColor: "#03a9f42b",
        color: "#03A9F4 !important",
        borderLeft: "4px solid #03A9F4",
      };
    case "bg-color-8":
      return {
        ...baseStyle,
        backgroundColor: "#00422547",
        color: "#004225 !important",
        borderLeft: "4px solid #004225",
      };
    case "bg-color-9":
      return {
        ...baseStyle,
        backgroundColor: "#00968847",
        color: "#009688 !important",
        borderLeft: "4px solid #009688",
      };
    case "bg-color-10":
      return {
        ...baseStyle,
        backgroundColor: "#4caf505e",
        color: "#4CAF50 !important",
        borderLeft: "4px solid #4CAF50",
      };
    case "bg-color-11":
      return {
        ...baseStyle,
        backgroundColor: "#8bc34a47",
        color: "#8BC34A !important",
        borderLeft: "4px solid #8BC34A",
      };
    case "bg-color-12":
      return {
        ...baseStyle,
        backgroundColor: "#cddc3947",
        color: "#CDDC39 !important",
        borderLeft: "4px solid #CDDC39",
      };
    case "bg-color-13":
      return {
        ...baseStyle,
        backgroundColor: "#ffeb3b40",
        color: "#FFEB3B !important",
        borderLeft: "4px solid #FFEB3B",
      };
    case "bg-color-14":
      return {
        ...baseStyle,
        backgroundColor: "#ffc1075c",
        color: "#FFC107 !important",
        borderLeft: "4px solid #FFC107",
      };
    case "bg-color-15":
      return {
        ...baseStyle,
        backgroundColor: "#ff572226",
        color: "#FF5722 !important",
        borderLeft: "4px solid #FF5722",
      };
    case "bg-color-16":
      return {
        ...baseStyle,
        backgroundColor: "#ff98004a",
        color: "#FF9800 !important",
        borderLeft: "4px solid #FF9800",
      };
    case "bg-color-17":
      return {
        ...baseStyle,
        backgroundColor: "#bf715561",
        color: "#bf7155 !important",
        borderLeft: "4px solid #bf7155",
      };
    case "bg-color-18":
      return {
        ...baseStyle,
        backgroundColor: "#7955484d",
        color: "#795548 !important",
        borderLeft: "4px solid #795548",
      };
    case "bg-color-19":
      return {
        ...baseStyle,
        backgroundColor: "#6a6a6a4a",
        color: "#6a6a6a !important",
        borderLeft: "4px solid #6a6a6a",
      };
    case "bg-color-20":
      return {
        ...baseStyle,
        backgroundColor: "#5f788521",
        color: "#5f7885 !important",
        borderLeft: "4px solid #5f7885",
      };
    default:
      return baseStyle;
  }
};
