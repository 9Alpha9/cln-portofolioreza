import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/reviews", label: "Reviews" },
  { href: "/category/keyboard", label: "Keyboard" },
  { href: "/category/mouse", label: "Mouse" },
  { href: "/category/headset", label: "Headset" },
  { href: "/about", label: "About" },
];

export function DesktopNavigation() {
  return (
    <nav aria-label="Navigasi utama" className="hidden md:block">
      <ul className="flex items-center gap-0.5">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="relative px-3 py-2 text-sm font-medium rounded-lg text-foreground/70 hover:text-accent hover:bg-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
