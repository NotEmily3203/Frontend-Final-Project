/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import {editStudentThunk, fetchStudentThunk} from '../../store/thunks';

class EditStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: this.props.student.firstname, 
      lastname: this.props.student.lastname, 
      email: this.props.student.email,
      imageUrl: this.props.student.imageUrl,
      gpa: this.props.student.gpa,
      campusId: this.props.student.campusId, 
      redirect: false, 
      redirectId: null
    };
  }

  componentDidMount(){
    this.props.fetchStudent(this.props.match.params.id);
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.
    console.log(this.state.imageUrl);

    //Default Picture
    var originalUrl = "https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg";
    let student = {
        id: this.props.student.id,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email ,
        campusId: this.state.campusId === "" ? null : this.state.campusId,
        imageUrl: this.state.imageUrl === "" ? originalUrl : this.state.imageUrl,
        gpa: this.state.gpa === "" ? null : this.state.gpa
    };
    
    // Edit student in back-end database
    await this.props.editStudent(student);

    // Update state, and trigger redirect to show the updated student
    this.setState({
      firstname: "", 
      lastname: "", 
      email: "",
      imageUrl: "",
      gpa: null,
      campusId: null, 
      redirect: true, 
      redirectId: this.props.student.id
    });
  }

    // Unmount when the component is being removed from the DOM:
    componentWillUnmount(){
        this.setState({redirect: false, redirectId: null});
    } 

  // Render new student input form
  render() {
    // Redirect to original student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
          student = {this.props.student}      
        />
      </div>          
    );
  }
}

const mapState = (state) => {
    return {
      student: state.student,  // Get the State object from Reducer "student"
    };
};

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),    
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);