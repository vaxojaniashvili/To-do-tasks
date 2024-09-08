import { InputFieldTypes } from "@/app/common/types";

const InputField = ({
  type,
  className,
  key,
  value,
  onChange,
  placeholder,
  onKeyDown,
}: InputFieldTypes) => {
  return (
    <input
      onChange={onChange}
      value={value}
      key={key}
      className={className}
      type={type}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  );
};

export default InputField;
