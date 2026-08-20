"use client";

import { useState } from "react";
import { site } from "@/content/site";

type State = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full border-0 border-b bg-transparent pb-3 pt-2 text-base outline-none transition-colors duration-300 ease-reveal placeholder:text-dim focus:border-ink";
const LABEL =
  "block text-left font-mono text-[10px] uppercase tracking-[0.18em] text-dim";

/**
 * Deliberately three fields. Every extra one costs replies, and anything more
 * than name, address and message can be asked in the reply.
 *
 * On failure the email address is shown rather than a bare "try again", so a
 * broken route never costs a message.
 */
export function ContactForm() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <p className="mx-auto mt-14 max-w-xl text-center text-lg sm:mt-20">
        Thanks. That reached me, and I&apos;ll reply within a day or two.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-14 max-w-xl text-left sm:mt-20"
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={200}
            autoComplete="name"
            className={FIELD}
            style={{ borderColor: "var(--line-strong)" }}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD}
            style={{ borderColor: "var(--line-strong)" }}
          />
        </div>
      </div>

      <div className="mt-8">
        <label className={LABEL} htmlFor="message">
          What are you building?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          maxLength={5000}
          className={`${FIELD} resize-none`}
          style={{ borderColor: "var(--line-strong)" }}
        />
      </div>

      {/* Bot bait. Hidden from people and from screen readers, not from bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="mt-10 text-center">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-block border px-7 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ease-reveal hover:bg-ink hover:text-bg disabled:opacity-50"
          style={{ borderColor: "var(--line-strong)" }}
        >
          {state === "sending" ? "Sending" : "Send message"}
        </button>

        {state === "error" && (
          <p className="mt-6 text-sm text-dim">
            That didn&apos;t go through. Email me directly at{" "}
            <a href={`mailto:${site.email}`} className="text-ink underline">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
