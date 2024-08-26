import AsyncSelect from 'react-select/async';



const JobSelect = ({ selectedJobs, setSelectedJobs, loadOptions }) => {

  // Ajout d'une fonction de transformation pour les options sélectionnées
  const handleChange = (selectedOptions) => {
    // Transforme les options sélectionnées en un format approprié avant de mettre à jour l'état
    const transformedSelectedJobs = selectedOptions.map(option => ({
      label: option.label,
      value: option.value || option.label // Utilisez label comme valeur de repli si value n'est pas défini
    }));
    setSelectedJobs(transformedSelectedJobs);
  };

    return (
      <AsyncSelect
        
        isMulti
        cacheOptions
        loadOptions={(inputValue) => loadOptions(inputValue, 'job')}
        onChange={handleChange}
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