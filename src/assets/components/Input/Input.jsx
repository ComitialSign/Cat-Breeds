function Input({
  type,
  className,
  value,
  onChange,
  placeholder,
  onFocus,
  onBlur,
}) {
  return (
    <input
      type={type}
      className={className}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

export default Input;
