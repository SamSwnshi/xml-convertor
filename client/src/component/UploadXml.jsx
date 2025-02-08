import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api"; 

function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage(" Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/upload", formData);
      setUploadMessage(" File uploaded successfully!");
      setFile(null);
      navigate("/report", { state: { reportData: response.data.data } });
    } catch (error) {
      setUploadMessage(` ${error.response?.data?.message || "Error uploading file."}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <div className=" p-4 rounded-lg ">
          <h2 className="text-2xl font-semibold text-red-700 mb-4  text-center">Upload XML File</h2>
          <div className="flex flex-col gap-4 items-center">
            <input type="file" onChange={handleFileChange} className="border p-2 rounded-lg w-full max-w-sm" />
            <button
              onClick={handleUpload}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Upload
            </button>
          </div>
          {uploadMessage && <p className="mt-2 text-center text-sm text-red-500">{uploadMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
