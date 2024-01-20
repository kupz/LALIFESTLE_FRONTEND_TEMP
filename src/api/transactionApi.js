import { wmsApi } from ".";

export const getTransactions = async (params) => {
  const { transaction_type, page, limit, filter } = params;

  const response = await fetch(
    `${wmsApi}/transactions?transaction=${encodeURIComponent(
      transaction_type
    )}&page=${encodeURIComponent(page)}&limit=${encodeURIComponent(
      limit
    )}&filter=${encodeURIComponent(filter)}`,
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

// get all transaction type
export const getTransactionType = async () => {
  const response = await fetch(`${wmsApi}/transactions/types`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const result = await response.json();

    return result.data;
  } else {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

// Add new Transaction
export const addTransaction = async (postData) => {
  const response = await fetch(`${wmsApi}/transactions/addtransaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};
