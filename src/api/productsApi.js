import { wmsApi } from ".";

export const getProducts = async () => {
    const response = await fetch(`${wmsApi}/products/`, {
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
  
  // Get all stocks
  export const getStocks = async () => {
    const response = await fetch(`${wmsApi}/products/stocks`, {
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
  
  // Get reworks stocks
  export const getReworks = async () => {
    const response = await fetch(`${wmsApi}/products/reworks`, {
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
  
  // Get Disposal stocks
  export const getDisposal = async () => {
    const response = await fetch(`${wmsApi}/products/disposal`, {
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
  
  // get all product_conditions
  export const getProductConditions = async () => {
    const response = await fetch(`${wmsApi}/products/conditions`, {
      method: "GET",
    });
  
    if (response.ok) {
      const result = await response.json();
  
      return result.data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  };
  
  // Add new Product
  export const addProduct = async (postData) => {
    console.log(JSON.stringify(postData));
    const response = await fetch(`${wmsApi}/products/`, {
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
  
  // Edit Product
  export const updateProduct = async (postData) => {
    console.log(JSON.stringify(postData));
    const response = await fetch(`${wmsApi}/products/`, {
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
  export const removeProduct = async (postData) => {
    console.log(JSON.stringify(postData));
    const response = await fetch(`${wmsApi}/products/`, {
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