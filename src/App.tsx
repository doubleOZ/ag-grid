import React, { useState } from "react";
import "./App.css";
import data from "./data.json";
import { Space } from "antd";

function App() {
  const [rowData] = useState(data);

  return (
    <Space
      direction="horizontal"
      style={{ width: "100%", justifyContent: "center" }}
    >
      CODE HERE
    </Space>
  );
}

export default App;
