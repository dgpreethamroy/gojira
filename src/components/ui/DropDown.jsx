import React from 'react';
import Combobox from 'react-widgets/Combobox';
import 'react-widgets/styles.css'; // Import the default styles for React Widgets

const DropDown = ({ dropdown, selectedOption, setSelectedOption }) => {
  const { label, options, onChange } = dropdown;

  return (
    <div className="mt-3">
      <label htmlFor={label} className="block text-sm font-medium text-gray-700">{label}</label>
      <Combobox
        id={label}
        data={options}
        value={selectedOption}
        onChange={setSelectedOption}
        placeholder={`Select ${label}`}
        textField="label" // Change to the appropriate field name in your options object
        className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-pointer appearance-none"
        dropUp={false} // Set to true if you want the dropdown to open upwards
        containerClassName="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        listClassName="bg-white rounded-md shadow-lg max-h-60 overflow-y-auto focus:outline-none"
        itemComponent={({ item }) => (
          <div className="p-2 cursor-pointer hover:bg-gray-100">{item.label}</div>
        )}
      />
    </div>
  );
};

export default DropDown;
