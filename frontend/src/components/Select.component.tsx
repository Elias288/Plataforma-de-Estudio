import { useState } from 'react';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  single?: boolean;
  title: string;
  changeValue?: (option: string) => void;
};
const SelectComponent = ({ title = '', options = [], single = false, changeValue }: Props) => {
  const [selected, setSelected] = useState<Option[]>([]);

  const handleSelect = (value: string) => {
    const option = options.find((o) => o.value === value);
    if (!option) return;
    if (changeValue) changeValue(value);

    if (single) {
      setSelected([option]);
      return;
    }

    if (selected.some((o) => o.value === value)) return;

    setSelected((prev) => [...prev, option]);
  };

  const removeOption = (value: string) => {
    setSelected((prev) => prev.filter((o) => o.value !== value));
  };

  return (
    <div>
      <div className=" bg-gray-50 rounded-md p-2 mb-2 border-b border-gray-300">
        <select
          name="select__option"
          id="select_option"
          defaultValue={''}
          onChange={(e) => {
            handleSelect(e.target.value);
            e.target.value = '';
          }}
          className="w-full cursor-pointer focus:outline-none "
        >
          <option value="" disabled>
            {title}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {selected.map((option) => (
          <li key={option.value} className="bg-gray-50 flex justify-between p-2 mb-1 rounded-md">
            {option.label}
            <button className="cursor-pointer" onClick={() => removeOption(option.value)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectComponent;
