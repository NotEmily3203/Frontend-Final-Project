/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './AllCampusesView.css';
const AllCampusesView = (props) => {
  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return <div>There are no campuses.</div>;
  }
  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>
      <div className="campus-list">
        {props.allCampuses.map((campus) => (
          <div key={campus.id} className="each-campus">
            <div className="campus-header">
            <Link to={`/campus/${campus.id}`}>
              <h2>{campus.name}</h2>
            </Link>
            <h4>campus id: {campus.id}</h4>
            </div>
            
            <img src={campus.imageUrl}/>
            <p>Address: {campus.address}</p>
            <p>{campus.description}</p>
            
          </div>
        ))}
      </div>
      <div className="add-campus">
        <h4>Can't Find Your Campus?</h4>
        <Link to={`/newcampus`}>
          <button>Add New Campus</button>
        </Link>
      </div>
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;