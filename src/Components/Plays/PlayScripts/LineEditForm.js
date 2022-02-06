import { useState } from "react";
import { Form } from "../../Form.js";

export default function LineEditForm({ onSubmit, line }) {
  const [newContent, setNewContent] = useState(line.new_content);
  function onChange(e) {
    if (e.key == "Enter") {
      submitForm();
    }
    setNewContent(e.target.value);
  }

  function submitForm() {
    let newLine = { ...line, new_content: newContent };
    onSubmit(newLine);
  }
  return (
    <Form
      controlid="lineEditForm"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      width="100%"
    >
      <input
        value={newContent || line.original_content || ""}
        onKeyDown={(evt) => onChange(evt)}
        onChange={(evt) => onChange(evt)}
        onBlur={submitForm}
      />
    </Form>
  );
}
