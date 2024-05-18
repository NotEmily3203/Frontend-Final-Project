/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import {editCampusThunk, fetchCampusThunk} from '../../store/thunks';

class EditCampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      name: this.props.name, 
      address: this.props.address, 
      description: this.props.description,
      imageUrl: this.props.imageUrl,
      redirect: false, 
      redirectId: null
    };
  }

  componentDidMount(){
    this.props.fetchCampus(this.props.match.params.id);
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

    //Default Picture
    var originalUrl = "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZSUyMGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D";

    let campus = {
        id: this.props.campus.id,
        name: this.state.name,
        description: this.state.description,
        address: this.state.address,
        imageUrl: this.state.imageUrl === "" ? originalUrl : this.state.imageUrl,
    };
    
    // Edit student in back-end database
    await this.props.editCampus(campus);

    // Update state, and trigger redirect to show the updated student
    this.setState({
      name: "", 
      address: "", 
      description: "",
      imageUrl: "",
      redirect: true, 
      redirectId: this.props.campus.id
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
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
          campus = {this.props.campus}      
        />
      </div>          
    );
  }
}

const mapState = (state) => {
    return {
      campus: state.campus,  // Get the State object from Reducer "campus"
    };
};

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),    
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);