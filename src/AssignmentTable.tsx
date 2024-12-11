import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import { Info } from "./type";
import { rawData } from "./data";
import { ColDef, ValueGetterParams } from "ag-grid-community";

const AssignmentTable = () => {

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
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Country',
      field: 'country',
      sortable: true,
      filter: true,
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
      sortable: true, 
      filter: true,
      valueFormatter: (params) => {
        const gender = params.value;
        const symbol = genderIcons[gender];
        return symbol ? `${symbol} ${gender}` : gender
      } 
    },
    { headerName: 'Age', field: 'age', sortable: true, filter: true },
    {
      headerName: 'Year of Birth',
      valueGetter: (params: ValueGetterParams<Info>) => {
        const currentYear = new Date().getFullYear();
        const birthYear = currentYear - (params.data?.age ?? 0);
        return birthYear;
      },
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Salary',
      field: 'salary',
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        const formattedSalary = new Intl.NumberFormat().format(params.value);
        return formattedSalary;
      },
    }
  ];

  

  const onGridReady = (params: any) => {
    params.api.sizeColumnsToFit();  // Auto-size columns to fit the available width
  };

  return (
    <div className="ag-theme-quartz-dark" style={{ height: 450, width: 1000 }}>
      <AgGridReact<Info> rowData={rawData}  columnDefs={colDefs} animateRows={true} pagination={true}
         domLayout="autoHeight" onGridReady={onGridReady} />
    </div>
  );
};

export default AssignmentTable;
