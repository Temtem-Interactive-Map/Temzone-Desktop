import { InputLabel } from "components/Fields";
import { Minus, Plus } from "components/Icons";
import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";

export function CounterField({ id, label, value, options, onChange }) {
  // Validation
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const error = errors[id];

  useEffect(() => {
    setValue(id, value);
  }, [id, value, setValue]);

  const decrement = useCallback(() => {
    const value = getValues(id) - 1;
    const update = onChange(value);

    if (update) {
      setValue(id, value);
    }
  }, [id, getValues, setValue, onChange]);

  const increment = useCallback(() => {
    const value = getValues(id) + 1;
    const update = onChange(value);

    if (update) {
      setValue(id, value);
    }
  }, [id, getValues, setValue, onChange]);

  return (
    <div className="w-full">
      {/* Input label */}
      <InputLabel id={id} label={label} error={error} />

      {/* Counter field */}
      <div className="flex flex-row">
        {/* Decrement button */}
        <button
          tabIndex={-1}
          data-action="decrement"
          type="button"
          className="flex w-16 items-center justify-center rounded-l-md border border-gray-600 bg-gray-700 hover:bg-gray-600"
          onClick={decrement}
        >
          <Minus className="h-6 w-6 text-gray-100" />
        </button>

        {/* Input field */}
        <input
          tabIndex={-1}
          id={id}
          type="number"
          disabled={true}
          className="pointer-events-none block w-full border-b border-t border-gray-600 bg-gray-700 p-2.5 text-center text-gray-100 placeholder-gray-400 outline-none"
          {...register(id, options)}
        />

        {/* Increment button */}
        <button
          tabIndex={-1}
          data-action="increment"
          type="button"
          className="flex w-16 items-center justify-center rounded-r-md border border-gray-600 bg-gray-700 hover:bg-gray-600"
          onClick={increment}
        >
          <Plus className="h-6 w-6 text-gray-100" />
        </button>
      </div>
    </div>
  );
}
