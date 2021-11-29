import { Link, Switch, Route } from "react-router-dom";
import { InfoBanner } from "./Styled";
import Casting from "./Free/Casting";
import Subscriptions from "./Orders/Subscriptions";
import CutPlays from "./Free/CutPlays";
import Double from "./Free/Double";
import FolgerSituation from "./Orders/FolgerSituation";
import OrderSuccess from "./Orders/OrderSuccess";
import PartScripts from "./Free/PartScripts";
import PricingIndividual from "./Orders/PricingIndividual";
import PricingInstitutional from "./Orders/PricingInstitutional";
import Welcome from "./Free/Welcome";
import WordCloud from "./Free/WordCloud";
import { PlayProvider } from "../lib/freePlayState";

export default function PublicMain() {
  return (
    <PlayProvider>
      <InfoBanner>
        Because you don't have an account, any changes you make to play texts
        (doubling, casting, cutting) won't save beyond your current session.{" "}
        <Link to="/pricing-individual">
          {" "}
          Learn more about signing up for an account.
        </Link>
      </InfoBanner>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/casting" component={Casting} />
        <Route path="/subscriptions" component={Subscriptions} />
        <Route exact path="/cut" component={CutPlays} />
        <Route exact path="/doubling" component={Double} />
        <Route exact path="/folger" component={FolgerSituation} />
        <Route exact path="/part-scripts" component={PartScripts} />
        <Route path="/pricing-individual" component={PricingIndividual} />
        <Route path="/pricing-institutional" component={PricingInstitutional} />
        <Route path="/success" component={OrderSuccess} />
        <Route exact path="/wordcloud" component={WordCloud} />
      </Switch>
    </PlayProvider>
  );
}
