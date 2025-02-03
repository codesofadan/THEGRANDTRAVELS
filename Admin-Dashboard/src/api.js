const API_BASE = "http://localhost:5000/api/popup";

export const uploadPopupImage = async (file) => {
  const formData = new FormData();
  formData.append("popupImage", file);

  const response = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to upload image");
  }

  return response.json();
};

export const fetchPopupImage = async () => {
  const response = await fetch(`${API_BASE}/get-popup`);
  return response.json();
};