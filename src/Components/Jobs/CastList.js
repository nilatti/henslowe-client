import _ from "lodash";
import { useState } from "react";
import styled from "styled-components";
import { Spinner } from "../Loaders";
import Modal from "../Modal";

import { useProductionState } from "../../lib/productionState";

import { deleteJob } from "../../api/jobs";

import CastingContainer from "./CastingContainer";
import NewCasting from "./NewCasting";

const CastListStyle = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export default function CastList({}) {
  const {
    actorsAndAuditioners,
    castings,
    createCasting,
    loading,
    productionId,
    setCastings,
    updateJob,
  } = useProductionState();
  const [newCastingFormOpen, setNewCastingFormOpen] = useState(false);

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
    let updatedJob = { ...job };
    updatedJob.user_id = actor.id;
    delete updatedJob.character;
    delete updatedJob.created_at;
    delete updatedJob.updated_at;
    delete updatedJob.specialization;
    delete updatedJob.theater;
    updateJob(updatedJob);
  }

  function toggleNewCastingForm() {
    setNewCastingFormOpen(!newCastingFormOpen);
  }
  let castingsItems = castings.map((casting) => (
    <li key={casting.id}>
      <CastingContainer
        casting={casting}
        onDeleteClick={deleteCasting}
        onFormSubmit={onCastingSubmit}
        availableActors={actorsAndAuditioners}
      />
    </li>
  ));
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
      <h2>Casting by Character</h2>
      <div>{castingsItems}</div>
      <NewCasting
        onFormClose={toggleNewCastingForm}
        onFormSubmit={handleNewCastingFormSubmit}
        users={actorsAndAuditioners}
      />
    </CastListStyle>
  );
}
