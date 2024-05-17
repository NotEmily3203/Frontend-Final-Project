/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import './CampusView.css'
// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteStudent} = props;
  function placeholder(){
    console.log("replace with appropriate function");
  }
  // Render a single Campus view with list of its students
  return (
    <div>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="campus-single">
        <div className="campus-img">
        <img src={campus.imageUrl}/>
      </div>
        <div className="campus-details">
          <h1>{campus.name}</h1>
          <h3>Campus ID: {campus.id}</h3>
          <p>Address: {campus.address}</p>
          <p>Description: {campus.description}</p>
          
          <br/>
          <div>
            <Link to={`/edit-campus/${campus.id}`}>
              <button>Edit</button>
            </Link>
          </div>
        </div>
      </div>
      <h1>List of Students</h1>
      <Link to={`/newstudent`}>
      <button>Add Student</button>
      </Link>
      { (!campus.students.length) ?
        <div><p>There are no students enrolled in this campus :C</p><br></br></div>
        :
        campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id} className="students">
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>   
                      
            <button onClick={() => deleteStudent(student.id,campus.id)}>Delete Student</button>
          </div>
        );
      })}

      
    </div>
  );
};

export default CampusView;