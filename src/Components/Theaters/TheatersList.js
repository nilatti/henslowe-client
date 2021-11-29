import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TheaterListItem from "./TheaterListItem";
import { getJobs } from "../../api/jobs";
import { useMeState } from "../../lib/meState";
import { getSuperAdminRole } from "../../utils/authorizationUtils";
import { Button } from "../Button";

export default function TheatersList({ theaters }) {
  const { me } = useMeState();
  const [myTheaters, setMyTheaters] = useState([]);
  const [otherTheaters, setOtherTheaters] = useState([]);
  let isSuperAdmin = getSuperAdminRole(me);

  useEffect(async () => {
    let response = await getJobs({ user_id: me.id });
    if (response >= 400) {
      console.log("error fetching theaters for user");
    } else {
      let myTheaterIds = response.data.map((job) => job.theater_id);
      let tempMyTheaters = [];
      let tempOtherTheaters = [];
      theaters.map((theater) => {
        if (myTheaterIds.includes(theater.id)) {
          tempMyTheaters.push(theater);
        } else if (!theater.fake) {
          tempOtherTheaters.push(theater);
        }
      });
      setMyTheaters(tempMyTheaters);
      setOtherTheaters(tempOtherTheaters);
    }
  }, [theaters]);

  let myTheatersList = myTheaters.map((theater) => (
    <TheaterListItem theater={theater} key={theater.id} />
  ));
  let otherTheatersList = otherTheaters.map((theater) => (
    <TheaterListItem theater={theater} key={theater.id} />
  ));

  return (
    <div>
      <h3>Your theaters</h3>
      <ul>{myTheatersList}</ul>
      <h3>Other theaters</h3>
      <ul>{otherTheatersList}</ul>
      {me.subscription_status == "active" && (
        <Link to="/theaters/new">
          <Button>Add New</Button>
        </Link>
      )}
    </div>
  );
}
