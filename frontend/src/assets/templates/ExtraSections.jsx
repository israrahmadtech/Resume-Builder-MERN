const ExtraSections = ({ sections = [], accentColor, variant = "default" }) => {
  const visibleSections = sections
    .map((section) => ({
      ...section,
      items: (section.items || []).filter(
        (item) => item.label || item.description || item.date
      ),
    }))
    .filter((section) => section.title && section.items.length > 0);

  if (visibleSections.length === 0) return null;

  const headingClass =
    variant === "sidebar"
      ? "text-sm font-semibold uppercase tracking-wide"
      : "text-xl font-semibold border-b border-gray-200";

  return (
    <>
      {visibleSections.map((section, sectionIndex) => (
        <section key={sectionIndex} className="mb-2">
          <h2 className={headingClass} style={{ color: accentColor }}>
            {section.title}
          </h2>

          <div className="space-y-1 mt-1">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="text-sm">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium text-gray-900">{item.label}</p>
                  {item.date && <p className="text-xs text-gray-500 shrink-0">{item.date}</p>}
                </div>
                {item.description && (
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
};

export default ExtraSections;
