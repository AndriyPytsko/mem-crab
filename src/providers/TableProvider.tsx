import { createContext, useCallback, useEffect, useState } from "react";
import { generateRandomNumber } from "../utils/generateRandomNumber";
import { createIdFromIndices } from "../utils/createIdFromIndices";
import {
  Table,
  Row,
  Cell,
  TableProviderProps,
  TableState,
  TableProviderType,
} from "./TableProvider.types";

const initialState = {
  M: 1,
  N: 1,
  X: 1,
  table: [],
  nearestValues: [],
};

export const TableContext = createContext<TableProviderType | null>(null);

const TableProvider = (props: TableProviderProps) => {
  const { children } = props;

  const [tableState, setTableState] = useState<TableState>(initialState);

  const createCell = useCallback(
    (indexRow: number, indexColumn: number): Cell => {
      const amount = generateRandomNumber(100, 999);
      return {
        id: createIdFromIndices(indexRow, indexColumn),
        amount,
      };
    },
    []
  );

  const createRow = useCallback(
    (indexRow: number, columnCount: number): Row => {
      const row = [];
      for (let i = 1; i <= columnCount; i++) {
        row.push(createCell(indexRow, i));
      }
      return row;
    },
    [createCell]
  );

  const createTable = useCallback(
    (rowCount: number, columnCount: number): Table => {
      const table = [];
      for (let i = 1; i <= rowCount; i++) {
        table.push(createRow(i, columnCount));
      }
      return table;
    },
    [createRow]
  );

  const getSumOfRow = useCallback((row: Row): number => {
    return row.reduce((sum, cell) => {
      return (sum += cell.amount);
    }, 0);
  }, []);

  const getAverageByColumn = useCallback(
    (columnIndex: number): number => {
      return +(
        tableState.table.reduce((res, cell) => {
          return (res += cell[columnIndex].amount);
        }, 0) / tableState.M
      ).toFixed(2);
    },
    [tableState]
  );

  const deleteRow = useCallback((rowIndex: number) => {
    setTableState((prevState) => ({
      ...prevState,
      table: [
        ...prevState.table.slice(0, rowIndex),
        ...prevState.table.slice(rowIndex + 1),
      ],
    }));
  }, []);

  const addRow = useCallback(() => {
    setTableState((prevState) => ({
      ...prevState,
      table: [
        ...prevState.table,
        createRow(prevState.table.length, prevState.N),
      ],
    }));
  }, [createRow]);

  const getNearestValues = useCallback((cell: Cell) => {
    const res = {} as any;
    tableState.table.forEach((row, rowIndex) => {
      row.forEach((tableCell, columnIndex) => {
        if (tableCell.id !== cell.id) {
          res[Math.abs(cell.amount - tableCell.amount)] = {
            rowIndex,
            columnIndex,
          };
        }
      });
    });
    return Object.values(res).slice(0, tableState.X) as any;
  }, [tableState]);

  const increaseValueInCell = useCallback(
    (rowIndex: number, columnIndex: number) => {
      setTableState((prevState) => {
        const newCell = {
          ...prevState.table[rowIndex][columnIndex],
          amount: ++prevState.table[rowIndex][columnIndex].amount,
        };
        const newRow = [
          ...prevState.table[rowIndex].slice(0, columnIndex),
          newCell,
          ...prevState.table[rowIndex].slice(columnIndex + 1),
        ];
        return {
          ...prevState,
          nearestValues: getNearestValues(newCell),
          table: [
            ...prevState.table.slice(0, rowIndex),
            newRow,
            ...prevState.table.slice(rowIndex + 1),
          ],
        };
      });
    },
    [getNearestValues]
  );

  const setNearestValues = useCallback(
    (cell: Cell) => {
      const nearestValues = getNearestValues(cell);
      setTableState((prevState) => ({
        ...prevState,
        nearestValues,
      }));
    },
    [getNearestValues]
  );

  const removeNearestValues = useCallback(() => {
    setTableState((prevState) => ({
      ...prevState,
      nearestValues: [],
    }));
  }, []);

  const setTable = useCallback((M: number, N: number, X: number) => {
    setTableState({
      table: createTable(M, N),
      M,
      N,
      X,
      nearestValues: [],
    });
  }, [createTable]);

  useEffect(() => {
    setTable(10, 10, 5);
  }, [setTable]);

  return (
    <TableContext.Provider
      value={{
        ...tableState,
        getSumOfRow,
        getAverageByColumn,
        increaseValueInCell,
        addRow,
        deleteRow,
        getNearestValues,
        setNearestValues,
        removeNearestValues,
        setTable,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
