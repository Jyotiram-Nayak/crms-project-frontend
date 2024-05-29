import React from "react";

export const DateFilter = (timestamp: string) => {
  const date = new Date(timestamp);
  // Get the year, month, and day components
  const year = date.getFullYear(); 
  const month = date.getMonth() + 1;
  const day = date.getDate(); 

  // Format the date components as desired
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;

  return formattedDate;
};


  // sort the description
 export const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };