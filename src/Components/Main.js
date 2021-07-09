import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Authors from "./Authors/Authors";
import Dashboard from "./Dashboard/Dashboard";
import DoublingCharts from "./Productions/DoublingCharts";
import Jobs from "./Jobs/Jobs";
import PasswordReset from "./PasswordReset";
import PasswordResetRequest from "./PasswordResetRequest";
import Plays from "./Plays/Plays";
import PlayScripts from "./PlayScripts/PlayScripts";
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
        <Route exact path="/" component={Dashboard} />
        <Route
          path="/authors"
          render={(props) => <Authors {...props} authorFormOpen={false} />}
        />
        <Route path="/password/reset" component={PasswordReset} />
        <Route
          path="/password_reset_request/"
          component={PasswordResetRequest}
        />
        <Route path="/plays/:id/playscripts/" component={PlayScripts} />
        <Route path="/plays" component={Plays} />
        <Route
          path={`/productions/:id/doubling_charts/`}
          component={DoublingCharts}
        />
        {/* <Route path={`/productions/:id/rehearsal_schedule`}>
          <ProductionRehearsalSchedule />
        </Route> */}
        <Route path={`/productions`} component={Productions} />
        <Route path="/theaters" component={Theaters} />
        <Route path="/spaces" component={Spaces} />
        <Route path="/users" component={Users} />
        <Route path="/specializations" component={Specializations} />
        <Route path="/jobs" component={Jobs} />
      </Switch>
    </MainStyle>
  );
}
