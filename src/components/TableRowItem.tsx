import CheckboxRow from "./CheckboxRow";

interface DataItem {
  name: string;
  device: string;
  path: string;
  status: "available" | "scheduled";
}

interface TableRowProps {
  item: DataItem;
  isSelected: boolean;
  toggleSelection: (name: string) => void;
}

const TableRowItem = ({ item, isSelected, toggleSelection }: TableRowProps) => {
  return (
    <tr className="border-b">
      <td className="p-2 text-center">
        <CheckboxRow
          checked={isSelected}
          onChange={() => toggleSelection(item.name)}
        />
      </td>
      <td className="p-2">{item.name}</td>
      <td className="p-2">{item.device}</td>
      <td className="p-2">{item.path}</td>
      <td className="p-2 flex items-center">
        {item.status === "available" && (
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
        )}
        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
      </td>
    </tr>
  );
};
export default TableRowItem;
