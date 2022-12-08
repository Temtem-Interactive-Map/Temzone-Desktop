import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function InputField({
  id,
  label,
  type = "text",
  value = "",
  placeholder = "",
  options,
}) {
  // Validation
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => setValue(id, value), [setValue, id, value]);

  return (
    <div className="w-full">
      {/* Input label */}
      <label
        htmlFor={id}
        aria-invalid={!!errors[id]}
        className={
          (errors[id] ? "text-red-300" : "text-gray-100") +
          " mb-2 block text-sm font-medium"
        }
      >
        {label}
        {errors[id] ? (
          <span role="alert" className="pl-1 italic text-red-300">
            - {errors[id]?.message}
          </span>
        ) : (
          options?.required && <span className="pl-1 text-red-500">*</span>
        )}
      </label>

      {/* Input field */}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        min={options?.min?.value}
        max={options?.max?.value}
        maxLength={options?.maxLength?.value}
        spellCheck={false}
        className={
          (errors[id] ? "focus:outline-red-300" : "focus:outline-blue-400") +
          " block w-full rounded-md border border-gray-600 bg-gray-700 p-2.5 text-gray-100 placeholder-gray-400 focus:outline focus:outline-2"
        }
        {...register(id, options)}
      />
    </div>
  );
}
