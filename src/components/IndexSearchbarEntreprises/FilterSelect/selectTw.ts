// components/IndexSearchbarEntreprises/FilterSelect/selectTw.ts (ou .js)
export const selectClassNames = {
  control: ({ isFocused }) =>
    [
      "min-h-10 rounded-lg border",
      "bg-neutral-800 text-neutral-100",
      isFocused ? "border-neutral-500 ring-1 ring-neutral-500" : "border-neutral-700",
    ].join(" "),
  valueContainer: () => "px-2 gap-1",
  multiValue: () => "bg-neutral-700 rounded-md",
  multiValueLabel: () => "text-neutral-100 px-2",
  multiValueRemove: () =>
    "hover:bg-neutral-600 hover:text-white rounded-md ml-1",
  input: () => "text-neutral-100",
  placeholder: () => "text-neutral-400",
  indicatorsContainer: () => "text-neutral-300",
  dropdownIndicator: ({ isFocused }) => (isFocused ? "text-neutral-100" : "text-neutral-400"),
  clearIndicator: () => "text-neutral-400 hover:text-neutral-200",
  menu: () =>
    "mt-1 bg-neutral-900 border border-neutral-700 rounded-md overflow-hidden",
  menuList: () => "max-h-60 overflow-auto",
  option: ({ isFocused, isSelected }) =>
    [
      "px-3 py-2 cursor-pointer",
      isSelected ? "bg-neutral-700 text-white" : isFocused ? "bg-orange-400" : "text-neutral-100",
    ].join(" "),
  noOptionsMessage: () => "px-3 py-2 text-neutral-400",
};
