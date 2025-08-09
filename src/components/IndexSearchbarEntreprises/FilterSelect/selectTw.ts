// Tailwind-only styles for react-select (use with `unstyled` + `classNames`)
export const selectClassNames = {
  control: ({ isFocused }) =>
    [
      "min-h-10 rounded-xl border transition-all duration-150",
      "bg-neutral-900/70 text-neutral-100",
      isFocused
        ? "border-orange-400/60 ring-1 ring-orange-400/40 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
        : "border-neutral-800 hover:border-neutral-700",
    ].join(" "),
  valueContainer: () => "px-2 gap-1",
  multiValue: () =>
    "bg-neutral-800/80 border border-neutral-700 rounded-md flex items-center",
  multiValueLabel: () => "text-neutral-100 px-2 py-0.5",
  multiValueRemove: () =>
    "hover:bg-neutral-700 hover:text-white rounded-md ml-1 px-1",
  input: () => "text-neutral-100",
  placeholder: () => "text-neutral-400",
  indicatorsContainer: () => "text-neutral-300",
  dropdownIndicator: ({ isFocused }) =>
    (isFocused ? "text-orange-300" : "text-neutral-400") + " px-2",
  clearIndicator: () => "text-neutral-400 hover:text-neutral-200 px-2",
  menu: () =>
    "mt-2 bg-neutral-950/95 border border-neutral-800 rounded-xl overflow-hidden shadow-xl shadow-black/40 backdrop-blur",
  menuList: () => "max-h-60 overflow-auto",
  option: ({ isFocused, isSelected }) =>
    [
      "px-3 py-2 cursor-pointer text-sm",
      isSelected
        ? "bg-orange-600/30 text-orange-100"
        : isFocused
        ? "bg-neutral-800 text-neutral-100"
        : "text-neutral-200",
    ].join(" "),
  noOptionsMessage: () => "px-3 py-2 text-neutral-400",
};
