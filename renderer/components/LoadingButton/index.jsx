import { ThreeDots } from "../Icons";

export default function LoadingButton({ loading, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={
        (loading ? "cursor-progress" : "cursor-pointer") +
        " h-10 w-full rounded-md bg-indigo-500 py-2.5 text-center text-sm font-medium text-gray-100 transition-all duration-200 hover:bg-indigo-600 disabled:bg-indigo-600"
      }
    >
      {loading ? (
        <div className="flex justify-center">
          <ThreeDots className="h-5 w-7 text-gray-100" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
