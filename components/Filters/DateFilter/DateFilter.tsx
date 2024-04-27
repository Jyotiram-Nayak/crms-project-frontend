import React from "react";

export const DateFilter = (timestamp: string) => {
  const date = new Date(timestamp);
  // Get the year, month, and day components
  const year = date.getFullYear(); // Output: 2024
  const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1 // Output: 4
  const day = date.getDate(); // Output: 11

  // Format the date components as desired
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
  // console.log(formattedDate); // Output: "2024-04-11"

  return formattedDate;
};
