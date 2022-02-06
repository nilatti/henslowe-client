import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createItemWithParent,
  getItem,
  updateServerItem,
} from "../../api/crud.js";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Button } from "../Button.js";
import LoadingModal from "../LoadingModal.js";

import TheaterProfileForAdmin from "./TheaterProfileForAdmin.js";
import TheaterProfileForVisitor from "./TheaterProfileForVisitor.js";
import TheaterJobsList from "../Jobs/TheaterJobsList.js";

import { deleteItem } from "../../api/crud.js";
import ProductionInfoTab from "../Productions/ProductionInfoTab.js";
import SpaceAgreementFormForTheaters from "../SpaceAgreements/SpaceAgreementFormForTheaters.js";
import SpaceInfoTab from "../Spaces/SpaceInfoTab.js";
import { useTheaterAuthState } from "../Contexts.js";
import { useMeState } from "../../lib/meState.js";
import { Profile } from "../Styled.js";
export default function TheaterShow({ onDeleteClick }) {
  const { me } = useMeState();
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

  async function handleCreateJob(job) {
    const response = await createItemWithParent(
      "theater",
      theater.id,
      "job",
      job
    );
    if (response.status >= 400) {
      console.log("error creating job");
    } else {
      let newJobs = [...theater.jobs, response.data];
      setTheater({ ...theater, jobs: newJobs });
    }
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
    <Profile>
      {role === "admin" ? (
        <TheaterProfileForAdmin
          theater={theater}
          updateTheater={updateTheater}
          onDeleteClick={onDeleteClick}
        />
      ) : (
        <TheaterProfileForVisitor theater={theater} />
      )}
      {!theater.fake && (
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
          <hr />
        </div>
      )}
      <div>
        <h2>Productions</h2>
        <em>
          Don't see a recently added production? Reload the page in a minute; it
          can take a while for our robots to build your workspace.
        </em>
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
        <hr />
      </div>
      <div>
        <h2>People</h2>
        {me?.subscription_status != "active" && (
          <div>
            <em>
              Free accounts can only use fake people to cast and fill in jobs.
              However, if you{" "}
              <Link to="/subscriptions">upgrade to a paid account</Link>, it's
              very easy to transfer all roles to a real user. In the mean time,
              have fun, imagining Judi Dench and Gene Wilder starring as the
              Macbeths.
            </em>
          </div>
        )}
        <TheaterJobsList
          handleDeleteJob={handleDeleteJob}
          onFormSubmit={handleCreateJob}
          jobs={theater.jobs}
          role={role}
          theater={theater}
        />
        <hr />
      </div>
    </Profile>
  );
}
