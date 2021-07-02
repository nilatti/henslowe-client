import { useEffect, useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { createItem, deleteItem, updateServerItem } from "../../api/crud";
import { getTheaterNames } from "../../api/theaters";
import TheatersList from "./TheatersList";
import EditableTheater from "./EditableTheater";
import NewTheater from "./NewTheater";
import ErrorMessages from "../ErrorMessages";

export default function Theaters() {
  const history = useHistory();
  const [theaters, setTheaters] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(async () => {
    const response = await getTheaterNames();
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error fetching theaters"]);
    } else {
      setTheaters(response.data);
    }
  }, []);

  async function handleCreateFormSubmit(newTheater) {
    const response = await createItem(newTheater, "theater");
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error fetching theaters"]);
    } else {
      let newTheaters = (theaters) => [...theaters, newTheater];
      setTheaters(newTheaters);
      history.push(`/theaters/${response.data.id}`);
    }
  }

  async function handleDeleteClick(theaterId) {
    const response = await deleteItem(theaterId, "theater");
    if (response.status >= 404) {
      setErrors((errors) => [...errors, "Error fetching theaters"]);
    } else {
      let newTheaters = theaters.filter((theater) => theater.id != theaterId);
      setTheaters(newTheaters);
      history.push("/theaters");
    }
  }

  async function handleEditFormSubmit(newTheater) {
    const response = await updateServerItem(newTheater, "theater");
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error updating theater"]);
    } else {
      let newTheaters = theaters.map((theater) => {
        if (theater.id != newTheater.id) {
          return theater;
        } else {
          return response.data;
        }
      });
      setTheaters(newTheaters);
      history.push(`/theaters/${response.data.id}`);
      history.go();
    }
  }

  return (
    <div id="theaters">
      <h2>
        <Link to="/theaters">Theaters</Link>
      </h2>
      <ErrorMessages errors={errors} />
      <hr />
      <Switch>
        <Route
          path="/theaters/new"
          render={(props) => (
            <NewTheater {...props} onFormSubmit={handleCreateFormSubmit} />
          )}
        />
        <Route
          path={`/theaters/:theaterId`}
          render={(props) => (
            <EditableTheater
              {...props}
              onDeleteClick={handleDeleteClick}
              onFormSubmit={handleEditFormSubmit}
            />
          )}
        />
        <Route
          path={"/theaters/"}
          render={(props) => <TheatersList {...props} theaters={theaters} />}
        />
      </Switch>
    </div>
  );
}
