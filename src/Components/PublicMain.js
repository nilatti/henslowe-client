import { Link, Routes, Route } from "react-router-dom";
import { InfoBanner } from "./Styled.js";
import Casting from "./Free/Casting.js";
import Subscriptions from "./Orders/Subscriptions.js";
import CutPlays from "./Free/CutPlays.js";
import Double from "./Free/Double.js";
import FrequentlyAskedQuestions from "./Info/FrequentlyAskedQuestions.js";
import FolgerSituation from "./Orders/FolgerSituation.js";
import GettingStarted from "./Info/GettingStarted.js";
import Help from "./Info/Help.js";
import OrderSuccess from "./Orders/OrderSuccess.js";
import PartScripts from "./Free/PartScripts.js";
import PricingIndividual from "./Orders/PricingIndividual.js";
import PricingInstitutional from "./Orders/PricingInstitutional.js";
import Welcome from "./Free/Welcome.js";
import WordCloud from "./Free/WordCloud.js";
import { PlayProvider } from "../lib/freePlayState.js";

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
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/casting" element={<Casting />} />
        <Route path="/faq" element={<FrequentlyAskedQuestions />} />
        <Route path="/getting-started" element={<GettingStarted />} />
        <Route path="/help" element={<Help />} />
        <Route path="/cut" element={<CutPlays />} />
        <Route path="/doubling" element={<Double />} />
        <Route path="/folger" element={<FolgerSituation />} />
        <Route path="/part-scripts" element={<PartScripts />} />
        <Route path="/pricing-individual" element={<PricingIndividual />} />
        <Route
          path="/pricing-institutional"
          element={<PricingInstitutional />}
        />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/wordcloud" element={<WordCloud />} />
      </Routes>
    </PlayProvider>
  );
}
