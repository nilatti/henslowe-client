import { Switch, Route } from "react-router-dom";
import IndividualAccount from "./Accounts/IndividualAccount";
import InstitutionalAccount from "./Accounts/InstitutionalAccount";
import Authors from "./Authors/Authors";
import Dashboard from "./Dashboard/Dashboard";
import Plays from "./Plays/Plays";

import Checkout from "./Orders/Checkout";
import PricingIndividual from "./Orders/PricingIndividual";
import PricingInstitutional from "./Orders/PricingInstitutional";
import OrderSuccess from "./Orders/OrderSuccess";
import Productions from "./Productions/Productions";

import Spaces from "./Spaces/Spaces";
import Specializations from "./Specializations/Specializations";
import Theaters from "./Theaters/Theaters";
import Users from "./Users/Users";

export default function FullAccessMain() {
  return (
    <Switch>
      <Route path="/account" component={IndividualAccount} />
      <Route
        path="/authors"
        render={(props) => <Authors {...props} authorFormOpen={false} />}
      />
      <Route path="/checkout" component={Checkout} />
      <Route path="/institutional-account" component={InstitutionalAccount} />
      <Route path="/success" component={OrderSuccess} />
      <Route path="/plays" component={Plays} />
      <Route path={`/productions`} component={Productions} />
      <Route path="/pricing-individual" component={PricingIndividual} />
      <Route path="/pricing-institutional" component={PricingInstitutional} />
      <Route path="/theaters" component={Theaters} />
      <Route path="/spaces" component={Spaces} />
      <Route path="/users" component={Users} />
      <Route path="/specializations" component={Specializations} />
      <Route exact path="/" component={Dashboard} />
    </Switch>
  );
}
