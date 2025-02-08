import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadXml from "./component/UploadXml";
import ReportPage from "./component/ReportPage";
import Header from "./component/Header";

function App() {
  return (
    <Router>
      <div className="bg-[#313743] min-h-screen tracking-widest">
        <Header />
        <Routes>
          <Route path="/" element={<UploadXml />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
