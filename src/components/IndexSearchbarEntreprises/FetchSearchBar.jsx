import React, { useState, useEffect } from 'react';
import IndexSearchbarEntreprises from './IndexSearchbarEntreprises';
import { getData } from '../../services/data-fetch';

const FetchSearchBar = () => {
  const [jobs, setJobs] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsData = await getData('/jobs');
        console.log(jobsData);
        const countriesData = await getData('/countries');
        console.log(countriesData);
        const citiesData = await getData('/enterprises/cities');
        console.log(citiesData);
        
        setJobs(jobsData);
        setCountries(countriesData);
        // Supposons que citiesData est un tableau d'objets entreprise et que vous voulez extraire les villes
        const uniqueCities = Array.from(new Set(citiesData.map(enterprise => enterprise.city)));
        setCities(uniqueCities);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>;
  }
console.log(jobs);
console.log(countries);
console.log(cities);
  return (
    <IndexSearchbarEntreprises jobs={jobs} countries={countries} cities={cities} />
  );
};

export default FetchSearchBar;
