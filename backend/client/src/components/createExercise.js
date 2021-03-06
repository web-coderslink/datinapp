import React, { Component } from "react";
//import React, { Component } from 'react';
import "react-date-picker/dist/DatePicker.css";
import DatePicker from "react-date-picker";
import classes from './createExercise.module.css';
import { axiosInstance } from "../config";

export default class ExerciseCreate extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: null,
      users: [],
    };
  }

  componentDidMount() {
    axiosInstance.get("/users/").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
          username: res.data[0].username,
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

    axiosInstance
      .post("/add", exercise)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <section className={classes.Card}>
        <div>
        <h3>Create New Exercise Log</h3>
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
            <div style={{background:"white",border:"none"}}>
              <DatePicker 
                
                value={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className={classes.form_group}>
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
        </div>
      
      </section>
    );
  }
}
