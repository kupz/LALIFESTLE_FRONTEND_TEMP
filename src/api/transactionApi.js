import { wmsApi } from ".";

export const getTransactions = async (params) => {
    const { transaction_type, page, limit } = params;
  
    const response = await fetch(
      `${wmsApi}/transactions?transaction=${encodeURIComponent(
        transaction_type
      )}&page=${encodeURIComponent(page)}&limit=${encodeURIComponent(limit)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    if (response.ok) {
      const result = await response.json();
      return result.data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  };