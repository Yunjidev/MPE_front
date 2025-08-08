/* eslint-disable react/prop-types */
import AsyncSelect from "react-select/async";
import Rating from "react-rating-stars-component";
import { selectClassNames } from "./selectTw";
import { getData } from "../../../services/data-fetch";

const RatingSelect = ({ selectedRatings, setSelectedRatings }) => {
  const loadOptions = async (inputValue) => {
    const response = await getData("enterprises/validate");
    const q = (inputValue || "").toString();
    return response
      .filter(
        (item) =>
          item.averageRating && item.averageRating.toString().startsWith(q)
      )
      .map((item) => ({ label: item.averageRating, value: item.averageRating }))
      .sort((a, b) => b.value - a.value);
  };

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      value={selectedRatings}
      onChange={setSelectedRatings}
      placeholder="Notes"
      noOptionsMessage={() => "Pas de notes disponibles"}
      loadingMessage={() => "Chargement ..."}
      classNames={selectClassNames}
      formatOptionLabel={(opt) => (
        <div className="flex items-center gap-2">
          <Rating count={5} value={Number(opt.value)} size={18} isHalf edit={false} activeColor="#ffd700" />
          <span className="text-neutral-200 text-sm">{Number(opt.value).toFixed(1)}</span>
        </div>
      )}
      unstyled
    />
  );
};

export default RatingSelect;
