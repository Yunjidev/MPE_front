import './indexsearchbarentreprises.css';

const PremiumCheckbox = () => {
    return (
      <div className="checkbox-container">
        <label className="checkbox-label">
          Premium
          <input type="checkbox" defaultChecked className="checkbox" />
          <span className="checkmark"></span>
        </label>
      </div>
    );
  };

export default PremiumCheckbox;