import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getItem, updateServerItem } from "../../api/crud";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Button } from "../Button";
import LoadingModal from "../LoadingModal";

import TheaterProfileForAdmin from "./TheaterProfileForAdmin";
import TheaterProfileForVisitor from "./TheaterProfileForVisitor";
import JobsList from "../Jobs/ProductionJobsList";

import { deleteItem } from "../../api/crud";
import ProductionInfoTab from "../Productions/ProductionInfoTab";
import SpaceAgreementFormForTheaters from "../SpaceAgreements/SpaceAgreementFormForTheaters";
import SpaceInfoTab from "../Spaces/SpaceInfoTab";
import { useTheaterAuthState } from "../Contexts";

const TheaterProfile = styled.div`
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
  div {
    padding: 15px 0;
  }
  h2 {
    display: flex;
    justify-content: center;
    padding: 0 5px;
    div {
      font-size: 0.8em;
    }
  }
`;
export default function TheaterShow() {
  const { theaterId } = useParams();
  const { role } = useTheaterAuthState();

  const [key, setKey] = useState();
  const [loading, setLoading] = useState(false);

  const [theater, setTheater] = useState();

  useEffect(async () => {
    setLoading(true);
    let response = await getItem(theaterId, "theater");
    if (response.status >= 400) {
      console.log("error!");
      setErrors((errors) => [...errors, "Error fetching theater"]);
    } else {
      setTheater(response.data);
    }
    setLoading(false);
  }, []);

  // function handleDeleteClick() {
  //   onDeleteClick(theater.id);
  // }

  function handleSelect(key) {
    setKey(key);
  }

  async function handleDeleteJob(jobId) {
    const response = await deleteItem(jobId, "job");
    if (response.status >= 400) {
      console.log("error deleting job");
    } else {
      newJobs = theater.jobs.filter((job) => job.id != jobId);
      setTheater({ ...theater, jobs: newJobs });
    }
  }

  async function updateTheater(theater) {
    let response = await updateServerItem(theater, "theater");
    if (response.status >= 400) {
      console.log("error updating theater");
    } else {
      setTheater(response.data);
    }
  }

  if (loading || !theater) {
    return <LoadingModal displayText="Loading theater" />;
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
    <TheaterProfile>
      {role === "admin" ? (
        <TheaterProfileForAdmin
          theater={theater}
          updateTheater={updateTheater}
        />
      ) : (
        <TheaterProfileForVisitor theater={theater} />
      )}
      <div>
        <h2>Spaces</h2>
        {role === "admin" && (
          <SpaceAgreementFormForTheaters
            theater={theater}
            onFormSubmit={updateTheater}
          />
        )}
        <Tabs activeKey={key} onSelect={handleSelect} id="space-info-tabs">
          {spaceTabs}
        </Tabs>
      </div>
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
      <JobsList
        handleDeleteJob={handleDeleteJob}
        jobs={theater.jobs}
        role={role}
      />
    </TheaterProfile>
  );
}

//handleDeleteJob,
// jobs,
// onFormSubmit,
// production,
// role,
