import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Authors from "./Authors/Authors";
import Dashboard from "./Dashboard/Dashboard";
import Plays from "./Plays/Plays";

import PricingIndividual from "./Orders/PricingIndividual";
import PricingInstitutional from "./Orders/PricingInstitutional";
import Productions from "./Productions/Productions";

import Spaces from "./Spaces/Spaces";
import Specializations from "./Specializations/Specializations";
import Theaters from "./Theaters/Theaters";
import Users from "./Users/Users";

//tktkt this is a test
import Checkout from "./Orders/Checkout";

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
        <Route path="/checkout" component={Checkout} />

        <Route path="/plays" component={Plays} />
        <Route path={`/productions`} component={Productions} />
        <Route path="/pricing_individual" component={PricingIndividual} />
        <Route path="/pricing_institutional" component={PricingInstitutional} />
        <Route path="/theaters" component={Theaters} />
        <Route path="/spaces" component={Spaces} />
        <Route path="/users" component={Users} />
        <Route path="/specializations" component={Specializations} />
        <Route exact path="/" component={Dashboard} />
      </Switch>
    </MainStyle>
  );
}
