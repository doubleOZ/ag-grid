import { Button, Input, InputNumber, message, Select, Space, Typography } from "antd";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Gender, Info } from "./type";
import { countries } from "./data";

interface ICRUDForm {
  initialData?: Info;
  onSearch: (term:string) => void;
}
const CRUDForm: FC<ICRUDForm> = ({ initialData, onSearch }) => {

// state for form data
  const [formData, setFormData ] = useState<Info>({
    firstName: initialData?.firstName || '',
    lastName:  initialData?.lastName || '',
    gender: initialData?.gender || Gender.Male,
    country: initialData?.country || '',
    age: initialData?.age || 0,
    salary: initialData?.salary || 0
  })

  // When initialData changes, update the form
  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        gender: initialData.gender,
        country: initialData.country,
        age: initialData.age,
        salary: initialData.salary
      });
    }
  }, [initialData]);

  // state for row data
  const [rowData, setRowData] = useState<Info[]>([
    {
      firstName: 'John',
      lastName: 'Doe',
      gender: Gender.Male,
      country: 'USA',
      age: 30,
      salary: 50000,
    }
  ]);

  // state for search
  const [search, setSearch] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearch(term);
    onSearch(term); // Pass the search term to the parent (App)
  }
  // state for grid
  const gridRef = useRef<any>(null);
  // handle input changes
  const handleInputChange = (field: keyof Info, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }

  const handleAdd = () => {
    setRowData(prev => [...prev, formData]);
    message.success('Record added successfully');

    setFormData({
      firstName: '',
      lastName: '',
      gender: Gender.Male,
      country: '',
      age: 0,
      salary: 0
    })
  }

  // update selected record
  const handleUpdate = () => {
    const selectedRows = gridRef.current?.api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
      message.error('Please select a row to update');
      return;
    }

    const updatedData = rowData.map((row, index) => 
      index === rowData.indexOf(selectedRows[0]) 
        ? { ...formData } 
        : row
    );

    setRowData(updatedData);
    message.success('Record updated successfully');
  };

   // Remove selected record
   const handleRemove = () => {
    const selectedRows = gridRef.current?.api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
      message.error('Please select a row to remove');
      return;
    }

    const filteredData = rowData.filter(
      row => row !== selectedRows[0]
    );

    setRowData(filteredData);
    message.success('Record removed successfully');
  };

  // Handle row selection
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current?.api.getSelectedRows();
    if (selectedRows && selectedRows.length > 0) {
      // Populate form with selected row data
      const selected = selectedRows[0];
      setFormData({
        firstName: selected.firstName,
        lastName: selected.lastName,
        gender: selected.gender,
        country: selected.country,
        age: selected.age,
        salary: selected.salary
      });
    }
  }, []);

  return (
    <Space direction="vertical">
      <Space>
        <Typography.Text>First Name</Typography.Text>
        <Input 
        value={formData.firstName}
        onChange={(e)=>handleInputChange('firstName', e.target.value)}
        />
        <Typography.Text>Last Name</Typography.Text>
        <Input 
        value={formData.lastName}
        onChange={(e)=>handleInputChange('lastName', e.target.value)}
        />

        <Typography.Text>Gender</Typography.Text>
        <Select
        value={formData.gender}
        onChange={(value) => handleInputChange('gender', value)}
          options={[
            { label: "Male", value: Gender.Male },
            { label: "Female", value: Gender.Female },
            { label: "LGBTQIA+", value: Gender.LGBTQIA },
          ]}
          style={{ width: 150 }}
        />
      </Space>

      <Space>
        <Typography.Text>Country</Typography.Text>
        <Select
        value={formData.country}
        onChange={(value)=> handleInputChange('country', value)}
          options={countries.map((c) => ({
            label: `${c.value} (${c.shortValue})`,
            value: c.value,
          }))}
          style={{ width: 150 }}
        />

        <Typography.Text>Summary</Typography.Text>
        <InputNumber
        value={formData.salary}
        onChange={(value) => handleInputChange('salary', value)}
        />

        <Typography.Text>Age</Typography.Text>
        <InputNumber 
        value={formData.age}
        onChange={(value) => handleInputChange('age', value)}
        />

        <Button type="primary" onClick={handleAdd}>Add</Button>
        <Button type="primary" onClick={handleUpdate}>Update Selected</Button>
        <Button type="primary" danger onClick={handleRemove}>
          Remove Selected
        </Button>
      </Space>

      <Space>
        <Input 
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
        // style={{ width: 200}}
        />
      </Space>
    </Space>
  );
};

export default CRUDForm;
