import { TableHeadProps } from "./TableHead.types";

function TableHead(props: TableHeadProps) {
  const { tableState } = props;

  return (
    <tr>
      <th></th>
      {tableState?.table[0]?.map((item, index) => (
        <th key={item.id}>N = {index + 1}</th>
      ))}
      <th>Sum</th>
      <th>Actions</th>
    </tr>
  );
}

export default TableHead;
