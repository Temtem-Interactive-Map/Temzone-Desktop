export default function InputField({
  id,
  label,
  type = "text",
  placeholder = "",
  required = false,
  error,
  props,
}) {
  return (
    <div>
      {/* Input label */}
      <label
        htmlFor={id}
        className={
          (error ? "text-red-300" : "text-gray-100") +
          " mb-2 block text-sm font-medium"
        }
      >
        {label}
        {error ? (
          <span className="italic text-red-300"> - {error}</span>
        ) : (
          required && <span className="text-red-500"> *</span>
        )}
      </label>

      {/* Input field */}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="block w-full rounded-md border border-gray-600 bg-gray-700 p-2.5 text-gray-100 placeholder-gray-400"
        {...props}
      />
    </div>
  );
}
