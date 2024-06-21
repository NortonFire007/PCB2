const Input = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  name,
  errorMessage,
}) => {
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        className={`w-full text-black bg-transparent py-2 my-2 border-b outline-none focus:outline-none ${
          errorMessage ? 'border-red-500' : 'border-black'
        }`}
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};
export default Input;
