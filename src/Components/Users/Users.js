import { useEffect, useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { createItem, deleteItem, updateServerItem } from "../../api/crud";
import { getItems } from "../../api/crud";
import UsersList from "./UsersList";
import EditableUser from "./EditableUser";
import NewUser from "./NewUser";
import ErrorMessages from "../ErrorMessages";

export default function Users() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(async () => {
    const response = await getItems("user");
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error fetching users"]);
    } else {
      setUsers(response.data.filter((user) => !user.fake));
    }
  }, []);

  async function handleCreateFormSubmit(user) {
    const response = await createItem(user, "user");
    if (response.status >= 400) {
      console.log("error fetching user");
    } else {
      if (registerNewUser) {
        let userId = new String(response.data.id);
        localStorage.setItem("userId", userId);
        setMe(JSON.stringify(response.data));
        localStorage.setItem("user", JSON.stringify(response.data));
        history.push(`/dashboard/`);
      } else {
        history.push(`/users/`);
      }
    }
  }
  async function handleDeleteClick(userId) {
    const response = await deleteItem(userId, "user");
    if (response.status >= 404) {
      setErrors((errors) => [...errors, "Error fetching users"]);
    } else {
      let newUsers = users.filter((user) => user.id != userId);
      setUsers(newUsers);
      history.push("/users");
    }
  }

  async function handleEditFormSubmit(newUser) {
    const response = await updateServerItem(newUser, "user");
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error updating user"]);
    } else {
      let newUsers = users.map((user) => {
        if (user.id != newUser.id) {
          return user;
        } else {
          return response.data;
        }
      });
      setUsers(newUsers);
      history.push(`/users/${response.data.id}`);
      history.go();
    }
  }

  return (
    <div id="users">
      <h2>
        <Link to="/users">Users</Link>
      </h2>
      <ErrorMessages errors={errors} />
      <hr />
      <Switch>
        <Route
          path="/users/new"
          render={(props) => (
            <NewUser {...props} onFormSubmit={handleCreateFormSubmit} />
          )}
        />
        <Route
          path={`/users/:userId`}
          render={(props) => (
            <EditableUser
              {...props}
              onDeleteClick={handleDeleteClick}
              onFormSubmit={handleEditFormSubmit}
            />
          )}
        />
        <Route
          path={"/users/"}
          render={(props) => <UsersList {...props} users={users} />}
        />
      </Switch>
    </div>
  );
}
