import React, { useState, useEffect } from "react";
import axios from "axios";
export const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const fetchWebsiteContent = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data; // HTML content of the website
    } catch (error) {
      console.error("Error fetching website content:", error);
      debugger;
      return null;
    }
  };
  useEffect(() => {
    const url = "https://groww.in/mutual-funds/sbi-contra-fund-direct-growth";
    fetchWebsiteContent(url)
      .then((html) => {
        debugger;
        console.log(html); // HTML content of the website
      })
      .catch((error) => {
        debugger;
        console.error("Error:", error);
      });
  }, []);

  return <div className="pt-20">{stocks}</div>;
};
