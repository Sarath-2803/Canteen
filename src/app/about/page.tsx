import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-slate-800">
      <Header />

      <main className="mx-auto max-w-3xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">About us</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Making canteen food faster and simpler.
          </h1>

          <div className="mt-6 space-y-5 text-base leading-7 text-slate-600">
            <p>
              We are a group of students who have experienced standing in queues for long periods and waiting for food.
            </p>
            <p>
              We wished we could skip the queue and get our food faster. So we turned that idea into a project aimed at making the process more efficient and convenient.
            </p>
            <p>
              This is the MVP version of our platform, and we are continuing to improve it so it can better serve our college canteen community.
            </p>
            <p>
              Our goal is to make food ordering smoother, quicker, and more efficient for everyone.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
