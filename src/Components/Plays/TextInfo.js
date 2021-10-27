import { useState } from "react";
import styled from "styled-components";
import {
  NumberInput,
  NumberRangeWithToggle,
  TextInput,
  TextAreaInputWithToggle,
} from "../Inputs";
import ToolTip from "../ToolTip";
import info from "../Images/info_icon.png";
import { useForm } from "../../hooks/environmentUtils";
import { firstLetterUpcase } from "../../utils/stringUtils";
import { usePlayState } from "../../lib/playState";

const HeadingStyles = styled.div`
  display: flex;
  justify-content: center;
  h2 {
    padding: 0 5px;
  }
`;

const InfoDivStyles = styled.div`
  padding: 50px 25px;
`;
export default function TextInfo({ item, prettyName, type }) {
  const { updatePlayTextItem } = usePlayState();
  const [numberFormOpen, setNumberFormOpen] = useState(false);
  const [pageNumberFormOpen, setPageNumberFormOpen] = useState(false);
  const [summaryFormOpen, setSummaryFormOpen] = useState(false);
  const { inputs, handleChange } = useForm({
    end_page: item.end_page || 0,
    id: item.id || null,
    number: item.number || 0,
    start_page: item.start_page || 0,
    summary: item.summary || "",
  });
  function closeAllForms() {
    setNumberFormOpen(false);
    setPageNumberFormOpen(false);
    setSummaryFormOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    updatePlayTextItem(inputs, type);
    closeAllForms();
  }
  function toggleNumberForm() {
    setNumberFormOpen(!numberFormOpen);
  }
  function togglePageNumberFormOpen() {
    setPageNumberFormOpen(!pageNumberFormOpen);
  }
  function toggleSummaryForm() {
    setSummaryFormOpen(!summaryFormOpen);
  }
  let labelType = firstLetterUpcase(type);
  return (
    <InfoDivStyles>
      <div>
        {numberFormOpen && type != "french scene" ? (
          <NumberInput
            handleChange={handleChange}
            handleFormClose={toggleNumberForm}
            handleSubmit={handleSubmit}
            label={`${labelType} Number`}
            name="number"
            value={inputs.number}
          />
        ) : (
          <HeadingStyles>
            <h2>
              <span onDoubleClick={toggleNumberForm}>{prettyName}</span>
            </h2>
            <ToolTip icon={info}>
              <div>
                <em>Double-click most of this to edit</em>
              </div>
            </ToolTip>
          </HeadingStyles>
        )}
        {numberFormOpen && type == "french scene" && (
          <TextInput
            handleChange={handleChange}
            handleFormClose={toggleNumberForm}
            handleSubmit={handleSubmit}
            label={`${labelType} Number`}
            name="number"
            value={inputs.number}
          />
        )}
        <TextAreaInputWithToggle
          formOpen={summaryFormOpen}
          handleChange={handleChange}
          handleFormClose={toggleSummaryForm}
          handleSubmit={handleSubmit}
          label="Summary"
          name="summary"
          toggleForm={toggleSummaryForm}
          toggleText="Double-click to add summary"
          value={inputs.summary}
        />
        <NumberRangeWithToggle
          endLabel="End Page"
          endName="end_page"
          endValue={inputs.end_page}
          formOpen={pageNumberFormOpen}
          handleChange={handleChange}
          handleFormClose={togglePageNumberFormOpen}
          handleSubmit={handleSubmit}
          label="Pages"
          toggleForm={togglePageNumberFormOpen}
          toggleText="Click to add page numbers"
          startLabel="Start page"
          startName="start_page"
          startValue={inputs.start_page}
        />
      </div>
    </InfoDivStyles>
  );
}
