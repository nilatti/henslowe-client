import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Authors from "./Authors/Authors";
import Dashboard from "./Dashboard/Dashboard";
import Jobs from "./Jobs/Jobs";
import Plays from "./Plays/Plays";

import Productions from "./Productions/Productions";
import Spaces from "./Spaces/Spaces";
import Specializations from "./Specializations/Specializations";
import Theaters from "./Theaters/Theaters";
import Users from "./Users/Users";

const MainStyle = styled.div`
  width: 100%;
`;

export default function Main() {
  return (
    <MainStyle>
      <Switch>
        <Route
          path="/authors"
          render={(props) => <Authors {...props} authorFormOpen={false} />}
        />

        <Route path="/plays" component={Plays} />
        <Route path={`/productions`} component={Productions} />
        <Route path="/theaters" component={Theaters} />
        <Route path="/spaces" component={Spaces} />
        <Route path="/users" component={Users} />
        <Route path="/specializations" component={Specializations} />
        <Route path="/jobs" component={Jobs} />
        <Route exact path="/" component={Dashboard} />
      </Switch>
    </MainStyle>
  );
}
