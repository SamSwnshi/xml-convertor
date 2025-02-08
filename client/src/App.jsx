import React, { useState } from "react";
import Header from "./component/Header";

function App() {
  const [report, setReport] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMessage("");
  };

  // Handle file upload & update UI instantly
  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("❌ Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadMessage("✅ File uploaded successfully!");
        setReport(result.data); // ✅ Update UI instantly
        setFile(null);
      } else {
        setUploadMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      setUploadMessage("❌ Error uploading file.");
    }
  };

  return (
    <div className="bg-[#313743] min-h-screen">
      <Header/>
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
       

        {/* Upload Section */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-red-700 mb-2">📂 Upload XML File</h2>
          <div className="flex gap-4 items-center">
            <input type="file" onChange={handleFileChange} className="border p-2 rounded-lg" />
            <button
              onClick={handleUpload}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Upload
            </button>
          </div>
          {uploadMessage && <p className="mt-2 text-center text-sm text-red-500">{uploadMessage}</p>}
        </div>

        {/* Display Report After Upload */}
        {report && (
          <div className="border p-4 rounded-lg shadow-md bg-gray-50">
            <h2 className="text-2xl font-semibold text-gray-700">🧑 Basic Details</h2>
            <p><strong>Name:</strong> {report.basicDetails.name}</p>
            <p><strong>Mobile:</strong> {report.basicDetails.mobilePhone}</p>
            <p><strong>PAN:</strong> {report.basicDetails.pan}</p>
            <p><strong>Credit Score:</strong> {report.basicDetails.creditScore}</p>

            <h2 className="text-2xl font-semibold text-gray-700 mt-4">📋 Report Summary</h2>
            <p><strong>Total Accounts:</strong> {report.reportSummary.totalAccount}</p>
            <p><strong>Active Accounts:</strong> {report.reportSummary.activeAccount}</p>
            <p><strong>Closed Accounts:</strong> {report.reportSummary.closedAccount}</p>
            <p><strong>Current Balance:</strong> ₹{report.reportSummary.currentBalance}</p>

            <h2 className="text-2xl font-semibold text-gray-700 mt-4">🏦 Credit Accounts</h2>
            {report.accountInformation.map((account, index) => (
              <p key={index}><strong>Bank:</strong> {account.bankOfCreditCard} | <strong>Account No:</strong> {account.accountNumber} | <strong>Balance:</strong> ₹{account.currentBalance}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
