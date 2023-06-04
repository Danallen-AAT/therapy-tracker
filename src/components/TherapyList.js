import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../index.css";

function TherapyList() {
  const [exerciseRows, setExerciseRows] = useState([
    { date: "-", name: "-", description: "-" },
  ]);
  const location = useLocation();
  const { user_id } = location.state;
  const urlBase = "http://192.168.0.38:5000";
  const fetchExercisesEndpoint = "/fetchexercises";
  const addExerciseEndpoint = "/addexercise";
  const headers = { "Content-Type": "application/json" };

  useEffect(() => {
    // fetch exercises
    //then define table rows
    const body = { user_id };
    const config = {
      method: "POST",
      url: fetchExercisesEndpoint,
      baseURL: urlBase,
      headers: headers,
      data: body,
    };

    axios(config).then((response) => {
      console.log("running axios /fetchexercises...");
      const exercises = response.data.exercises;

      if (exercises.length !== 0)
        setExerciseRows(
          exercises.map((m) => {
            return { date: null, name: m[0], description: m[1] };
          })
        );
      else console.log("empty array, did not update");
      console.log(exerciseRows);
    });
  }, []);

  const addExercise = () => {
    //use setExerciseRows here, which is a state variable down below
    const new_exercise_name =
      document.getElementById("new_exercise_name").value;
    const new_exercise_description = document.getElementById(
      "new_exercise_description"
    ).value;

    console.log(user_id);
    const body = {
      user_id,
      name: new_exercise_name,
      description: new_exercise_description,
    };
    const config = {
      method: "POST",
      url: addExerciseEndpoint,
      baseURL: urlBase,
      headers: headers,
      data: body,
    };

    axios(config).then((response) => {
      console.log("running axios /addexercise...");
      const exercises = response.data.exercises;
      console.log(exercises);

      if (exercises.length !== 0)
        setExerciseRows(
          exercises.map((m) => {
            return { date: null, name: m[0], description: m[1] };
          })
        );
      else console.log(response.data.error);
      console.log(exerciseRows);
    });

    // setExerciseRows([
    //   {
    //     date: "6/4/23",
    //     name: "Marsden Ball",
    //     description: "Alternating palm hits.",
    //   },
    // ]);
  };

  return (
    <div>
      <div className="banner-section">
        <h1 className="banner-text" style={{ color: "rgb(189, 183, 183)" }}>
          Therapy List
        </h1>
      </div>

      <div className="middle-section">
        <table className="therapy-list-table">
          <tbody>
            <tr>
              <th className="therapy-list-th">Add new therapy exercise</th>
            </tr>
            <tr>
              <td className="therapy-list-td">
                Name: <input type="text" id="new_exercise_name" />
              </td>
            </tr>
            <tr>
              <td>
                Description: <input type="text" id="new_exercise_description" />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={() => addExercise()}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="middle-section">
        <table className="therapy-list-table">
          <tbody>
            <tr>
              <th className="therapy-list-th">Date</th>
              <th className="therapy-list-th">Name</th>
              <th className="therapy-list-th">Description</th>
            </tr>

            {exerciseRows.map((exercise, index) => (
              <tr key={index}>
                <td className="therapy-list-td">{exercise.date}</td>
                <td className="therapy-list-td">{exercise.name}</td>
                <td className="therapy-list-td">{exercise.description} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TherapyList;
