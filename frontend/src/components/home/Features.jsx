import { FileText, Layers3, Palette, Sparkles } from "lucide-react";
import Title from "./Title";

const Features = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI writing assist",
      description: "Improve summaries and job descriptions without losing a professional tone.",
    },
    {
      icon: Layers3,
      title: "Complete resume sections",
      description: "Add languages, awards, references, interests, achievements, or custom blocks.",
    },
    {
      icon: Palette,
      title: "Brand color control",
      description: "Pick from curated colors or paste your own hex code for a custom resume accent.",
    },
    {
      icon: FileText,
      title: "Template-ready export",
      description: "Switch templates, preview instantly, make resumes public, and download when ready.",
    },
  ];

  return (
    <section id="features" className="px-6 md:px-16 lg:px-24 xl:px-40 py-24 scroll-mt-12">
      <Title
        title="Everything needed for a real resume"
        description="CareerCraft - AI Resume Builder keeps the builder simple, but gives users enough control for academic, fresher, and professional resumes."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="border border-slate-200 rounded-lg p-5 bg-white hover:border-[#8e51ff]/40 hover:shadow-md transition-all"
            >
              <div className="size-11 rounded-lg bg-[#8e51ff]/10 text-[#8e51ff] flex items-center justify-center">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-6">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
