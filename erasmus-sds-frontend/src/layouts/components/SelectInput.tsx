import React, { useState, useEffect } from 'react';

export interface Option {
  id: number;
  name: string;
}

interface SelectInputProps {
  options: Option[];
  title: string;
  name: string;
  defaultValue: string;
  onChange: (name: string, selectedOption: Option | null) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ options, title, name, defaultValue, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find(opt => opt.id.toString() === defaultValue) || null
  );

  useEffect(() => {
    const defaultOption = options.find(opt => opt.id.toString() === defaultValue);
    if (defaultOption) {
      setSelectedOption(defaultOption);
      setSearchTerm(defaultOption.name);
    }
  }, [defaultValue, options]);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
    setSearchTerm(option.name);
    setIsOpen(false);
    onChange(name, option);
  };

  return (
    <div className="relative">
      <label className="form-label mt-8">{title}</label>
      <input
        type="text"
        className="form-input"
        name={name}
        value={searchTerm}
        onFocus={() => setIsOpen(true)}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="--- Select one ---"
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
      />
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto">
          {filteredOptions.map(option => (
            <li
              key={option.id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onMouseDown={() => handleSelectOption(option)}
            >
              {option.name}
            </li>
          ))}
          {filteredOptions.length === 0 && (
            <li className="p-2 text-gray-500">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SelectInput;
