import React, { useState } from "react";
import Row from "./Row";
import { rows as initialData } from "../data";

const Table = () => {
  const [data, setData] = useState(
    initialData.map(item => ({
      ...item,
      originalValue: item.value,
      children: item.children
        ? item.children.map(child => ({
            ...child,
            originalValue: child.value,
          }))
        : null
    }))
  );
  
  const updateValue = (id, newValue) => {
    const updateHierarchy = (items) => {
      return items.map((item) => {
        if (item.id === id) {
          if (item.children) {
            const originalTotal = item.children.reduce(
              (sum, child) => sum + child.value,
              0
            );
            const updatedChildren = item.children.map((child) => {
              const contribution = child.value / originalTotal;
              const newChildValue = contribution * newValue;
              return { ...child, value: newChildValue };
            });
            return { ...item, value: newValue, children: updatedChildren };
          }
          return { ...item, value: newValue };
        } else if (item.children) {
          const updatedChildren = updateHierarchy(item.children);
          const hasUpdatedChild = updatedChildren.some(
            (child, index) => child !== item.children[index]
          );
          if (hasUpdatedChild) {
            const updatedValue = updatedChildren.reduce(
              (sum, child) => sum + child.value,
              0
            );
            return { ...item, children: updatedChildren, value: updatedValue };
          }
        }
        return item;
      });
    };
  
    setData(updateHierarchy(data));
  };
  

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input</th>
          <th>Allocation %</th>
          <th>Allocation Val</th>
          <th>Variance %</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <Row key={row.id} row={row} updateValue={updateValue} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;