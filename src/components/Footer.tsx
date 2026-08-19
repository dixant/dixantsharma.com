import { site } from "@/content/site";

export function Footer() {
  return (
    <footer
      className="border-t px-6 py-8 sm:px-10"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
        <span>
          © {new Date().getFullYear()} {site.name.first} {site.name.last}
        </span>
        <span>{site.domain}</span>
      </div>
    </footer>
  );
}
