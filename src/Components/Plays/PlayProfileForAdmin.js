import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { useForm } from "../../hooks/environmentUtils";
import { Form } from "../Form";
import { Button } from "../Button";
import {
  FormButtonGroup,
  TextInputAsForm,
  TextAreaInputWithToggle,
} from "../Inputs";
import ToolTip from "../ToolTip";
import LoadingModal from "../LoadingModal";
import { getItems } from "../../api/crud";
import { renderCutScript, renderMarkedScript } from "../../api/acts";
import { formatDateForRails } from "../../utils/dateTimeUtils";

export default function PlayProfileForAdmin({
  play,
  onDeleteClick,
  updatePlay,
}) {
  play.acts.map((act) => console.log(act.id));
  const [authors, setAuthors] = useState([]);
  const [authorForm, setAuthorForm] = useState(false);
  const [canonicalForm, setCanonicalForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState([
    {
      id: play.author?.id || null,
      label: play.author
        ? `${play.author.first_name} ${play.author.last_name}`
        : null,
    },
  ]);
  const [synopsisForm, setSynopsisForm] = useState(false);
  const [textNotesForm, setTextNotesForm] = useState(false);
  const [titleForm, setTitleForm] = useState(false);
  const { inputs, handleChange } = useForm({
    author_id: play.author?.id || "",
    canonical: play.canonical || "",
    id: play.id,
    synopsis: play.synopsis || "",
    text_notes: play.text_notes || "",
    title: play.title || "",
  });

  useEffect(async () => {
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
    }
    setLoading(false);
  }, []);

  function closeAllForms() {
    setAuthorForm(false);
    setCanonicalForm(false);
    setSynopsisForm(false);
    setTextNotesForm(false);
    setTitleForm(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    inputs.author_id = selectedAuthor[0].id;
    updatePlay(inputs);
    closeAllForms();
  }

  function toggleAuthorForm() {
    setAuthorForm(!authorForm);
  }

  function toggleCanonicalForm() {
    setCanonicalForm(!canonicalForm);
  }
  function toggleSynopsisForm() {
    setSynopsisForm(!synopsisForm);
  }
  function toggleTextNotesForm() {
    setTextNotesForm(!textNotesForm);
  }
  function toggleTitleForm() {
    setTitleForm(!titleForm);
  }

  async function requestCutScript(act) {
    setLoading(true);
    const today = new Date();
    const response = await renderCutScript(act.id, play.id);
    if (response.status >= 400) {
      console.log("error getting cut script");
    } else {
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(new Blob([response.data]));
      link.download = `${play.title}-${formatDateForRails({
        date: today,
      })}-ACT-${act.number}.docx`;

      document.body.appendChild(link);

      link.click();
    }
    setLoading(false);
  }

  async function requestMarkedScript(act) {
    setLoading(true);
    const today = new Date();
    const response = await renderMarkedScript(act.id, play.id);
    if (response.status >= 400) {
      console.log("error getting cut script");
    } else {
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(new Blob([response.data]));
      link.download = `${play.title}-marked-${formatDateForRails({
        date: today,
      })}-ACT-${act.number}.docx`;

      document.body.appendChild(link);

      link.click();
    }
    setLoading(false);
  }
  if (loading || !authors.length) {
    return <LoadingModal displayText="loading" />;
  }
  return (
    <>
      {titleForm ? (
        <TextInputAsForm
          handleChange={handleChange}
          handleFormClose={toggleTitleForm}
          handleSubmit={handleSubmit}
          label="Title"
          name="title"
          value={inputs.title}
        />
      ) : (
        <>
          <h2 onDoubleClick={toggleTitleForm}>
            {play.title}
            <ToolTip>
              <div>
                <em>Double-click most of this to edit</em>
              </div>
            </ToolTip>
          </h2>
          <span
            className="right floated trash icon"
            onClick={() => onDeleteClick(play.id)}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        </>
      )}
      {!!play.author && (
        <span>
          {" "}
          by{" "}
          <Link to={`/authors/${play.author.id}`}>
            {play.author.first_name} {play.author.last_name}
          </Link>
        </span>
      )}

      {authorForm ? (
        <Form noValidate onSubmit={(e) => handleSubmit(e)} width="85%">
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
          <FormButtonGroup cancelFunction={toggleAuthorForm} />
        </Form>
      ) : (
        <Button onClick={toggleAuthorForm}>Change Author</Button>
      )}

      <div width="100%">
        {play.canonical && (
          <div>
            <em> Canonical Version</em>
          </div>
        )}
        <TextAreaInputWithToggle
          formOpen={synopsisForm}
          handleChange={handleChange}
          handleFormClose={toggleSynopsisForm}
          handleSubmit={handleSubmit}
          label="Synopsis"
          name="synopsis"
          toggleForm={toggleSynopsisForm}
          toggleText="Double click to set play synopsis"
          value={inputs.synopsis}
        />
        <TextAreaInputWithToggle
          formOpen={textNotesForm}
          handleChange={handleChange}
          handleFormClose={toggleTextNotesForm}
          handleSubmit={handleSubmit}
          label="Text Notes"
          name="text_notes"
          toggleForm={toggleTextNotesForm}
          toggleText="Double click to set text notes"
          value={inputs.text_notes}
        />
      </div>
      <div>
        <ul>
          <li>
            <Link to={`/plays/${play.id}/text_breakdown`}>
              Act/Scene/French Scene breakdown
            </Link>
          </li>
          <li>
            <Link to={`/plays/${play.id}/character_breakdown`}>
              Character breakdown
            </Link>
          </li>
          {/* <li>
            <Link to={`/`}>Character chart</Link>
          </li> */}
          <li>
            <Link to={`/plays/${play.id}/playscript`}>Edit script</Link>
          </li>
          <li>
            <Link to={`/plays/${play.id}/word_clouds`}>Make word clouds</Link>
          </li>
          <li>
            <Link to={`/plays/${play.id}/part_scripts`}>Make part scripts</Link>
          </li>
          <li>
            {play.acts.map((act) => (
              <li>
                <Link
                  to={`#`}
                  onClick={() => {
                    requestCutScript(act);
                  }}
                >
                  Download Act {act.number} script with cuts removed
                </Link>
                |
                <Link
                  to={`#`}
                  onClick={() => {
                    requestMarkedScript(act);
                  }}
                >
                  Download Act {act.number} script with cuts marked
                </Link>
              </li>
            ))}
          </li>
        </ul>
      </div>
    </>
  );
}
