"use client";

import { FormEvent, useState } from "react";
import Header from "@/components/Header";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setStatus("success");
      setMessage("Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800">
      <Header />

      <main className="mx-auto max-w-xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Contact</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Send us a message.
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600">
            We&apos;d love to hear from you about orders, support, or feedback.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
              />
            </div>

            {message ? (
              <p
                className={`text-sm ${status === "success" ? "text-emerald-600" : "text-red-600"}`}
              >
                {message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
