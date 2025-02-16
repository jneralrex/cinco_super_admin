import React, { createContext, useState } from "react";

export const GlobalController = createContext();

export const Global = ({children}) => {
  const [addTheatreAdmin, setAddTheatreAdmin] = useState("");
  const [addAds, setAddAds] = useState("");
  const [addNews, setAddNews] = useState("");
  const [addReport, setAddReport] = useState("");
  return (
    <GlobalController.Provider
      value={{ addTheatreAdmin, setAddTheatreAdmin, addAds, setAddAds,  addNews, setAddNews, addReport, setAddReport }}
    >
      {children}
    </GlobalController.Provider>
  );
};

export default Global;
