export function NavLink({ active, onClick, children }) {
  return (
    <div className="group relative block">
      {/* Left arrow */}
      <div className="absolute -left-3 flex h-full items-center">
        <div
          className={
            (active
              ? "h-10"
              : "h-5 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100") +
            " w-1 origin-left rounded-r bg-white transition-all duration-200"
          }
        />
      </div>

      {/* Main button */}
      <button
        tabIndex={-1}
        className="group-active:translate-y-px"
        onClick={onClick}
      >
        <div
          className={
            (active
              ? "rounded-2xl bg-indigo-500"
              : "rounded-3xl bg-gray-700 group-hover:rounded-2xl group-hover:bg-indigo-500") +
            " flex h-12 w-12 items-center justify-center overflow-hidden transition-all duration-200"
          }
        >
          {children}
        </div>
      </button>
    </div>
  );
}
