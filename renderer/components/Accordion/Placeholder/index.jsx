export function PlaceholderAccordion() {
  return (
    <div className="rounded-lg bg-gray-800 shadow">
      <div className="flex w-full animate-pulse items-center space-x-3 p-4">
        <div>
          <div className="h-12 w-12 rounded-md bg-gray-700" />
        </div>
        <div className="flex flex-col space-y-2.5">
          <div className="h-3 w-24 rounded-md bg-gray-700" />
          <div className="h-3 w-36 rounded-md bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
