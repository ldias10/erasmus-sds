import Select from "react-select";
import React from 'react';


  interface SelectInputProps {
    options: {
      id: number;
      name: string;
    }[];
    title: string;
    name: string;
    defaultValue: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  }

  const SelectInput: React.FC<SelectInputProps> = ({ options, title, name, defaultValue, onChange }) => {

    return (  
      <div>
        <label className="form-label mt-8">{title}</label>
        <select
          className='form-input'
          name={name}
          onChange={onChange}
          required={true}
          value={defaultValue} // Set the default value to "3"
        > 
          <option value="select">--- Select one ---</option>
          {options.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
          
        </select>
      </div>

    );
  };

  export default SelectInput;
