import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend URL
});

const API_BASE = "http://localhost:5000/api/popup";

export const fetchPopupImage = async () => {
  const response = await fetch(`${API_BASE}/get-popup`);
  return response.json();
};

export default api;