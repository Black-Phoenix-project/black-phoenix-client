export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Swiper skeleton */}
      <div className="flex gap-4">
        <div className="flex-1 rounded-2xl bg-gradient-to-r from-base-300 via-base-200 to-base-300 bg-[length:200%_100%] animate-shimmer min-h-[320px] sm:min-h-[400px]" />
        <div className="hidden lg:flex flex-col gap-3 w-[220px]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 rounded-2xl bg-gradient-to-r from-base-300 via-base-200 to-base-300 bg-[length:200%_100%] animate-shimmer" />
          ))}
        </div>
      </div>
      {/* Products skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-gradient-to-r from-base-300 via-base-200 to-base-300 bg-[length:200%_100%] animate-shimmer aspect-[3/4]" />
        ))}
      </div>
    </div>
  );
}
