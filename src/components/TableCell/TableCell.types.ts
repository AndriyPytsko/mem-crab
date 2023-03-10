import { Cell } from "../../providers/TableProvider.types";

export type TableCellProps = {
  isPercentMode: boolean;
  rowIndex: number;
  columnIndex: number;
  cell: Cell;
  sumOfRow: number;
};
