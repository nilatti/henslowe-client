import { Button } from "../../Button.js";
import { Form, FormGroupInline } from "../../Form.js";

import { useForm } from "../../../hooks/environmentUtils.js";

export default function StageExitForm({
  onFormClose,
  onFormSubmit,
  productionId,
  stageExit,
}) {
  const { inputs, handleChange } = useForm(
    stageExit || {
      name: "",
    }
  );
  function handleSubmit(event) {
    event.preventDefault();

    processSubmit();
  }

  function processSubmit() {
    let id;
    if (stageExit) {
      id = stageExit.id;
    }
    onFormSubmit(
      {
        id: id,
        production_id: productionId,
        name: inputs.name,
      },
      "stage_exit"
    );
    onFormClose();
  }
  return (
    <Form noValidate onSubmit={(e) => handleSubmit(e)}>
      <FormGroupInline>
        <label>Name</label>
        <input name="name" onChange={handleChange} value={inputs.name} />
      </FormGroupInline>
      <Button type="submit" variant="primary" block>
        Submit
      </Button>
      <Button type="button" onClick={onFormClose} block>
        Cancel
      </Button>
    </Form>
  );
}
