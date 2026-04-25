export const getPriorityColor = (priority) => {
  switch (priority) {
    case "Critical":
      return "bg-red-700 text-white";
    case "High":
      return "bg-red-500 text-white";
    case "Medium":
      return "bg-yellow-400 text-black";
    case "Low":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-300";
  }
};