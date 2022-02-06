import { useState } from "react";
import styled from "styled-components";
import { Button } from "../../../Button.js";
import { FancyRadio, FancyRadioLabelBox } from "../../../Styled.js";

import { useForm } from "../../../../hooks/environmentUtils.js";

const ContentForm = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 0px;
  flex-flow: column nowrap;
  h4 {
    font-size: 1.25rem;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 1.15rem;
`;

export default function TextUnitSelector({
  onFormClose,
  onFormSubmit,
  rehearsal,
}) {
  const { inputs, handleChange } = useForm({
    text_unit: "",
  });
  const [buttonsEnabled, setButtonsEnabled] = useState(false);
  function processChangeAndEnableLoad(e) {
    handleChange(e);
    setButtonsEnabled(true);
  }

  function updateRehearsalTextUnit(e) {
    e.preventDefault();
    const newRehearsal = { ...rehearsal, text_unit: inputs.text_unit };
    onFormSubmit(newRehearsal);
  }

  return (
    <ContentForm>
      <h4>How do you want to schedule this rehearsal?</h4>
      <form onSubmit={(e) => updateRehearsalTextUnit(e)}>
        <div>
          <Label>Unit of text</Label>
          <div className="textUnit">
            <label>
              <FancyRadio
                checked={inputs.text_unit === "french_scenes"}
                id="french_scene"
                label="French Scene"
                name="text_unit"
                onChange={(e) => processChangeAndEnableLoad(e)}
                type="radio"
                value="french_scenes"
              />
              <FancyRadioLabelBox>
                <span>French Scene</span>
              </FancyRadioLabelBox>
            </label>
          </div>
          <div className="text_unit">
            <label>
              <FancyRadio
                checked={inputs.text_unit === "scenes"}
                id="scene"
                name="text_unit"
                onChange={(e) => processChangeAndEnableLoad(e)}
                type="radio"
                value="scenes"
              />
              <FancyRadioLabelBox>
                <span>Scene</span>
              </FancyRadioLabelBox>
            </label>
          </div>
          <div className="textUnit">
            <label>
              <FancyRadio
                checked={inputs.text_unit === "acts"}
                id="acts"
                name="text_unit"
                onChange={(e) => processChangeAndEnableLoad(e)}
                type="radio"
                value="acts"
              />
              <FancyRadioLabelBox>
                <span>Act</span>
              </FancyRadioLabelBox>
            </label>
          </div>
        </div>
        <Button disabled={!buttonsEnabled} type="submit">
          Load Text Options
        </Button>
        <Button
          backgroundColor={"var(--cancel-button-background-color)"}
          borderColor={"var(--cancel-button-border-color)"}
          colorProp={"var(--cancel-button-color)"}
          onClick={onFormClose}
        >
          Cancel
        </Button>
      </form>
    </ContentForm>
  );
}
