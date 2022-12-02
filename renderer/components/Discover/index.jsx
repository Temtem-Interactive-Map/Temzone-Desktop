export default function Discover({ type }) {
  const markers = Array(100).fill(type);

  return (
    <div
      className="select-none overflow-y-scroll bg-[#303136] scrollbar-hide"
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="flex w-full flex-col">
        {markers.map((marker, i) => (
          <p key={i}>
            {marker} {i}
          </p>
        ))}
      </div>
    </div>
  );
}
