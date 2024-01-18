import { wmsApi } from ".";

export const getStores = async () => {
  const response = await fetch(`${wmsApi}/stores`, {
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

// Add new Store
export const addStore = async (postData) => {
  console.log(JSON.stringify(postData));
  const response = await fetch(`${wmsApi}/stores/`, {
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

// Edit Store
export const updateStore = async (postData) => {
  console.log(JSON.stringify(postData));
  const response = await fetch(`${wmsApi}/stores/`, {
    method: "PATCH",
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

// Delete/Hide Store
export const removeStore = async (postData) => {
  console.log(JSON.stringify(postData));
  const response = await fetch(`${wmsApi}/stores/`, {
    method: "DELETE",
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
