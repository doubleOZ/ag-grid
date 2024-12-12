import React, { useState } from "react";
import "./App.css";
import { Space } from "antd";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import AssignmentTable from "./AssignmentTable";
import CRUDForm from "./CRUDForm";
import { Info, Gender } from "./type";
import { rawData } from "./data";

function App() {

  const [selectedRow, setSelectedRow] = useState<Info | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleRowSelected = (row: Info | null) => {
    setSelectedRow(row);
  };

  return (
    <div className="centered">
      <Space direction="vertical">
        <CRUDForm initialData={selectedRow || undefined} onSearch={(term) => setSearchTerm(term)} />

        <AssignmentTable onRowSelected={handleRowSelected} searchTerm={searchTerm} />
      </Space>
    </div>
  );
}

export default App;
