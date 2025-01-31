import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const PopupManagement: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("/api/upload-popup-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImageUrl(response.data.imageUrl);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Popup Management
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="file"
          fullWidth
          margin="normal"
          onChange={handleImageChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Upload Image
        </Button>
      </form>
      {imageUrl && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Uploaded Image:</Typography>
          <img src={imageUrl} alt="Popup" style={{ width: "100%" }} />
        </Box>
      )}
    </Box>
  );
};

export default PopupManagement;