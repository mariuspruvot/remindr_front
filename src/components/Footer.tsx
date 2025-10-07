/**
 * Footer - Minimal DaisyUI footer
 * Simple, clean, one-line design
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-center bg-base-200 shadow-xl border-t border-base-200 p-4 mt-auto">
      <aside>
        <p className="text-xs text-base-content/50">
          © {currentYear} Remindr · Built with care
        </p>
      </aside>
    </footer>
  );
}
