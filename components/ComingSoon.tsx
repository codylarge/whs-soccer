export default function ComingSoon({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-green-600 text-xs font-bold uppercase tracking-[0.4em] mb-3">
        Coming Soon
      </p>
      <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-4">
        {title}
      </h1>
      <p className="text-gray-500">
        {description ?? "This page is under construction. Check back soon."}
      </p>
    </main>
  );
}
