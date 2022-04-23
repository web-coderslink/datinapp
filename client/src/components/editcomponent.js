import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-date-picker";
import { createSearchParams, useParams } from "react-router-dom";
import classes from './editcomponent.module.css'
export default class ExerciseEdit extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.cleardata=this.cleardata.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    console.log(this.props);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: null,
      users: [],
      refresh:0
    
    };
  }

  componentDidMount() {
    const location = window.location.href.split("/");

    axios
      .get("http://localhost:5000/exercises/" + location[location.length - 1])
      .then((res) => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: res.data.date,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get("http://localhost:5000/users/").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
        });
      }
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  
   cleardata(){
     console.log("inside");
    this.setState({
      refresh:1
    })
   }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    console.log(date);
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(exercise);
    const location = window.location.href.split("/");
    axios
      .post(
        "http://localhost:5000/exercises/update/" + location[location.length -1],
        exercise
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div className={classes.Card}>
        <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className={classes.form_group}>
            <label>username</label>
            <select
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {/* connectinf mongodb data */}
              {this.state.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={classes.form_group}>
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className={classes.form_group}>
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>

          <div className={classes.form_group}>
            <label>Date: </label>
            <div style={{background:'white',WebkitAppearance:'none'}} >
              <DatePicker clearIcon='refresh' calendarIcon={null}
                 
                value={this.state.refresh === 0 ? this.state.date : null}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className={classes.form_group}>
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
        </div>
       
      </div>
    );
  }
}
