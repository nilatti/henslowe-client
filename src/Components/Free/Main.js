import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import CutPlays from "./CutPlays";
import Welcome from "./Welcome";
import { PlayProvider } from "../../lib/freePlayState";

const MainStyle = styled.div`
  width: 100%;
`;

export default function Main() {
  return (
    <PlayProvider>
      <MainStyle>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/cut" component={CutPlays} />
        </Switch>
      </MainStyle>
    </PlayProvider>
  );
}

{
  /* <Route
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
        <Route path={`/productions/:id/rehearsal_schedule`}>
          <ProductionRehearsalSchedule />
        </Route>
        <Route path={`/productions`} component={Productions} />
        <Route path="/theaters" component={Theaters} />
        <Route path="/spaces" component={Spaces} />
        <Route path="/users" component={Users} />
        <Route path="/specializations" component={Specializations} />
        <Route path="/jobs" component={Jobs} /> */
}
