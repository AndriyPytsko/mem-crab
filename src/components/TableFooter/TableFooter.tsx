import { TableFooterProps } from "./TableFooter.types";
import "./style.css";

function TableFooter(props: TableFooterProps) {
  const { tableState } = props;

  return (
    <tr>
      <td>Average</td>
      {tableState?.table[0]?.map((item, index) => (
        <td key={item.id}>{tableState?.getAverageByColumn(index)}</td>
      ))}
      <td>----</td>
      <td className="add-cell" onClick={() => tableState?.addRow()}>
        Add row
      </td>
    </tr>
  );
}

export default TableFooter;
