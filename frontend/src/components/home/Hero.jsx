import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const logos = [
    { name: "Google", src: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/google.svg" },
    { name: "Microsoft", src: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/microsoft.svg" },
    { name: "LinkedIn", src: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/linkedin.svg" },
    { name: "Indeed", src: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/indeed.svg" },
    { name: "Upwork", src: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/upwork.svg" },
  ];

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#cta" },
  ];

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-slate-950 text-white">
      <img
        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800&auto=format&fit=crop"
        alt="Professional resume workspace"
        className="absolute inset-0 size-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-slate-950/55" />

      <nav className="relative z-20 flex items-center justify-between w-full py-5 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          CareerCraft<span className="text-[#8e51ff]"> - AI Resume Builder</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-white/80">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white transition">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex gap-2">
          <Link
            to="/app?state=login"
            className="px-5 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10 transition"
            hidden={user}
          >
            Login
          </Link>
          <Link
            to={user ? "/app" : "/app?state=register"}
            className="px-6 py-2 bg-[#8e51ff] hover:bg-[#7a3df0] rounded-lg text-white transition"
          >
            {user ? "Dashboard" : "Get Started"}
          </Link>
        </div>

        <button onClick={() => setMenuOpen(true)} className="md:hidden">
          <Menu className="size-7" />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-50 bg-slate-950/95 text-white flex flex-col items-center justify-center gap-8 md:hidden transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <Link to="/app" onClick={() => setMenuOpen(false)}>
          Dashboard
        </Link>
        <button
          onClick={() => setMenuOpen(false)}
          className="size-10 rounded-lg bg-[#8e51ff] flex items-center justify-center"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative z-10 px-6 md:px-16 lg:px-24 xl:px-40 pt-24 pb-12">
        <div className="max-w-3xl">
          <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/85">
            AI resume builder for students, freshers, and professionals
          </p>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold leading-tight">
            CareerCraft - AI Resume Builder
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            Build complete, ATS-ready resumes with custom sections, smart writing help,
            polished templates, and your own brand color.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/app"
              className="h-12 px-7 rounded-lg bg-[#8e51ff] hover:bg-[#7a3df0] text-white flex items-center transition"
            >
              Create Resume
            </Link>
            <a
              href="#features"
              className="h-12 px-7 rounded-lg border border-white/25 hover:bg-white/10 text-white flex items-center transition"
            >
              Explore Features
            </a>
          </div>
        </div>

        <div className="mt-20 max-w-4xl">
          <p className="text-sm uppercase tracking-wide text-white/60">
            Templates built for hiring platforms and modern teams
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="h-12 px-4 rounded-lg bg-white/90 flex items-center gap-3"
              >
                <img src={logo.src} alt={`${logo.name} logo`} className="size-5" />
                <span className="text-sm font-medium text-slate-800">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
