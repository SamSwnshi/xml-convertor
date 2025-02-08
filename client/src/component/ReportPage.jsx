import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const report = location.state?.reportData; // Get data from state

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (!report) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">No Report Found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Upload a File
        </button>
      </div>
    );
  }

  const totalAccounts = report.accountInformation.length;
  const totalPages = Math.ceil(totalAccounts / itemsPerPage);

  // Paginate data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = report.accountInformation.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 overflow-hidden p-4">
      
      {/* Basic Details & Report Summary */}
      <div className="w-full max-w-4xl md:max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-8">
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 ">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">🧑 Basic Details</h2>
          <p><strong>Name:</strong> {report.basicDetails.name}</p>
          <p><strong>Mobile:</strong> {report.basicDetails.mobilePhone}</p>
          <p><strong>PAN:</strong> {report.basicDetails.pan}</p>
          <p><strong>Credit Score:</strong> {report.basicDetails.creditScore}</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mt-4 sm:mt-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">📋 Report Summary</h2>
          <p><strong>Total Accounts:</strong> {report.reportSummary.totalAccount}</p>
          <p><strong>Active Accounts:</strong> {report.reportSummary.activeAccount}</p>
          <p><strong>Closed Accounts:</strong> {report.reportSummary.closedAccount}</p>
          <p><strong>Current Balance:</strong> ₹{report.reportSummary.currentBalance}</p>
        </div>
      </div>

      {/* Credit Accounts */}
      <div className="w-full max-w-4xl md:max-w-6xl bg-white shadow-lg rounded-lg p-4 sm:p-6 mt-4 sm:mt-6 h-[40vh] md:h-[50vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">🏦 Credit Accounts</h2>

        {totalAccounts === 0 ? (
          <p className="text-gray-500">No credit accounts found.</p>
        ) : (
          <>
            <div className="space-y-4">
              {currentItems.map((account, index) => (
                <div key={index} className="border-b pb-2">
                  <p><strong>Bank:</strong> {account.bankOfCreditCard}</p>
                  <p><strong>Account No:</strong> {account.accountNumber}</p>
                  <p><strong>Balance:</strong> ₹{account.currentBalance}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center mt-4 gap-2">
                <span className="text-gray-700 font-semibold text-center">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-4 flex-wrap justify-center">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Upload Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-4 sm:mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
      >
        Upload Another File
      </button>

    </div>
  );
}

export default ReportPage;
