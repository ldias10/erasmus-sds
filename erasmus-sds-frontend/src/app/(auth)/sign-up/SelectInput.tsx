// SelectInput.tsx

import React from 'react';

interface SelectInputProps {
  options: { [key: string]: string };
  name: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ options, name, onChange }) => {
  return (
    <div>
      <label className="form-label mt-8">Study Level</label>
      <select
        className='form-input'
        name={name}
        onChange={onChange}
        required={true}
      >
        <option value="">-- select one --</option>
        {Object.entries(options).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
