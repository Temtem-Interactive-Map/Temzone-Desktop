import { markers } from "../../data";

export default function Discover({ type }) {
  return (
    <div className="w-96 overflow-y-scroll bg-gray-800 scrollbar-hide">
      <div className="flex w-full flex-col">
        {markers[type]?.map((marker) => (
          <p key={marker}>{marker}</p>
        ))}
      </div>
    </div>
  );
}
