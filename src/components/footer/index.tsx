import Link from "next/link";

const Footer = () => {
  return (
    <footer className="thin-border-t mt-30">
      <div className="editorial-container py-16">
        <div className="flex flex-col sm:flex-row justify-between gap-10">
          {/* Left */}
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="font-serif text-heading-sm text-foreground"
            >
              Ihsan An-Nashir.
            </Link>
            <p className="text-body-sm text-muted max-w-xs">
              Software & AI Engineer based in Jakarta, Indonesia.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-3">
            <span className="section-label text-label font-medium uppercase tracking-[0.15em] text-muted">
              Connect
            </span>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/ihsanannashir"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-muted hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/ihsanannashir"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-muted hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:ihsanannashir@gmail.com"
                className="text-body-sm text-muted hover:text-foreground transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 thin-border-t">
          <p className="text-caption text-subtle">
            © {new Date().getFullYear()} Ihsan An-Nashir
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
