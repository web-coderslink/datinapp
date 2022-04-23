import React, { Component } from "react";
import classes from './createUser.module.css'
import { axiosInstance } from "../config";
export default class UserCreate extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    console.log(user);

    axiosInstance
      .post("/add", user)
      .then((res) => console.log(res.data));
    // to upload in database
    this.setState({ username: "" });
  }

  render() {
    return (
      <div className={classes.Cards}>
        <div>
        <h3>Create user</h3>
          <form onSubmit={this.onSubmit}>
            <div className={classes.form_groups}>
              <label>username: </label>
              <input
                type="text"
                required
                className={classes.formcontrol}
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </div>

            <div className={classes.form_groups}>
              <input
                type="submit"
                value="Create user"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
       
        
      </div>
    );
  }
}
