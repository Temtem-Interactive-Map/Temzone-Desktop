export function Tooltip({ message, children }) {
  return (
    <div
      data-tip={message}
      className="relative z-10 font-medium text-gray-100 before:invisible before:absolute before:-right-3 before:top-1/2 before:w-max before:max-w-xs before:translate-x-full before:-translate-y-1/2 before:rounded-md before:bg-gray-600 before:px-3 before:py-2 before:content-[attr(data-tip)] after:invisible after:absolute after:-right-[0.8rem] after:top-1/2 after:-translate-y-1/2 after:border-8 after:border-r-gray-600 after:border-l-transparent after:border-b-transparent after:border-t-transparent hover:before:visible hover:after:visible"
    >
      {children}
    </div>
  );
}
