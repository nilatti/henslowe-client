import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  createItem,
  deleteItem,
  getItems,
  updateServerItem,
} from "../../api/crud.js";
import { useMeState } from "../../lib/meState.js";
import { useMountedState } from "../../lib/mountedState.js";
import UsersList from "./UsersList.js";
import EditableUser from "./EditableUser.js";
import NewUser from "./NewUser.js";
import ErrorMessages from "../ErrorMessages.js";

export default function Users() {
  const navigation = useNavigate();
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);
  const isMounted = useMountedState();
  const { me } = useMeState();

  useEffect(async () => {
    const response = await getItems("user");
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error fetching users"]);
    } else {
      if (isMounted()) {
        setUsers(response.data.filter((user) => !user.fake));
      }
    }
  }, []);

  function closeForm() {
    navigate("/");
  }

  async function handleCreateFormSubmit(user) {
    if (me && me.email) {
      handleEditFormSubmit(user);
    } else {
      const response = await createItem(user, "user");
      if (response.status >= 400) {
        console.log("error fetching user");
      } else {
        if (registerNewUser) {
          let userId = new String(response.data.id);
          localStorage.setItem("userId", userId);
          setMe(JSON.stringify(response.data));
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate(`/dashboard/`);
        } else {
          navigate(`/users/`);
        }
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
      navigate("/users");
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
      navigate(`/users/${response.data.id}`);
    }
  }

  return (
    <div id="users">
      <h2>
        <Link to="/users">Users</Link>
      </h2>
      <ErrorMessages errors={errors} />
      <hr />
      <Routes>
        <Route
          path="/users/new"
          children={(props) => (
            <NewUser
              {...props}
              onFormSubmit={handleCreateFormSubmit}
              onFormClose={closeForm}
            />
          )}
        />
        <Route
          path={`/users/:userId`}
          children={(props) => (
            <EditableUser
              {...props}
              onDeleteClick={handleDeleteClick}
              onFormSubmit={handleEditFormSubmit}
            />
          )}
        />
        <Route
          path={"/users/"}
          children={(props) => <UsersList {...props} users={users} />}
        />
      </Routes>
    </div>
  );
}
