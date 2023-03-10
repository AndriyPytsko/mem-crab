import { useContext, useMemo } from "react";
import { TableContext } from "../../providers/TableProvider";
import { TableCellProps } from "./TableCell.types";
import "./style.css";

function TableCell(props: TableCellProps) {
  const { isPercentMode, rowIndex, columnIndex, cell, sumOfRow } = props;

  const tableState = useContext(TableContext);

  const percentText = useMemo(
    () =>
      cell.amount + " -> " + Math.round((cell.amount / sumOfRow) * 100) + "%",
    [cell.amount, sumOfRow]
  );

  const isActiveCell = useMemo(() => {
    return tableState?.nearestValues.find(
      (item) => item.rowIndex === rowIndex && item.columnIndex === columnIndex
    );
  }, [tableState?.nearestValues, rowIndex, columnIndex]);

  return (
    <td
      className={isActiveCell ? "cell active-cell" : "cell"}
      onClick={() => tableState?.increaseValueInCell(rowIndex, columnIndex)}
      onMouseEnter={() => tableState?.setNearestValues(cell)}
      onMouseLeave={() => tableState?.removeNearestValues()}
      key={cell.id}
    >
      {isPercentMode ? percentText : cell.amount}
    </td>
  );
}

export default TableCell;
