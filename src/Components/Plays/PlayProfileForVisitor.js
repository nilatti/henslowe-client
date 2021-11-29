import parse from "html-react-parser";
import { Link } from "react-router-dom";

export default function PlayProfileForVisitor({ play }) {
  return (
    <div>
      <h3>
        <span>{play.title}</span>
        {!!play.author && (
          <span>
            {" "}
            by{" "}
            <Link to={`/authors/${play.author.id}`}>
              {play.author.first_name} {play.author.last_name}
            </Link>
          </span>
        )}
      </h3>
      <div>
        {play.canonical && (
          <div>
            <em> Canonical Version</em>
          </div>
        )}
        <div>{play.synopsis && parse(`${play.synopsis}`)}</div>
        <div>{play.text_notes && parse(`${play.text_notes}`)}</div>
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
            <Link to={`/plays/${play.id}/playscript`}>View script</Link>
          </li>
          <li>
            <Link to={`/plays/${play.id}/word_clouds`}>Make word clouds</Link>
          </li>
          <li>
            <Link to={`/plays/${play.id}/part_scripts`}>Make part scripts</Link>
          </li>
          {/* <li>
            <Link to={`/`}>Download entire script</Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
