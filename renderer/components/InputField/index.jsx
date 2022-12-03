export default function InputField({
  id,
  label,
  type = "text",
  placeholder = "",
  required = false,
}) {
  return (
    <div>
      {/* Input label */}
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-100"
      >
        {label}
        {required ? <span className="pl-1 text-red-500">*</span> : null}
      </label>

      {/* Input field */}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="block w-full rounded-md border border-gray-600 bg-gray-700 p-2.5 text-gray-100 placeholder-gray-400"
        required={required}
      />
    </div>
  );
}
