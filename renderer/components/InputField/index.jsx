import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function InputField({
  id,
  type,
  label,
  value,
  placeholder,
  options,
}) {
  // Validation
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const error = errors[id];

  useEffect(() => setValue(id, value), [setValue, id, value]);

  return (
    <div className="w-full">
      {/* Input label */}
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
          options?.required && <span className="pl-1 text-red-500">*</span>
        )}
      </label>

      {/* Input field */}
      <input
        tabIndex={-1}
        id={id}
        type={type}
        step="any"
        min={options.min?.value}
        max={options.max?.value}
        maxLength={options.maxLength?.value}
        spellCheck={false}
        placeholder={placeholder}
        className={
          (error ? "focus:outline-red-300" : "focus:outline-blue-400") +
          " block w-full rounded-md border border-gray-600 bg-gray-700 p-2.5 text-gray-100 placeholder-gray-400 focus:outline focus:outline-2"
        }
        {...register(id, options)}
      />
    </div>
  );
}
