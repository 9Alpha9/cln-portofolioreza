export default function Loading() {
  return (
    <div className="min-h-screen pt-32 pb-8 animate-pulse">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-48 bg-surface-strong rounded mb-4" />
        <div className="h-4 w-96 max-w-full bg-surface-strong rounded mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-surface-strong rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
