import AsyncSelect from 'react-select/async';
import './indexsearchbarentreprises.css';

const CountrySelect = ({ selectedCountries, setSelectedCountries, loadOptions }) => {
    return (
      <AsyncSelect
        isMulti
        cacheOptions
        loadOptions={(inputValue) => loadOptions(inputValue, 'country')}
        onChange={setSelectedCountries}
        defaultOptions
        value={selectedCountries}
        classNamePrefix="react-select-container"
        className="react-select-container"
        placeholder="Région"
        noOptionsMessage={() => "Aucune région trouvée"}
        loadingMessage={() => "Chargement ..."}
      />
    );
  };
export default CountrySelect;