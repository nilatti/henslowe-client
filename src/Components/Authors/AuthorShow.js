import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import AuthorProfileForAdmin from "./AuthorProfileForAdmin";
import AuthorProfileForVisitor from "./AuthorProfileForVisitor";
import LoadingModal from "../LoadingModal";
import { useSuperAuthState } from "../Contexts";
import { Profile } from "../Styled";
import PlaysSubComponent from "../Plays/PlaysSubComponent";
import { getItem, updateServerItem } from "../../api/crud";
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

  useEffect(async () => {
    setLoading(true);
    let response = await getItem(authorId, "author");
    if (response.status >= 400) {
      console.log("error getting author");
    } else {
      setAuthor(response.data);
    }
    setLoading(false);
  }, []);

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
        <PlaysSubComponent author_id={author.id} plays={author.plays} />
        {role === "superadmin" && <div>Play form toggle tktk</div>}
      </div>
    </AuthorStyles>
  );
}
