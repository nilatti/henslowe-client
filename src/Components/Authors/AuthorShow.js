import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import AuthorProfileForAdmin from "./AuthorProfileForAdmin";
import AuthorProfileForVisitor from "./AuthorProfileForVisitor";
import LoadingModal from "../LoadingModal";
import { Button } from "../Button";
import { useSuperAuthState } from "../Contexts";
import { Profile } from "../Styled";
import NewPlay from "../Plays/NewPlay";
import PlaysSubComponent from "../Plays/PlaysSubComponent";
import { createItem, getItem, updateServerItem } from "../../api/crud";
const AuthorStyles = styled.div`
  display: flex;
  flex-flow: row wrap;
  .profile {
    display: flex;
    flex: 1;
  }
  .plays {
    display: flex;
    flex: 1;
    flex-flow: column;
  }
`;
export default function AuthorShow({ onDeleteClick }) {
  const { role } = useSuperAuthState();
  const { authorId } = useParams();
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState();
  const [playForm, setPlayForm] = useState(false);
  const [plays, setPlays] = useState([]);

  useEffect(async () => {
    setLoading(true);
    let response = await getItem(authorId, "author");
    if (response.status >= 400) {
      console.log("error getting author");
    } else {
      setAuthor(response.data);
      setPlays(response.data.plays.filter((p) => p.canonical));
    }
    setLoading(false);
  }, []);

  function togglePlayForm() {
    setPlayForm(!playForm);
  }

  async function onPlaySubmit(play) {
    let response = await createItem(play, "play");
    if (response.status >= 400) {
      console.log("error creating play");
    } else {
      setPlays([...plays, response.data]);
    }
    setPlayForm(false);
  }
  async function updateAuthor(author) {
    let response = await updateServerItem(author, "author");
    if (response.status >= 400) {
      console.log("error updating author");
    } else {
      setAuthor(response.data);
    }
  }

  if (loading || !author) {
    return <LoadingModal displayText="loading author" />;
  }
  let dates = author.birthdate;
  if (author.deathdate != null) {
    dates = dates.concat(" to " + author.deathdate);
  }

  return (
    <AuthorStyles>
      <Profile className="profile">
        {role === "superadmin" ? (
          <AuthorProfileForAdmin
            dates={dates}
            onDeleteClick={onDeleteClick}
            author={author}
            updateAuthor={updateAuthor}
          />
        ) : (
          <AuthorProfileForVisitor dates={dates} author={author} />
        )}
      </Profile>
      <div className="plays">
        <h2>Plays by {author.last_name}</h2>
        <PlaysSubComponent author_id={author.id} plays={plays} />
        {role === "superadmin" && (
          <div>
            {playForm ? (
              <NewPlay
                author={author}
                onFormClose={togglePlayForm}
                onFormSubmit={onPlaySubmit}
              />
            ) : (
              <Button onClick={() => togglePlayForm()}>New Play</Button>
            )}
          </div>
        )}
      </div>
    </AuthorStyles>
  );
}
