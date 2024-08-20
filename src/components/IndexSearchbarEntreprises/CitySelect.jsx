import AsyncSelect from 'react-select/async';
import './indexsearchbarentreprises.css';

 const CitySelect = ({ selectedCities, setSelectedCities, loadOptions }) => {
    return (
      <AsyncSelect
        isMulti
        cacheOptions
        loadOptions={(inputValue) => loadOptions(inputValue, 'city')}
        onChange={setSelectedCities}
        defaultOptions
        value={selectedCities}
        classNamePrefix="react-select-container"
        className="react-select-container"
        placeholder="Ville"
        noOptionsMessage={() => "Aucune ville trouvée"}
        loadingMessage={() => "Chargement ..."}
      />
    );
  };
export default CitySelect;
