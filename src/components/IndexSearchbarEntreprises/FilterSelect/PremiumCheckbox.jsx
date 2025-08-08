/* eslint-disable react/prop-types */
export default function PremiumCheckbox({ value, onChange }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange?.(e.target.checked)}
        className="h-4 w-4 rounded border-neutral-600 text-emerald-400 focus:ring-emerald-500 bg-neutral-800"
      />
      <span className="text-neutral-200 text-sm">Premium</span>
    </label>
  );
}
