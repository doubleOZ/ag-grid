import React, { useState } from "react";
import "./App.css";
import { Space } from "antd";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import AssignmentTable from "./AssignmentTable";
import CRUDForm from "./CRUDForm";

function App() {
  return (
    <div className="centered">
      <Space direction="vertical">
        <CRUDForm />

        <AssignmentTable />
      </Space>
    </div>
  );
}

export default App;
