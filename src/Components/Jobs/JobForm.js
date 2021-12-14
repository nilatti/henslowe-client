import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Form, FormGroup } from "../Form";
import { Typeahead } from "react-bootstrap-typeahead";
import { Spinner } from "../Loaders";
import Modal from "../Modal";
import { createItem, getItems } from "../../api/crud";

import { getProductionsForTheater } from "../../api/productions";

import { getTheaterNames } from "../../api/theaters";

import { useForm } from "../../hooks/environmentUtils";
import { useMeState } from "../../lib/meState";

import { buildUserName } from "../../utils/actorUtils";
import { StartEndDatePair } from "../../utils/formUtils";

import NewUserModal from "../Users/NewUserModal";
export default function JobForm({
  includeProduction = true,
  job,
  onFormClose,
  onFormSubmit,
  production,
  specialization,
  theater,
  user,
}) {
  const { inputs, handleChange } = useForm({
    end_date: job?.end_date || production?.end_date || new Date(),
    production: job?.production || production || null,
    specialization: job?.specialization || specialization || null,
    start_date: job?.start_date || production?.start_date || new Date(),
    theater: job?.theater || production?.theater || theater || null,
    user: job?.user || user || null,
  });
  const { me } = useMeState();
  const [clearNewUser, setClearNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productions, setProductions] = useState([]);
  const [selectedProduction, setSelectedProduction] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [specializations, setSpecializations] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    setLoading(true);
    if (!production) {
      let response;
      if (theater) {
        response = await getProductionsForTheater(theater.id);
      } else {
        response = await getItems("production");
      }
      if (response.status >= 400) {
        console.log("Error fetching productions");
      } else {
        var tempProductions = response.data.map((production) => ({
          id: production.id,
          label: String(production.play.title),
        }));
        setProductions(tempProductions);
      }
    } else {
      setSelectedProduction([
        {
          id: production.id,
          label: production.play.title,
        },
      ]);
      setSelectedTheater([
        {
          id: production.theater.id,
          label: production.theater.name,
        },
      ]);
    }
    if (!specialization) {
      const response = await getItems("specialization");
      if (response.status >= 400) {
        console.log("Error fetching specializations");
      } else {
        var tempSpecializations = response.data.map((specialization) => ({
          id: specialization.id,
          label: String(specialization.title),
        }));
        setSpecializations(tempSpecializations);
      }
    } else {
      setSelectedSpecialization([
        {
          id: specialization.id,
          label: specialization.title,
        },
      ]);
    }
    if (!theater) {
      const response = await getTheaterNames("theater");
      if (response.status >= 400) {
        console.log("Error fetching theaters");
      } else {
        var tempTheaters = response.data.map((theater) => ({
          id: theater.id,
          label: String(theater.name),
        }));
        setTheaters(tempTheaters);
      }
    } else {
      setSelectedTheater([
        {
          id: theater.id,
          label: theater.name,
        },
      ]);
    }
    if (!user) {
      console.log(me.subscription_status);
      const response = await getItems("user");
      if (response.status >= 400) {
        console.log("Error fetching users");
      } else {
        let tempUsers = [];
        if (me.subscription_status == "active") {
          tempUsers = response.data.map((user) => ({
            id: user.id,
            label: String(buildUserName(user)),
          }));
        } else {
          let fakeUsers = response.data.filter((user) => user.fake);
          tempUsers = fakeUsers.map((user) => ({
            id: user.id,
            label: String(buildUserName(user)),
          }));
        }

        setUsers(tempUsers);
      }
    } else {
      setSelectedUser([
        {
          id: user.id,
          label: buildUserName(user),
        },
      ]);
    }
    setLoading(false);
  }, []);

  async function handleUserFormSubmit(user) {
    setShowNewUserModal(false);
    setClearNewUser(true);
    const response = await createItem(user, "user");
    if (response.status >= 400) {
      console.log("Error creating user");
    } else {
      let newUsers = [
        ...users,
        { id: response.data.id, label: buildUserName(response.data) },
      ];
      setUsers(newUsers);
      setSelectedUser([
        { id: response.data.id, label: buildUserName(response.data) },
      ]);
    }
  }

  function processSubmit(e) {
    e.preventDefault();
    onFormClose();
    onFormSubmit({
      end_date: inputs.end_date,
      production_id: selectedProduction[0] ? selectedProduction[0].id : "",
      start_date: inputs.start_date,
      specialization_id: selectedSpecialization[0]
        ? selectedSpecialization[0].id
        : "",
      theater_id: selectedTheater[0] ? selectedTheater[0].id : "",
      user_id: selectedUser[0] ? selectedUser[0].id : "",
      id: job ? job.id : "",
    });
  }
  function openNewUserModal(e) {
    e.preventDefault();
    setClearNewUser(false);
    setShowNewUserModal(true);
  }
  function closeNewUserModal(e) {
    e.preventDefault();
    setClearNewUser(true);
    setShowNewUserModal(false);
  }

  if (loading) {
    return (
      <Modal>
        <h1>Loading production</h1>
        <Spinner />
      </Modal>
    );
  }

  return (
    <>
      <NewUserModal
        clearNewUser={clearNewUser}
        handleClose={closeNewUserModal}
        onFormSubmit={handleUserFormSubmit}
        show={showNewUserModal}
      />
      <Form noValidate onSubmit={(e) => processSubmit(e)} width="85%">
        <FormGroup>
          <label>User</label>
          <Button
            display="block"
            backgroundColor="var(--color-text-light)"
            colorProp="var(--color-dark)"
            onClick={(e) => openNewUserModal(e)}
          >
            Add New User
          </Button>

          <Typeahead
            disabled={!!user}
            id="user"
            required
            options={users}
            onChange={(selected) => {
              setSelectedUser(selected);
            }}
            selected={selectedUser}
            placeholder="Choose the user"
          />
        </FormGroup>
        <FormGroup>
          <label>Specialization</label>
          <Typeahead
            disabled={!!specialization}
            id="specialization"
            required
            options={specializations}
            onChange={(selected) => {
              setSelectedSpecialization(selected);
            }}
            selected={selectedSpecialization}
            placeholder="Choose the specialization"
          />
        </FormGroup>
        {includeProduction && (
          <FormGroup>
            <label>Production</label>
            <div>
              When the production is set, the theater will update to match.
              <br />
              The dates will also update but can be edited to match the duration
              of the actual job.
            </div>
            <Typeahead
              disabled={!!production}
              id="production"
              options={productions}
              onChange={(selected) => {
                setSelectedProduction(selected);
              }}
              selected={selectedProduction}
              placeholder="Choose the production"
            />
          </FormGroup>
        )}

        <FormGroup>
          <label>Theater</label>
          <Typeahead
            disabled={!!theater || !!production}
            id="theater"
            options={theaters}
            onChange={(selected) => {
              setSelectedTheater(selected);
            }}
            selected={selectedTheater}
            placeholder="Choose the theater"
          />
        </FormGroup>
        <StartEndDatePair
          endDate={inputs.end_date}
          handleChange={handleChange}
          startDate={inputs.start_date}
        />
        <Button type="submit" variant="primary" block>
          Submit
        </Button>
        <Button type="button" onClick={onFormClose} block>
          Cancel
        </Button>
      </Form>{" "}
      <hr />
    </>
  );
}
