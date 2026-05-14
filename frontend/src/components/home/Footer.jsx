import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-32 bg-slate-950 px-6 md:px-16 lg:px-24 xl:px-40 py-12 text-sm text-slate-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <Link to="/" className="text-2xl font-bold tracking-tight text-white">
            CareerCraft<span className="text-[#8e51ff]"> - AI Resume Builder</span>
          </Link>
          <p className="mt-3 max-w-md text-slate-400">
            A modern resume builder with AI writing, flexible sections, custom colors,
            templates, sharing, and PDF-ready preview.
          </p>
        </div>

        <div className="flex flex-wrap gap-5">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#testimonials" className="hover:text-white transition">Reviews</a>
          <Link to="/app" className="hover:text-white transition">Dashboard</Link>
          <a href="#cta" className="hover:text-white transition">Contact</a>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-slate-500">
        <p>© 2026 CareerCraft - AI Resume Builder. All rights reserved.</p>
        <p>Built for fast, professional resume creation.</p>
      </div>
    </footer>
  );
};

export default Footer;
