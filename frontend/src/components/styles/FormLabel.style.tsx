type Props = {
  labelText: string;
  inputName: string;
  inputId: string;
  inputType?: React.HTMLInputTypeAttribute;
  onChange?: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined;
};

export const FormLabel = ({
  inputType = 'text',
  labelText,
  inputName,
  inputId,
  onChange,
}: Props) => {
  return (
    <label className="flex flex-col">
      <span className="text-gray-800">{labelText}</span>
      <input
        onChange={onChange}
        type={inputType}
        name={inputName}
        id={inputId}
        className="border-0 border-b-2 border-b-gray-200 focus:outline-none"
      />
    </label>
  );
};

export const FormTextArea = ({ labelText, inputName, inputId }: Props) => {
  return (
    <label className="flex flex-col">
      <span className="text-gray-800">{labelText}</span>
      <textarea
        name={inputName}
        id={inputId}
        className="border-0 border-b-2 border-b-gray-200 max-h-50 focus-visible:outline-0"
      />
    </label>
  );
};
