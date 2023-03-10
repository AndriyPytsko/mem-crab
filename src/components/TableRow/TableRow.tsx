import { TableRowProps } from "./TableRow.types";
import { useContext, useMemo, useState } from "react";
import { TableContext } from "../../providers/TableProvider";
import TableCell from "../TableCell/TableCell";
import "./style.css";

function TableRow(props: TableRowProps) {
  const { row, rowIndex } = props;

  const [isPercentMode, setPercentMode] = useState<boolean>(false);
  const tableState = useContext(TableContext);
  const sumOfRow = useMemo(
    () => tableState?.getSumOfRow(row) || 1,
    [row, tableState]
  );

  return (
    <tr>
      <td>M = {rowIndex + 1}</td>
      {row.map((cell, columnIndex) => (
        <TableCell
          cell={cell}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          sumOfRow={sumOfRow}
          isPercentMode={isPercentMode}
          key={cell.id}
        />
      ))}
      <td
        className="sum-cell"
        onMouseEnter={() => setPercentMode(true)}
        onMouseLeave={() => setPercentMode(false)}
      >
        {sumOfRow}
      </td>
      <td
        className="delete-cell"
        onClick={() => tableState?.deleteRow(rowIndex)}
      >
        Delete
      </td>
    </tr>
  );
}

export default TableRow;
