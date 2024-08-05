
const IndexSearchbarEntreprises = () => {

return (
<div className="join">
  <div>
    <div>
      <input className="input input-bordered join-item" placeholder="Search" />
    </div>
  </div>
  <select className="select select-bordered join-item">
    <option disabled selected>Filter</option>
    <option>Sci-fi</option>
    <option>Drama</option>
    <option>Action</option>
  </select>
  <div className="indicator">
    <span className="indicator-item badge badge-secondary">new</span>
    <button className="btn join-item">Search</button>
  </div>
</div>
);
};

export default IndexSearchbarEntreprises;