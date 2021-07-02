import PropTypes from "prop-types";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Button } from "../Button";
import JobsList from "../Jobs/JobsList";
import ProductionInfoTab from "../Productions/ProductionInfoTab";
import SpaceAgreementFormForTheatersToggle from "../SpaceAgreements/SpaceAgreementFormForTheatersToggle";
import SpaceInfoTab from "../Spaces/SpaceInfoTab";
import { useTheaterAuthState } from "../Contexts";

export default function TheaterShow({
  onDeleteClick,
  onEditClick,
  onFormSubmit,
  theater,
}) {
  const { role } = useTheaterAuthState();
  const [key, setKey] = useState();
  function handleDeleteClick() {
    onDeleteClick(theater.id);
  }

  function handleSelect(key) {
    setKey(key);
  }

  let productionTabs;
  if (theater && theater.productions && theater.productions.length > 0) {
    productionTabs = theater.productions.map((production) => {
      let past = !!production.end_date < new Date();
      return (
        <Tab
          eventKey={`production-${production.id}`}
          title={production.play ? production.play.title : "A Play"}
          key={`production-${production.id}`}
          tabClassName={past ? "past-event" : "current-event"}
        >
          <ProductionInfoTab production={production} />
        </Tab>
      );
    });
  } else {
    productionTabs = <div>No productions found</div>;
  }
  let spaceTabs;
  if (theater && theater.spaces && theater.spaces.length > 0) {
    spaceTabs = theater.spaces.map((space) => (
      <Tab
        eventKey={`space-${space.id}`}
        title={space.name}
        key={`space-${space.id}`}
      >
        <SpaceInfoTab space={space} />
      </Tab>
    ));
  } else {
    spaceTabs = <div>No spaces found</div>;
  }

  return (
    <div>
      <h2>{theater.name}</h2>
      {theater.mission_statement && (
        <p>
          <em>{theater.mission_statement}</em>
        </p>
      )}
      {theater.street_address && (
        <p>
          {theater.street_address}
          <br />
          {theater.city}, {theater.state} {theater.zip}
          <br />
        </p>
      )}
      {theater.phone_number && <p>{theater.phone_number}</p>}
      {theater.website && (
        <p>
          <a href={"http://" + theater.website} target="_blank">
            {theater.website}
          </a>
        </p>
      )}
      {role === "theater_admin" && (
        <span>
          <span className="right floated edit icon" onClick={onEditClick}>
            <i className="fas fa-pencil-alt"></i>
          </span>
          <span
            className="right floated trash icon"
            onClick={handleDeleteClick}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        </span>
      )}
      <h2>Spaces</h2>
      {role === "theater_admin" && (
        <SpaceAgreementFormForTheatersToggle
          theater={theater}
          isOpen={false}
          onFormSubmit={onFormSubmit}
        />
      )}
      <Tabs activeKey={key} onSelect={handleSelect} id="space-info-tabs">
        {spaceTabs}
      </Tabs>

      <h2>Productions</h2>
      {role === "admin" && (
        <div>
          <Link to={`/productions/new?theaterId=${theater.id}`}>
            <Button>Add new production</Button>
          </Link>
        </div>
      )}
      <Tabs activeKey={key} onSelect={handleSelect} id="production-info-tabs">
        {productionTabs}
      </Tabs>
      <h2>People</h2>

      <JobsList theater={theater} />
    </div>
  );
}

TheaterShow.propTypes = {
  theater: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};
