import { HiSearch } from "react-icons/hi";
import PropTypes from 'prop-types';


const IndexSearchbarEntreprises = ({ jobs, countries, cities }) => {
  console.log(jobs);
  console.log(countries);
  console.log(cities);
  //  // Vérifiez si les props sont définies avant de les utiliser
  //  if (!jobs || !countries || !cities) {
  //   return <div>Chargement...</div>;
  // }

return (
<div className="join pt-8 pb-10 rounded-full flex items-center justify-center">
  
  <select className="select select-bordered join-item w-48 rounded-full">
    <option disabled selected>Métiers</option>
    {jobs.map(job => (
      <option key={job.id} value={job.name}>{job.name}</option>
    ))}
  </select>
  <select className="select select-bordered join-item w-48">
    <option disabled selected>Région</option>
    {countries.map(country => (
      <option key={country.id} value={country.name}>{country.name}</option>
    ))}
</select>
  <select className="select select-bordered join-item w-48">
    <option disabled selected>Ville</option>
    {cities.map(city => (
      <option key={city} value={city}>{city}</option>
    ))}
  </select>
  <select className="select select-bordered join-item">
    <option disabled selected>Premium</option>    
  </select>
  <select className="select select-bordered join-item">
    <option disabled selected>Prix</option>
    <option>Moins cher</option>
    <option>Plus cher</option>
    
  </select>
  <div className="indicator">
    
    <button className="btn join-item"><HiSearch /></button>
  </div>
</div>
);
};



export default IndexSearchbarEntreprises;