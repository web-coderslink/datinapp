import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import classes from './exerciselist.module.css'

const Exercise = (props) => {
  console.log(props);
  const t1 = props.exercise.username;
  console.log(t1);
  return (
    <tr>
      <td>{t1}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date}</td>
      <td>
        <Link to={"/edit/" + props.exercise._id}> edit </Link> |  <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
  );
};

export default class Exerciselist extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = {
      exercises: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/exercises/").then((res) => {
      this.setState({
        exercises: res.data,
      });
    });
  }

  deleteExercise(id) {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  exerciseList() {
    return this.state.exercises.map((curr_exe) => {
      return (
        <Exercise
          exercise={curr_exe}
          deleteExercise={this.deleteExercise}
          key={curr_exe._id}
        />
      );
    });
  }

  render() {
    return (
      <section className={classes.card}>
        <div>

        <h2>Logged excercise</h2>
        <div className={classes.table}>
        <table >
          <thead>
            <tr>
              <th>username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
        </div>
       
        

        </div>
        
      </section>
    );
  }
}
