import { Link, Switch, Route } from "react-router-dom";
import { InfoBanner } from "./Styled";
import IndividualAccount from "./Accounts/IndividualAccount";
import Authors from "./Authors/Authors";
import Dashboard from "./Dashboard/Dashboard";
import Checkout from "./Orders/Checkout";
import PricingIndividual from "./Orders/PricingIndividual";
import PricingInstitutional from "./Orders/PricingInstitutional";
import OrderSuccess from "./Orders/OrderSuccess";
import Plays from "./Plays/Plays";
import Productions from "./Productions/Productions";
import Spaces from "./Spaces/Spaces";
import Specializations from "./Specializations/Specializations";
import Theaters from "./Theaters/Theaters";
import Users from "./Users/Users";
import Casting from "./Free/Casting";
import CutPlays from "./Free/CutPlays";
import Double from "./Free/Double";
import PartScripts from "./Free/PartScripts";
import WordCloud from "./Free/WordCloud";
import { PlayProvider } from "../lib/freePlayState";

export default function FreeAccountMain() {
  return (
    <PlayProvider>
      <InfoBanner>
        Because you have a free account, any changes you make to play texts
        (doubling, casting, cutting) won't save beyond your current session.{" "}
        <Link to="/pricing-individual"> Learn more about paid accounts.</Link>
      </InfoBanner>
      <Switch>
        <Route path="/account" component={IndividualAccount} />
        <Route
          path="/authors"
          render={(props) => <Authors {...props} authorFormOpen={false} />}
        />
        <Route exact path="/casting" component={Casting} />
        <Route exact path="/cut" component={CutPlays} />
        <Route path="/checkout" component={Checkout} />
        <Route exact path="/doubling" component={Double} />
        <Route exact path="/part-scripts" component={PartScripts} />
        <Route path="/plays" component={Plays} />
        <Route path={`/productions`} component={Productions} />
        <Route path="/pricing-individual" component={PricingIndividual} />
        <Route path="/pricing-institutional" component={PricingInstitutional} />
        <Route path="/theaters" component={Theaters} />
        <Route path="/spaces" component={Spaces} />
        <Route path="/specializations" component={Specializations} />
        <Route path="/success" component={OrderSuccess} />
        <Route path="/users" component={Users} />
        <Route exact path="/wordcloud" component={WordCloud} />
        <Route exact path="/" component={Dashboard} />
      </Switch>
    </PlayProvider>
  );
}
