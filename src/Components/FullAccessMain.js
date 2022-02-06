import { Routes, Route } from "react-router-dom";
import ErrorMessages from "./ErrorMessages.js";
import IndividualAccount from "./Accounts/IndividualAccount.js";
import Authors from "./Authors/Authors.js";
import Dashboard from "./Dashboard/Dashboard.js";
import Help from "./Info/Help.js";
import GettingStarted from "./Info/GettingStarted.js";
import Plays from "./Plays/Plays.js";
import Subscriptions from "./Orders/Subscriptions.js";
import PricingIndividual from "./Orders/PricingIndividual.js";
import OrderSuccess from "./Orders/OrderSuccess.js";
import Productions from "./Productions/Productions.js";
import Spaces from "./Spaces/Spaces.js";
import Specializations from "./Specializations/Specializations.js";
import Theaters from "./Theaters/Theaters.js";
import Users from "./Users/Users.js";
import FrequentlyAskedQuestions from "./Info/FrequentlyAskedQuestions.js";
export default function FullAccessMain() {
  return (
    <>
      <ErrorMessages />
      <Routes>
        <Route path="/account" element={<IndividualAccount />} />
        <Route path="/authors/*" element={<Authors authorFormOpen={false} />} />
        <Route path="/faq" element={<FrequentlyAskedQuestions />} />
        <Route path="/getting-started" element={<GettingStarted />} />
        <Route path="/help" element={<Help />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/plays/*" element={<Plays />} />
        <Route path="/productions/*" element={<Productions />} />
        <Route path="/pricing-individual" element={<PricingIndividual />} />
        <Route path="/theaters/*" element={<Theaters />} />
        <Route path="/spaces/*" element={<Spaces />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="/specializations/*" element={<Specializations />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}
