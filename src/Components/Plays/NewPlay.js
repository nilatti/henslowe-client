import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Form } from "../Form";
import { FormButtonGroup, TextInput } from "../Inputs";
import { useForm } from "../../hooks/environmentUtils";
import LoadingModal from "../LoadingModal";
import { getItems } from "../../api/crud";
export default function NewPlay({ author, onFormClose, onFormSubmit }) {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState([]);
  const { inputs, handleChange } = useForm({
    author_id: author?.id || "",
    title: "",
  });

  useEffect(async () => {
    if (!author) {
      setLoading(true);
      let response = await getItems("author");
      if (response.status >= 400) {
        console.log("error loading authors");
      } else {
        let formattedAuthors = response.data.map((author) => ({
          id: author.id,
          label: `${author.first_name} ${author.last_name}`,
        }));
        setAuthors(formattedAuthors);
        setLoading(false);
      }
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    !author
      ? (inputs.author_id = selectedAuthor[0].id)
      : (inputs.author_id = author.id);
    console.log(selectedAuthor);
    console.log(inputs);
    onFormSubmit(inputs);
  }
  if (loading) {
    return <LoadingModal displayText="loading authors" />;
  }
  return (
    <div id="new-play-form">
      <Form noValidate onSubmit={(e) => handleSubmit(e)} width="85%">
        <TextInput
          handleChange={handleChange}
          label="Title"
          name="title"
          value={inputs.title}
        />
        {!author && (
          <Typeahead
            allowNew
            newSelectionPrefix="Add a new author: "
            value={selectedAuthor}
            id="author"
            type="typeahead"
            options={authors}
            onChange={setSelectedAuthor}
            placeholder="Choose the author"
            selected={selectedAuthor}
          />
        )}
        <FormButtonGroup cancelFunction={onFormClose} />
      </Form>
    </div>
  );
}
