import React from "react";
import TableProvider from "./providers/TableProvider";
import Table from "./components/Table/Table";
import InitTable from "./components/InitTable/InitTable";

function App() {
  return (
    <TableProvider>
      <InitTable />
      <Table />
    </TableProvider>
  );
}

export default App;
