import AsyncSelect from 'react-select/async';
import Rating from 'react-rating-stars-component';

// Fonction pour afficher les étoiles de notation
export const renderRatingStars = (ratingValue) => {
  return (
    <Rating
      count={5}
      value={ratingValue}
      size={24}
      activeColor="#ffd700"
      isHalf={true}
      edit={false}
    />
  );
};


const RatingSelect = ({ selectedRatings, setSelectedRatings, loadOptions }) => {

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      loadOptions={(inputValue) => loadOptions(inputValue, 'averageRating')}
      onChange={setSelectedRatings}
      defaultOptions
      value={selectedRatings}
      classNamePrefix="react-select-container"
      className="react-select-container"
      placeholder="Notes"
      noOptionsMessage={() => "Pas de notes disponibles"}
      loadingMessage={() => "Chargement ..."}
      formatOptionLabel={(option) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {renderRatingStars(option.value)}
        </div>
      )}
    />
  );
};
export default RatingSelect;