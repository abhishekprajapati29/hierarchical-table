import React, { useState } from "react";

const Row = ({ row, updateValue, depth = 0 }) => {
  const [input, setInput] = useState("");

  const handlePercentageAllocation = () => {
    const percentage = parseFloat(input);
    if (!isNaN(percentage)) {
      const newValue = row.value + (row.value * percentage) / 100;
      updateValue(row.id, newValue);
    }
  };

  const handleValueAllocation = () => {
    const newValue = parseFloat(input);
    if (!isNaN(newValue)) {
      updateValue(row.id, newValue);
    }
  };

  const variance = row.originalValue
    ? ((row.value - row.originalValue) / row.originalValue) * 100
    : 0;
  
  const getLabel = (depth, label) => {
    return `${"--".repeat(depth)} ${label}`
  }

  return (
    <>
      <tr>
        {/* Dynamic padding for hierarchy */}
        <td>{getLabel(depth, row.label)}</td>
        <td>{row.value.toFixed(2)}</td>
        <td>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </td>
        <td>
          <button onClick={handlePercentageAllocation}>Allocation %</button>
        </td>
        <td>
          <button onClick={handleValueAllocation}>Allocation Val</button>
        </td>
        <td>{variance.toFixed(2)}%</td>
      </tr>

      {/* Render children rows */}
      {row.children &&
        row.children.map((child) => (
          <Row
            key={child.id}
            row={child}
            updateValue={updateValue}
            depth={depth + 1}
          />
        ))}
    </>
  );
};

export default Row;
