export default function SuggestionCardSkeleton() {
  return (
    <div className="w-full   flex items-center justify-between bg-white p-4  rounded-2xl shadow-sm border animate-pulse">

      {/* LEFT */}
      <div className="flex items-center gap-1">

        {/* Avatar */}
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>

        {/* Text */}
        <div className="space-y-2">

          <div className="h-3 w-32 bg-gray-300 rounded"></div>

          <div className="h-2 w-24 bg-gray-200 rounded"></div>

          <div className="h-2 w-16 bg-gray-200 rounded"></div>

        </div>

      </div>

      {/* BUTTON */}
      <div className="h-8 w-20 bg-gray-300 rounded-xl"></div>

    </div>
  );
}