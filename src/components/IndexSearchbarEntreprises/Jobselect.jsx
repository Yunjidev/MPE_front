import AsyncSelect from 'react-select/async';
import './indexsearchbarentreprises.css';

const JobSelect = ({ selectedJobs, setSelectedJobs, loadOptions }) => {
    return (
      <AsyncSelect
        isMulti
        cacheOptions
        loadOptions={(inputValue) => loadOptions(inputValue, 'job')}
        onChange={(selectedOptions) => setSelectedJobs(selectedOptions.map(option => ({ label: option.label })))}
        defaultOptions
        value={selectedJobs}
        classNamePrefix="react-select-container"
        className="react-select-container first-select"
        placeholder="Métiers"
        noOptionsMessage={() => "Aucun métier trouvé"}
        loadingMessage={() => "Chargement ..."}
      />
    );
  };
export default JobSelect;