import { ReactNode } from "react";

export type CellId = number;

export type CellValue = number;

export type Cell = {
  id: CellId;
  amount: CellValue;
};

export type Row = Cell[];

export type Table = Row[];

export type TableState = {
  table: Table;
  M: number;
  N: number;
  X: number;
  nearestValues: { rowIndex: number; columnIndex: number }[];
};

export type TableProviderType =
  | (TableState & {
      getSumOfRow: (row: Row) => number;
      getAverageByColumn: (columnIndex: number) => number;
      increaseValueInCell: (rowIndex: number, columnIndex: number) => void;
      deleteRow: (rowIndex: number) => void;
      addRow: () => void;
      getNearestValues: (cell: Cell) => void;
      setNearestValues: (cell: Cell) => void;
      removeNearestValues: () => void;
      setTable: (M: number, N: number, X: number) => void;
    })
  | null;

export type TableProviderProps = { children: ReactNode };
