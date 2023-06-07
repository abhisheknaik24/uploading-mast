interface InputProps {
  label?: string;
  type: React.HTMLInputTypeAttribute | undefined;
  className?: string;
  id: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  className,
  id,
  name,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <>
      {label && (
        <label className='font-semibold' htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full rounded-md border-none bg-neutral-700 px-3 font-medium text-neutral-300 placeholder-neutral-300 outline-none ${className}`}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
