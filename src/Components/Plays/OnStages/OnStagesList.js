import { useEffect, useState } from "react";
import styled from "styled-components";
import OnStageShow from "./OnStageShow.js";
import NewOnStageForm from "./NewOnStageForm.js";
import { Button } from "../../Button.js";

const OnStageListStyles = styled.ul`
  li:nth-child(even) {
    background: var(--color-light);
  }
`;

export default function OnStagesList({ frenchScene }) {
  const [newFormOpen, setNewFormOpen] = useState(false);
  const [onStages, setOnStages] = useState([]);

  useEffect(() => {
    if (frenchScene.on_stages?.length) {
      let orderedOnStages = _.orderBy(frenchScene.on_stages, "character.name");
      let onStagesLIs = orderedOnStages.map((onStage) => (
        <li key={onStage.id}>
          <OnStageShow onStage={onStage} />
        </li>
      ));
      setOnStages(onStagesLIs);
    }
  }, [JSON.stringify(frenchScene)]);

  function toggleNewForm() {
    setNewFormOpen(!newFormOpen);
  }

  return (
    <div>
      <h3>On Stages</h3>
      <OnStageListStyles>
        {onStages}
        {newFormOpen ? (
          <NewOnStageForm
            frenchScene={frenchScene}
            onFormClose={toggleNewForm}
          />
        ) : (
          <Button onClick={toggleNewForm}>Add New Onstage</Button>
        )}
      </OnStageListStyles>
    </div>
  );
}
