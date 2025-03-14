import { useState } from "react";
import CheckboxRow from "./CheckboxRow";
import TableRowItem from "./TableRowItem";

interface DataItem {
  name: string;
  device: string;
  path: string;
  status: "available" | "scheduled";
}

const sampleData: DataItem[] = [
  {
    name: "smss.exe",
    device: "Stark",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: "scheduled",
  },
  {
    name: "netsh.exe",
    device: "Targaryen",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: "available",
  },
  {
    name: "uxtheme.dll",
    device: "Lanniester",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: "available",
  },
  {
    name: "cryptbase.dll",
    device: "Martell",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
    status: "scheduled",
  },
  {
    name: "7za.exe",
    device: "Baratheon",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "scheduled",
  },
];

const Datagrid = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (name: string) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const selectAll = () => {
    if (selected.length === sampleData.length) {
      setSelected([]);
    } else {
      setSelected(sampleData.map((item) => item.name));
    }
  };

  const isSelectedAll = selected.length === sampleData.length;
  const isIntermediate =
    selected.length > 0 && selected.length < sampleData.length;
  const selectedCount = selected.length;
  const availableSelected = selected.every(
    (name) =>
      sampleData.find((item) => item.name === name)?.status === "available"
  );

  const handleDownload = () => {
    const downloadedItems = sampleData
      .filter(
        (item) => selected.includes(item.name) && item.status === "available"
      )
      .map(
        (item) => `Name: ${item.name} Device: ${item.device} Path: ${item.path}`
      )
      .join("\n\n");

    alert(`Downloaded Items\n\n${downloadedItems}`);
  };

  return (
    <div className="p-4 border rounded shadow-md bg-white max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Datagrid</h2>
      <div className="flex justify-between items-center border-b pb-2">
        <label className="flex items-center">
          <CheckboxRow
            checked={isSelectedAll}
            indeterminate={isIntermediate}
            onChange={selectAll}
          />
          {selectedCount > 0 ? `${selectedCount} Selected` : "None Selected"}
        </label>
        <button
          className={`px-4 py-2 rounded transition-all ${
            availableSelected && selectedCount > 0
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!availableSelected || selectedCount === 0}
          onClick={handleDownload}
        >
          Download Selected
        </button>
      </div>
      <table className="w-full border-collapse mt-2">
        <thead>
          <tr className="border-b bg-gray-100 text-left">
            <th className="p-2">Select</th>
            <th className="p-2">Name</th>
            <th className="p-2">Device</th>
            <th className="p-2">Path</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((item) => (
            <TableRowItem
              key={item.name}
              item={item}
              isSelected={selected.includes(item.name)}
              toggleSelection={toggleSelection}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datagrid;
