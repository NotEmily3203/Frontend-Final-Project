/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view 
  return (
    <div>
      <br/>
      <br/>
      <br/>
      <br/>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <img src={student.imageUrl}/>
      { (student.campus) ?
        <Link to={`/campus/${student.campus.id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <h3>Campus: {student.campus.name}</h3>
        </Link>
        :
        <h3>Campus: N/A</h3>
      }
      <p>Email: {student.email}</p>
      <p>GPA: {student.gpa}</p>
      <div>
        <Link to={`/edit-student/${student.id}`}>
          <button>Edit</button>
        </Link>
      </div>

    </div>
  );

};

export default StudentView;