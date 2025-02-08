import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const report = location.state?.reportData;
  console.log(report);

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

  return (
    <div className="h-full p-2 md:p-4 flex flex-col items-center mt-4">
      <div className="w-full h-auto max-w-6xl bg-white shadow-lg rounded-lg p-3 md:p-6 mb-8 mt-24 ">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">🧑 Basic Details</h2>
        {/* Removed min-w to allow table to shrink on mobile */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-sm md:text-base">Name</th>
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-sm md:text-base">Mobile</th>
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-sm md:text-base">PAN</th>
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-sm md:text-base">Credit Score</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center border border-gray-300">
              <td className="border border-gray-300 px-2 md:px-4 py-2 text-sm md:text-base">{report.basicDetails.name}</td>
              <td className="border border-gray-300 px-2 md:px-4 py-2 text-sm md:text-base">{report.basicDetails.mobilePhone}</td>
              <td className="border border-gray-300 px-2 md:px-4 py-2 text-sm md:text-base">{report.basicDetails.pan}</td>
              <td className="border border-gray-300 px-2 md:px-4 py-2 text-sm md:text-base">₹{report.basicDetails.creditScore}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full max-w-6xl h-auto bg-white shadow-lg rounded-lg p-3 md:p-6 mb-6 ">
  <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">📋 Report Summary</h2>
  <div className="overflow-x-auto -mx-3 md:mx-0">
    <table className="w-full border-collapse border border-gray-300 min-w-[800px] md:min-w-0">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-base whitespace-nowrap">Total Accounts</th>
          <th className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-base whitespace-nowrap">Active Accounts</th>
          <th className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-base whitespace-nowrap">Closed Accounts</th>
          <th className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-base whitespace-nowrap">Current Balance</th>
          <th className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-base whitespace-nowrap">Secured Balance</th>
          <th className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-base whitespace-nowrap">Unsecured Balance</th>
          <th className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-base whitespace-nowrap">Last 7 Days Credit</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-center border border-gray-300">
          <td className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-base whitespace-nowrap">{report.reportSummary.totalAccount}</td>
          <td className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-base whitespace-nowrap">{report.reportSummary.activeAccount}</td>
          <td className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-base whitespace-nowrap">₹{report.reportSummary.closedAccount}</td>
          <td className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-base whitespace-nowrap">₹{report.reportSummary.currentBalance}</td>
          <td className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-base whitespace-nowrap">₹{report.reportSummary.securedBalance}</td>
          <td className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-base whitespace-nowrap">₹{report.reportSummary.unsecuredBalance}</td>
          <td className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-base whitespace-nowrap">₹{report.reportSummary.last7DaysCredit}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

 
      <div className="w-full max-w-6xl h-full bg-white shadow-lg rounded-lg p-3 md:p-6 mb-6 ">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">🏦 Credit Accounts</h2>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-sm md:text-base">Bank</th>
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-sm md:text-base">Account No</th>
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-sm md:text-base">Balance</th>
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-sm md:text-base">Amount Overdue</th>
            </tr>
          </thead>
          <tbody>
            {report.accountInformation.map((account, index) => (
              <tr key={index} className="text-center border border-gray-300">
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-sm md:text-base">{account.bankOfCreditCard.toUpperCase()}</td>
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-sm md:text-base">{account.accountNumber}</td>
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-sm md:text-base">₹{account.currentBalance}</td>
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-sm md:text-base">₹{account.amountOverdue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-4 mb-6 bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-red-700 text-sm md:text-base"
      >
        Upload Another File
      </button>
    </div>
  );
}

export default ReportPage;