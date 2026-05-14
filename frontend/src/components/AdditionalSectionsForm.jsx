import { Layers3, Plus, Trash2 } from "lucide-react";

const sectionPresets = ["Languages", "Awards", "Achievements", "Interests", "References"];

const AdditionalSectionsForm = ({ data = [], onChange }) => {
  const addSection = (title = "") => {
    onChange([...data, { title, items: [{ label: "", description: "", date: "" }] }]);
  };

  const removeSection = (sectionIndex) => {
    onChange(data.filter((_, index) => index !== sectionIndex));
  };

  const updateSection = (sectionIndex, field, value) => {
    const updated = [...data];
    updated[sectionIndex] = { ...updated[sectionIndex], [field]: value };
    onChange(updated);
  };

  const addItem = (sectionIndex) => {
    const updated = [...data];
    const items = updated[sectionIndex].items || [];
    updated[sectionIndex] = {
      ...updated[sectionIndex],
      items: [...items, { label: "", description: "", date: "" }],
    };
    onChange(updated);
  };

  const removeItem = (sectionIndex, itemIndex) => {
    const updated = [...data];
    updated[sectionIndex] = {
      ...updated[sectionIndex],
      items: updated[sectionIndex].items.filter((_, index) => index !== itemIndex),
    };
    onChange(updated);
  };

  const updateItem = (sectionIndex, itemIndex, field, value) => {
    const updated = [...data];
    const items = [...(updated[sectionIndex].items || [])];
    items[itemIndex] = { ...items[itemIndex], [field]: value };
    updated[sectionIndex] = { ...updated[sectionIndex], items };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Additional Sections
          </h3>
          <p className="text-sm text-gray-500">
            Add languages, awards, interests, references, or your own sections.
          </p>
        </div>

        <button
          type="button"
          onClick={() => addSection()}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-[#8e51ff]/10 text-[#8e51ff] rounded-lg hover:bg-[#8e51ff]/15 transition-colors"
        >
          <Plus className="size-4" />
          Add Section
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {sectionPresets.map((preset) => (
          <button
            type="button"
            key={preset}
            onClick={() => addSection(preset)}
            className="px-3 py-1.5 text-xs rounded-full border border-[#8e51ff]/20 text-slate-700 hover:bg-[#8e51ff]/10 hover:text-[#8e51ff] transition-colors"
          >
            {preset}
          </button>
        ))}
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Layers3 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No extra section added yet.</p>
          <p className="text-sm">Use presets or create a custom section.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((section, sectionIndex) => (
            <div key={sectionIndex} className="p-4 border border-gray-200 rounded-lg space-y-4">
              <div className="flex items-start gap-3">
                <input
                  value={section.title || ""}
                  onChange={(e) => updateSection(sectionIndex, "title", e.target.value)}
                  type="text"
                  placeholder="Section title e.g. Languages"
                  className="w-full px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 transition-colors mt-2"
                  onClick={() => removeSection(sectionIndex)}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="space-y-3">
                {(section.items || []).map((item, itemIndex) => (
                  <div key={itemIndex} className="grid md:grid-cols-12 gap-2">
                    <input
                      value={item.label || ""}
                      onChange={(e) =>
                        updateItem(sectionIndex, itemIndex, "label", e.target.value)
                      }
                      type="text"
                      placeholder="Title / skill / person"
                      className="md:col-span-4 px-3 py-2 text-sm"
                    />
                    <input
                      value={item.description || ""}
                      onChange={(e) =>
                        updateItem(sectionIndex, itemIndex, "description", e.target.value)
                      }
                      type="text"
                      placeholder="Details"
                      className="md:col-span-5 px-3 py-2 text-sm"
                    />
                    <input
                      value={item.date || ""}
                      onChange={(e) =>
                        updateItem(sectionIndex, itemIndex, "date", e.target.value)
                      }
                      type="text"
                      placeholder="Date/level"
                      className="md:col-span-2 px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      className="md:col-span-1 text-red-500 hover:text-red-700 transition-colors flex justify-end md:justify-center items-center"
                      onClick={() => removeItem(sectionIndex, itemIndex)}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => addItem(sectionIndex)}
                className="text-sm text-[#8e51ff] hover:text-[#7a3df0] transition-colors"
              >
                + Add item
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdditionalSectionsForm;
