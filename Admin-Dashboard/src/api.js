import axios from 'axios';

const API_BASE = "https://trevel-backend.vercel.app/api";

// Function to upload popup image
export const uploadPopupImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("popupImage", file);

    const response = await fetch(`${API_BASE}/popup/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to upload image");
    }

    return response.json();
  } catch (error) {
    console.error('Error uploading popup image:', error);
    throw error;
  }
};

// Function to fetch the latest popup image
export const fetchPopupImage = async () => {
  try {
    const response = await fetch(`${API_BASE}/popup/get-popup`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch popup image");
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching popup image:', error);
    throw error;
  }
};

// Function to create a query
export const createQuery = async (query) => {
  try {
    const response = await axios.post(`${API_BASE}/queries`, query);
    return response.data;
  } catch (error) {
    console.error('Error creating query:', error);
    throw new Error(error.response?.data?.message || 'Failed to create query');
  }
};

// Function to fetch all queries
export const fetchQueries = async () => {
  try {
    const response = await axios.get(`${API_BASE}/queries`);
    return response.data;
  } catch (error) {
    console.error('Error fetching queries:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch queries');
  }
};

// Function to update a query
export const updateQuery = async (queryId, updates) => {
  try {
    const response = await axios.put(`${API_BASE}/queries/${queryId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating query:', error);
    throw new Error(error.response?.data?.message || 'Failed to update query');
  }
};

// Function to add a note to a query
export const addQueryNote = async (queryId, note) => {
  try {
    const response = await axios.post(`${API_BASE}/queries/${queryId}/note`, { note });
    return response.data;
  } catch (error) {
    console.error('Error adding note to query:', error);
    throw new Error(error.response?.data?.message || 'Failed to add note to query');
  }
};

// Function to create a flight
export const createFlight = async (flightData) => {
  try {
    const formData = new FormData();
    for (const key in flightData) {
      formData.append(key, flightData[key]);
    }
    const response = await axios.post(`${API_BASE}/flights/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating flight:', error);
    throw new Error(error.response?.data?.message || 'Failed to create flight');
  }
};

// Function to fetch all flights
export const fetchFlights = async () => {
  try {
    const response = await axios.get(`${API_BASE}/flights/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch flights');
  }
};