import { Check, Palette } from "lucide-react";
import React, { useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customColor, setCustomColor] = useState(selectedColor || "#8e51ff");

  const colors = [
    { name: "Brand", value: "#8e51ff" },
    { name: "Blue", value: "#2563eb" },
    { name: "Teal", value: "#0f766e" },
    { name: "Green", value: "#16a34a" },
    { name: "Red", value: "#dc2626" },
    { name: "Orange", value: "#ea580c" },
    { name: "Pink", value: "#db2777" },
    { name: "Indigo", value: "#4f46e5" },
    { name: "Slate", value: "#334155" },
    { name: "Black", value: "#111827" },
  ];

  const isValidHex = (value) => /^#[0-9A-F]{6}$/i.test(value);

  const updateCustomColor = (value) => {
    const nextColor = value.startsWith("#") ? value : `#${value}`;
    setCustomColor(nextColor);

    if (isValidHex(nextColor)) {
      onChange(nextColor);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-[#8e51ff] bg-[#8e51ff]/10 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} /> <span className="max-sm:hidden">Accent</span>
      </button>
      {isOpen && (
        <div className="w-72 absolute top-full left-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          <div className="grid grid-cols-5 gap-2">
          {colors.map((color) => (
            <div
              key={color.value}
              className="relative cursor-pointer group flex flex-col"
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
            >
              <div
                className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors"
                style={{ backgroundColor: color.value }}
              ></div>
              {selectedColor === color.value && (
                <div className="absolute top-0 left-0 right-0 bottom-4 flex items-center justify-center">
                  <Check className="size-5 text-white" />
                </div>
              )}
              <p className="text-xs text-center mt-1 text-gray-600">
                {color.name}
              </p>
            </div>
          ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-600 mb-2">
              Custom brand color
            </p>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={isValidHex(customColor) ? customColor : "#8e51ff"}
                onChange={(e) => updateCustomColor(e.target.value)}
                className="size-10 p-1 rounded-lg border border-gray-300"
              />
              <input
                value={customColor}
                onChange={(e) => updateCustomColor(e.target.value)}
                placeholder="#8e51ff"
                maxLength={7}
                className="w-full px-3 py-2 text-sm"
              />
            </div>
            {!isValidHex(customColor) && (
              <p className="text-xs text-red-500 mt-1">
                Enter a valid 6 digit hex color.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
