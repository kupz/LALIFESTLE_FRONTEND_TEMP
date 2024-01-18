import { wmsApi } from ".";

export const getBrands = async () => {
  const response = await fetch(`${wmsApi}/brands`, {
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

// Add new Brand
export const addBrand = async (postData) => {
  console.log(JSON.stringify(postData));
  const response = await fetch(`${wmsApi}/brands/`, {
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

// Edit Brand name
export const updateBrand = async (postData) => {
  console.log(JSON.stringify(postData));
  const response = await fetch(`${wmsApi}/brands/`, {
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

// Delete/Hide Brand name
export const removeBrand = async (postData) => {
  console.log(JSON.stringify(postData));
  const response = await fetch(`${wmsApi}/brands/`, {
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
