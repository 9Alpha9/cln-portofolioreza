import Link from "next/link";

const footerLinks = [
  {
    title: "Navigasi",
    links: [
      { href: "/", label: "Home" },
      { href: "/reviews", label: "Reviews" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Kategori",
    links: [
      { href: "/category/keyboard", label: "Keyboard" },
      { href: "/category/mouse", label: "Mouse" },
      { href: "/category/headset", label: "Headset" },
      { href: "/category/microphone", label: "Microphone" },
      { href: "/category/monitor", label: "Monitor" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <Link href="/" className="text-lg font-bold tracking-tight">
              <span className="text-accent">GGR</span>
              <span className="hidden sm:inline"> Gaming Gear Review</span>
            </Link>
            <p className="mt-3 text-sm text-muted">
              Temukan gear, pahami hasil review, tonton videonya, lalu pilih
              tempat membeli.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-accent">{group.title}</h3>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-xs text-muted text-center">
            &copy; {new Date().getFullYear()} Gaming Gear Review. Seluruh hak
            cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
