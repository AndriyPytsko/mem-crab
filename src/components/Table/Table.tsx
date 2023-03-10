import React, { useContext } from "react";
import { TableContext } from "../../providers/TableProvider";
import "./style.css";
import TableRow from "../TableRow/TableRow";
import TableHead from "../TableHead/TableHead";
import TableFooter from "../TableFooter/TableFooter";

function Table() {
  const tableState = useContext(TableContext);

  return (
    <table className="table">
      <tbody>
        <TableHead tableState={tableState} />
        {tableState?.table.map((row, rowIndex) => (
          <TableRow key={rowIndex} row={row} rowIndex={rowIndex} />
          //it`s bad practise add index as a key
        ))}
      <TableFooter tableState={tableState} />
      </tbody>
    </table>
  );
}

export default Table;
