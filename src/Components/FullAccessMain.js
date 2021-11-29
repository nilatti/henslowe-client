import { Switch, Route } from "react-router-dom";
import IndividualAccount from "./Accounts/IndividualAccount";
import Authors from "./Authors/Authors";
import Dashboard from "./Dashboard/Dashboard";
import Help from "./Info/Help";
import GettingStarted from "./Info/GettingStarted";
import Plays from "./Plays/Plays";

import Subscriptions from "./Orders/Subscriptions";
import PricingIndividual from "./Orders/PricingIndividual";
import OrderSuccess from "./Orders/OrderSuccess";
import Productions from "./Productions/Productions";

import Spaces from "./Spaces/Spaces";
import Specializations from "./Specializations/Specializations";
import Theaters from "./Theaters/Theaters";
import Users from "./Users/Users";
import FrequentlyAskedQuestions from "./Info/FrequentlyAskedQuestions";

export default function FullAccessMain() {
  return (
    <Switch>
      <Route path="/account" component={IndividualAccount} />
      <Route
        path="/authors"
        render={(props) => <Authors {...props} authorFormOpen={false} />}
      />
      <Route path="/faq" component={FrequentlyAskedQuestions} />
      <Route path="/getting-started" component={GettingStarted} />
      <Route path="/help" component={Help} />
      <Route path="/subscriptions" component={Subscriptions} />
      <Route path="/success" component={OrderSuccess} />
      <Route path="/plays" component={Plays} />
      <Route path={`/productions`} component={Productions} />
      <Route path="/pricing-individual" component={PricingIndividual} />
      <Route path="/theaters" component={Theaters} />
      <Route path="/spaces" component={Spaces} />
      <Route path="/users" component={Users} />
      <Route path="/specializations" component={Specializations} />
      <Route exact path="/" component={Dashboard} />
    </Switch>
  );
}
