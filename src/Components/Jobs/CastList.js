import _ from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Spinner } from "../Loaders";
import Modal from "../Modal";

import { useProductionState } from "../../lib/productionState";

import { deleteJob } from "../../api/jobs";

import CastingContainer from "./CastingContainer";
import CastingReassign from "./CastingReassign";
import NewCasting from "./NewCasting";
import { Button } from "../Button";
import FakeActors from "../Productions/FakeActors";

const CastListStyle = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const FakeActorsStyle = styled.div`
  border: 3px solid var(--color-dark);
  border-radius: 4px;
  padding: 25px;
`;

const ReassignStyle = styled.div`
  border: 3px solid var(--color-dark);
  border-radius: 4px;
  padding: 25px;
`;

export default function CastList({}) {
  const {
    actorsAndAuditioners,
    castings,
    createCasting,
    fakeActorCount,
    fakeActorsArray,
    loading,
    setCastings,
    updateFakeActors,
    updateJob,
  } = useProductionState();
  const [castingsItems, setCastingsItems] = useState([]);
  const [newCastingFormOpen, setNewCastingFormOpen] = useState(false);
  const [showFakeActors, setShowFakeActors] = useState(false);
  const [showReassign, setShowReassign] = useState(false);

  useEffect(() => {
    let tempCastingsItems = castings.map((casting) => (
      <li key={casting.id}>
        <CastingContainer
          casting={casting}
          onDeleteClick={deleteCasting}
          onFormSubmit={onCastingSubmit}
          availableActors={actorsAndAuditioners}
        />
      </li>
    ));
    setCastingsItems(tempCastingsItems);
  }, [JSON.stringify(castings)]);

  async function deleteCasting(castingId) {
    const response = await deleteJob(castingId);
    if (response.status >= 400) {
      console.log("error deleting casting");
    } else {
      let newCastings = castings.filter((casting) => casting.id !== castingId);
      setCastings(newCastings);
    }
  }

  function handleNewCastingFormSubmit(characterName, casting) {
    createCasting(characterName, casting);
  }

  function onCastingSubmit(job, actor) {
    if (actor) {
      let updatedJob = { ...job };
      updatedJob.user_id = actor.id;
      //tk is all this deleting actually necessary?
      delete updatedJob.character;
      delete updatedJob.created_at;
      delete updatedJob.updated_at;
      delete updatedJob.specialization;
      delete updatedJob.theater;
      updateJob(updatedJob);
    }
  }

  function toggleNewCastingForm() {
    setNewCastingFormOpen(!newCastingFormOpen);
  }

  if (loading) {
    return (
      <Modal>
        <h1>Loading Cast List!</h1>
        <Spinner />
      </Modal>
    );
  }
  return (
    <CastListStyle>
      <h2>Cast</h2>
      <div>{castingsItems}</div>
      <NewCasting
        onFormClose={toggleNewCastingForm}
        onFormSubmit={handleNewCastingFormSubmit}
        users={actorsAndAuditioners}
      />
      {showFakeActors ? (
        <FakeActorsStyle>
          <em>
            Not quite ready to cast for real? Generate some fake actors for your
            production.
          </em>
          <div>
            {fakeActorsArray.length > 0 && (
              <div>
                <h3>Fake Actors</h3>
                Current fake actors:
                <ul>
                  {fakeActorsArray.map((fake) => (
                    <li key={fake.id}>
                      {fake.first_name} {fake.last_name} ({fake.gender})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <FakeActors actors={fakeActorCount} onSubmit={updateFakeActors} />
          <Button onClick={() => setShowFakeActors(false)}>Close</Button>
        </FakeActorsStyle>
      ) : (
        <Button onClick={() => setShowFakeActors(true)}>Fake Actors</Button>
      )}
      {showReassign ? (
        <ReassignStyle>
          <CastingReassign />
          <Button onClick={() => setShowReassign(false)}>Close</Button>
        </ReassignStyle>
      ) : (
        <Button onClick={() => setShowReassign(true)}>
          Reassign a whole track
        </Button>
      )}
    </CastListStyle>
  );
}
