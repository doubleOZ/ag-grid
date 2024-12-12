import React, { useState } from "react";
import "./App.css";
import { Space } from "antd";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import AssignmentTable from "./AssignmentTable";
import CRUDForm from "./CRUDForm";
import { Info, Gender } from "./type";

function App() {
  const [rowData, setRowData] = useState<Info[]>([
    {
      firstName:'John',
      lastName: 'Doe',
      gender: Gender.Male,
      country: 'USA',
      age: 30,
      salary: 50000
    }
  ]);

  const [selectedRow, setSelectedRow] = useState<Info | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleRowSelected = (row: Info | null) => {
    setSelectedRow(row);
  };

  return (
    <div className="centered">
      <Space direction="vertical">
        <CRUDForm initialData={selectedRow || undefined} onSearch={(term) => setSearchTerm(term)} />

        <AssignmentTable rowData={rowData} onRowSelected={handleRowSelected} searchTerm={searchTerm} />
      </Space>
    </div>
  );
}

export default App;
