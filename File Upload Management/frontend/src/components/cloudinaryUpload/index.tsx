import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

const CloudinaryUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  // const [imageUrl, setImageUrl] = useState<string>("");
  const [images, setImages] = useState<
    { id: number; url: string; title: string }[]
  >([]); // State to store fetched images
  const [updatingImageId, setUpdatingImageId] = useState<number | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post<{ imageUrl: string }>(
          `${import.meta.env.VITE_API_URL}api/cloudinary/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("response.data.imageUrl", response.data.imageUrl);
        fetchImages();
        // setImageUrl(`${response.data.imageUrl}`);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // Function to fetch images from the API
  const fetchImages = async () => {
    try {
      const response = await axios.get<{
        images: { id: number; url: string; title: string }[];
      }>(`${import.meta.env.VITE_API_URL}api/cloudinary/get-images`);
      setImages(response.data.images); // Set the fetched images to the state
      console.log("response", response);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (imageId: number, imageTitle: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}api/cloudinary/delete-image`,
        {
          data: { id: imageId, title: imageTitle },
        }
      );
      fetchImages(); // Refresh the images list after deletion
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleUpdate = async (e: FormEvent, imageId: number) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("id", imageId.toString());

      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}api/cloudinary/update-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        fetchImages(); // Refresh the images list after updating
        setUpdatingImageId(null); // Reset the updating state
        setFile(null); // Clear the selected file
      } catch (error) {
        console.error("Error updating image:", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ fontSize: "18px", padding: "10px" }}
        />
        <button
          type="submit"
          style={{
            fontSize: "18px",
            padding: "2px 10px",
            backgroundColor: "#27c140",
            color: "white",
          }}
        >
          Upload
        </button>
      </form>
      <div>
        <h3 style={{ marginLeft: "10px" }}>All Images:</h3>
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.url}>
              <img
                src={image.url}
                alt={image.title}
                style={{ width: "300px", height: "auto", margin: "10px" }}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ marginLeft: "10px", fontSize: "18px" }}>
                  {image.title}
                </p>
                <button
                  onClick={() => handleDelete(image.id, image.title)}
                  style={{
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "10px",
                    fontSize: "18px",
                    padding: "0px 10px",
                    height: "30px",
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => setUpdatingImageId(image.id)}
                  style={{
                    backgroundColor: "#ffc107",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "10px",
                    fontSize: "18px",
                    padding: "2px 10px",
                    height: "30px",
                  }}
                >
                  Update
                </button>
                {updatingImageId === image.id && (
                  <form onSubmit={(e) => handleUpdate(e, image.id)}>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      style={{ fontSize: "20px", padding: "10px" }}
                    />
                    <button
                      type="submit"
                      style={{
                        marginLeft: "-80px",
                        fontSize: "18px",
                        padding: "2px 5px",
                        backgroundColor: "#27c140",
                        color: "white",
                      }}
                    >
                      Submit Update
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{ marginLeft: "10px" }}>No images found.</p>
        )}
      </div>
    </div>
  );
};

export default CloudinaryUpload;
