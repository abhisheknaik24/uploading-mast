interface SearchInputProps {
  type: string;
  name: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  type,
  name,
  placeholder,
  onChange,
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        className='h-12 w-full rounded-md border-none bg-neutral-700 px-3 text-sm font-medium text-neutral-300 placeholder-neutral-300 outline-none'
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};

export default SearchInput;
