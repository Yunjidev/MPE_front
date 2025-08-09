/* eslint-disable react/prop-types */
import { useId, useState, useMemo } from "react";
import { IoIosArrowDown } from "react-icons/io";

/**
 * DropdownMenu
 * - Couleurs alignées sur la FAQ (violet/orange)
 * - Accessibilité (ARIA, clavier)
 * - Animations smooth (rotation chevron, collapse)
 * - Tailwind only
 */
export default function DropdownMenu({
  category,
  items = [],
  defaultOpen = false,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(!!defaultOpen);
  const baseId = useId();

  const contentId = useMemo(
    () => `${baseId}-dropdown-content`,
    [baseId]
  );

  const toggle = () => setIsOpen((v) => !v);

  const onKeyDownHeader = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
    // flèches haut/bas => ouvrir
    if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div className={`my-4 ${className}`}>
      {/* Header / bouton */}
      <button
        type="button"
        onClick={toggle}
        onKeyDown={onKeyDownHeader}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className={`
          group w-full flex items-center justify-between
          rounded-xl px-4 sm:px-5 py-3
          border transition-all
          bg-orange-100/10
          border-transparent
          hover:border-violet-400/40
          focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60
          shadow-sm hover:shadow-violet-400/30
        `}
      >
        <span className="text-lg sm:text-xl font-semibold text-neutral-100">
          {category}
        </span>
        <span
          className={`
            inline-flex items-center justify-center
            h-9 w-9 rounded-lg transition-all
            text-violet-300
            group-hover:bg-violet-400/10
          `}
          aria-hidden="true"
        >
          <IoIosArrowDown
            className={`h-5 w-5 transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </span>
      </button>

      {/* Contenu (collapse animé) */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={contentId}
        className={`
          overflow-hidden transition-[grid-template-rows] duration-300
          grid ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
        `}
      >
        <div className="min-h-0">
          <div className="mt-3 space-y-3">
            {items.map((item, idx) => (
              <article
                key={`${item?.question || "item"}-${idx}`}
                className={`
                  rounded-xl border border-violet-400/20
                  bg-neutral-900/80
                  shadow-sm shadow-violet-400/20
                  px-4 py-3
                `}
              >
                {item?.question && (
                  <h3 className="font-semibold text-neutral-100">
                    {item.question}
                  </h3>
                )}
                {item?.answer && (
                  <p className="mt-1 text-sm text-neutral-300 leading-relaxed">
                    {item.answer}
                  </p>
                )}
              </article>
            ))}
            {(!items || items.length === 0) && (
              <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
                <p className="text-sm text-neutral-400">
                  Aucune entrée disponible.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
