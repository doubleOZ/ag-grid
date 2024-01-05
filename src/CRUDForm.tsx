import { Button, Input, InputNumber, Select, Space, Typography } from "antd";
import { FC } from "react";
import { Gender } from "./type";
import { countries } from "./data";

interface ICRUDForm {}

const CRUDForm: FC<ICRUDForm> = () => {
  return (
    <Space direction="vertical">
      <Space>
        <Typography.Text>First Name</Typography.Text>
        <Input />

        <Typography.Text>Last Name</Typography.Text>
        <Input />

        <Typography.Text>Gender</Typography.Text>
        <Select
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
          options={countries.map((c) => ({
            label: `${c.value} (${c.shortValue})`,
            value: c.value,
          }))}
          style={{ width: 150 }}
        />

        <Typography.Text>Summary</Typography.Text>
        <InputNumber />

        <Typography.Text>Age</Typography.Text>
        <InputNumber />

        <Button type="primary">Add</Button>
        <Button type="primary">Update Selected</Button>
        <Button type="primary" danger>
          Remove Selected
        </Button>
      </Space>

      <Space>
        <Input placeholder="Search..." />
      </Space>
    </Space>
  );
};

export default CRUDForm;
