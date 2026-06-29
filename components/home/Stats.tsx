import { getStats } from "@/lib/data";

// Server Component: istatistikleri data.ts'ten çeker ve map eder.
export default async function Stats() {
  const stats = await getStats();

  return (
    <section className="bg-forest-900">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.id} className="text-center">
            <p className="font-display text-4xl font-bold text-white sm:text-5xl">
              {stat.value}
              <span className="text-clay-500">{stat.suffix}</span>
            </p>
            <p className="mt-2 text-sm text-forest-50/70">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
