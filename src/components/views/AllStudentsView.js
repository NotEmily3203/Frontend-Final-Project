/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Link } from "react-router-dom";
import "./AllStudentsView.css"
const AllStudentsView = (props) => {
  const {students, deleteStudent} = props;
  // If there is no student, display a message
  if (!students.length) {
    return (
    <div>
      <br/>
      <br/>
      <br/>
      <br/>
      <h1>All Students</h1>
      <p>There are no students.</p>
      <Link to={`newstudent`}>
        <button>Add New Student</button>
      </Link>
    </div>
    );
  }
  
  // If there is at least one student, render All Students view 
  return (
    <div >
      <br/>
      <br/>
      <br/>
      <br/>
      <h1>All Students</h1>
      <div className="student-list">
      {students.map((student) => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id} className="each-student">
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>
              <img src={student.imageUrl}/>
              <p>Email: {student.email}</p>
              <p>GPA: {student.gpa}</p>
              <button onClick={() => deleteStudent(student.id)}>Delete</button>
            </div>
          );
        }
      )}
      </div>
      <br/>
      <div className="add-student">
        <h4>Can't Find a Student?</h4>
        <Link to={`/newstudent`}>
          <button>Add New Student</button>
        </Link>
      </div>
      <br/><br/>
    </div>
  );
};


export default AllStudentsView;