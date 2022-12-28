export function InputLabel({ id, label, required = false, error }) {
  return (
    <label
      htmlFor={id}
      aria-invalid={!!error}
      className={
        (error ? "text-red-300" : "text-gray-100") +
        " mb-2 block text-sm font-medium"
      }
    >
      {label}
      {error ? (
        <span role="alert" className="pl-1 italic text-red-300">
          - {error?.message}
        </span>
      ) : (
        required && <span className="pl-1 text-red-500">*</span>
      )}
    </label>
  );
}
