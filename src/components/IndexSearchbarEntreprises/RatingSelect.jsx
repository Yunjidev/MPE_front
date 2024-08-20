import AsyncSelect from 'react-select/async';
import './indexsearchbarentreprises.css';

const RatingSelect = ({ selectedRatings, setSelectedRatings, loadOptions, renderRatingStars }) => {
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
            <span style={{ marginLeft: '10px' }}>{option.label}</span>
          </div>
        )}
      />
    );
  };
export default RatingSelect;