import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import React from "react";
import { Info } from "./type";

const AssignmentTable = () => {
  return (
    <div className="ag-theme-quartz-dark" style={{ height: 450, width: 1000 }}>
      <AgGridReact<Info> />
    </div>
  );
};

export default AssignmentTable;
