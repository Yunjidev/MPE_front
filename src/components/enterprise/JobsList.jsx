import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MdWorkOutline } from "react-icons/md";

const JobsList = ({ selectedJob, onSelectJob }) => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();

        const sortedJobs = data
          .filter((job) => job && job.name)
          .sort((a, b) => a.name.localeCompare(b.name));

        setJobs(sortedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Impossible de charger les métiers.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="relative flex items-center">
      <MdWorkOutline className="absolute left-3 text-gray-400" />
      <select
        id="job"
        value={selectedJob}
        onChange={(e) => onSelectJob(e.target.value)}
        className="w-full pl-10 pr-3 py-2 rounded-xl bg-neutral-800 text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="">Sélectionner un métier</option>
        {jobs.map((job) => (
          <option key={job.id} value={job.id}>
            {job.name}
          </option>
        ))}
      </select>
    </div>
  );
};

JobsList.propTypes = {
  selectedJob: PropTypes.string.isRequired,
  onSelectJob: PropTypes.func.isRequired,
};

export default JobsList;
