export default function NavLink({ active, children }) {
  return (
    <button
      className="group relative block select-none"
      onDragStart={(e) => e.preventDefault()}
    >
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

      <div className="group-active:translate-y-px">
        <div
          className={
            (active
              ? "rounded-2xl bg-[#5965F2]"
              : "rounded-3xl bg-gray-700 group-hover:rounded-2xl group-hover:bg-[#5965F2]") +
            " flex h-12 w-12 items-center justify-center overflow-hidden transition-all duration-200"
          }
        >
          {children}
        </div>
      </div>
    </button>
  );
}
