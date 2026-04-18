export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl animate-pulse space-y-6">
        <div className="h-10 w-56 rounded-xl bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-28 rounded-2xl bg-white shadow-sm" />
          ))}
        </div>
        <div className="h-96 rounded-2xl bg-white shadow-sm" />
      </div>
    </div>
  );
}
