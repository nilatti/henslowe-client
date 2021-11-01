import { useEffect, useState } from "react";
import { AddNewTabStyle } from "./BreakdownStyles";
import { Form, FormGroupInline } from "../Form";
import { FormButtonGroup, NumberRange } from "../Inputs";
import LoadingModal from "../LoadingModal";
import { usePlayState } from "../../lib/playState";
import { useForm } from "../../hooks/environmentUtils";
import { firstLetterUpcase } from "../../utils/stringUtils";

export default function NewTextItem({
  number,
  parentId,
  parentType,
  setKey,
  startPage,
  type,
}) {
  const { addNewTextItem } = usePlayState();
  const { inputs, handleChange, resetForm } = useForm({
    end_page: startPage || 0,
    number: number || "",
    [`${parentType}_id`]: parentId,
    summary: "",
    start_page: startPage || 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    inputs.number = number;
  }, [number]);

  useEffect(() => {
    inputs.start_page = startPage;
    inputs.end_page = startPage;
  }, [startPage]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let newItemId = await addNewTextItem(inputs, type);
    setLoading(false);
    resetForm();
    setKey(`${type}-${newItemId}`);
  }

  function onFormClose() {
    resetForm();
  }
  if (loading) {
    <LoadingModal displayText={`Creating {type}`} />;
  }
  return (
    <AddNewTabStyle>
      <h3>Add New {firstLetterUpcase(type)}</h3>

      <Form noValidate onSubmit={(e) => handleSubmit(e)} width="100%">
        <fieldset>
          <FormGroupInline>
            <label>Number:</label>
            {type === "french_scene" ? (
              <input
                name="number"
                onChange={handleChange}
                type="text"
                value={inputs.number}
              />
            ) : (
              <input
                name="number"
                onChange={handleChange}
                type="number"
                value={inputs.number}
              />
            )}
          </FormGroupInline>
        </fieldset>
        <fieldset>
          <label>Summary:</label>
          <textarea
            name="summary"
            onChange={handleChange}
            placeholder="summary"
            rows={10}
            type="text"
            value={inputs.summary}
          />
        </fieldset>
        <NumberRange
          endLabel="End Page"
          endName="end_page"
          endValue={inputs.end_page || 0}
          handleChange={handleChange}
          startLabel="Start Page"
          startName="start_name"
          startValue={inputs.start_page || 0}
        />
        <FormButtonGroup cancelFunction={onFormClose} />
      </Form>
    </AddNewTabStyle>
  );
}
