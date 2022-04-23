import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import ExerciseCreate from "./components/createExercise";
import UserCreate from "./components/createUser";
import Exerciselist from "./components/exerciselist";
import ExerciseEdit from "./components/editcomponent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route path="/" exact>
            <Exerciselist />
          </Route>

          <Route path="/edit/:id">
            <ExerciseEdit />
          </Route>

          <Route path="/create">
            <ExerciseCreate />
          </Route>

          <Route path="/user">
            <UserCreate />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
