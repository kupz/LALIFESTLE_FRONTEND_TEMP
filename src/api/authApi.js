import { wmsApi } from ".";

// Login Api
export const userLogin = async (data) => {
  const response = await fetch(`${wmsApi}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const result = await response.json();

    return result;
  } else {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

// Test token

export const test_token = async (userToken) => {
  const response = await fetch(`${wmsApi}/test_token`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${userToken}`,
    },
  });

  if (response.ok) {
    return true;
  } else {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};
