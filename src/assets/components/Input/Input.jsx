/* eslint-disable react/prop-types */
function Input({
  type,
  className,
  value,
  onChange,
  placeholder,
  onFocus,
  onBlur,
  onKeyUp,
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
      onKeyUp={onKeyUp}
    />
  );
}

export default Input;
