import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import { Info } from "./type";
import { rawData } from "./data";
import { ColDef, GridReadyEvent, ValueGetterParams } from "ag-grid-community";
import React, { useCallback, useEffect, useState } from "react";

interface AssignmentTableProps {
  onRowSelected?: (selectedRow: any) => void;
  searchTerm: string;
}

const AssignmentTable: React.FC<AssignmentTableProps> = ({onRowSelected, searchTerm}) => {

  const [rowData] = useState<Info[]>(rawData);
  const countryAbbreviations: { [key: string]: string} = {
    'United States': 'US',
    'Canada': 'CAN',
    'France': 'FR',
    'Spain': 'SPA',
    'Japan': 'JPN',
  }

  const genderIcons: { [key: string]: string} = {
    'Male': '♂️',
    'Female': '♀',
    'LGBTQIA+': '🏳️‍🌈',
  }

  const colDefs: ColDef<Info>[] = [
    {
      headerName: 'Name',
      valueGetter: (params: ValueGetterParams<Info>) => {
        const data = params.data;
        return data ? `${data.firstName} ${data.lastName}` : '';
      },
      // sortable: true,
      filter: true,
      // hide: true
      
    },
    {
      headerName: 'Country',
      field: 'country',
      // sortable: true,
      filter: true,
      // enableRowGroup: true,
      // rowDrag: true,
      // rowGroup: true,
      valueFormatter: (params) => {
        const country = params.value;
        const abbreviation = countryAbbreviations[country];
        return abbreviation ? `${country} (${abbreviation})` : country;
      },
    },
    { headerName: 'Gender', 
      field: 'gender', 
      // sortable: true, 
      filter: true,
      // enableRowGroup: true,
      valueFormatter: (params) => {
        const gender = params.value;
        const symbol = genderIcons[gender];
        return symbol ? `${symbol} ${gender}` : gender
      } 
    },
    { 
      headerName: 'Age', 
      field: 'age', 
      aggFunc: 'max',
      // sortable: true, 
      filter: true, 
      valueFormatter: (params) => { return params.value || 'N/A';}
    },
    {
      headerName: 'Year of Birth',
      valueGetter: (params: ValueGetterParams<Info>) => {
        const currentYear = new Date().getFullYear();
        const birthYear = currentYear - (params.data?.age ?? 0);
        return birthYear;
      },
      // sortable: true,
      filter: true,
    },
    {
      headerName: 'Salary',
      field: 'salary',
      aggFunc: 'avg',
      // sortable: true,
      filter: true,
      valueFormatter: (params) => {
        const formattedSalary = new Intl.NumberFormat().format(params.value);
        return formattedSalary;
      },
    }
  ];

  const [defaultColDef] = useState({
    enableRowGroup: true,
    enableValue: true,
  });

  const [gridApi, setGridApi] = useState<any>(null);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();  // Auto-size columns to fit the available width
  },[]);

  useEffect(() => {
    if (gridApi) {
      gridApi.setQuickFilter(searchTerm);
    }
  }, [searchTerm, gridApi]);

  const onSelectionChanged = (event: any) => {
    const selectedRows = event.api.getSelectedRows();
    if (selectedRows && selectedRows.length > 0) {
      // Call the prop function if it exists
      onRowSelected?.(selectedRows[0]);
    }
  };

  return (
    <div className="ag-theme-quartz-dark" style={{ height: 450, width: 1000 }}>
      <AgGridReact<Info> 
      defaultColDef={defaultColDef} 
      suppressDragLeaveHidesColumns={true} 
      rowData={rowData} 
      rowGroupPanelShow="always" 
      columnDefs={colDefs} 
      animateRows={true} 
      pagination={true}
      domLayout="autoHeight" 
      onGridReady={onGridReady} 
      rowSelection="single" 
      onSelectionChanged={onSelectionChanged} />
    </div>
  );
};

export default AssignmentTable;
