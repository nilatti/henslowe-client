import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StageExitsList from "./StageExitsList.js";
import LoadingModal from "../../LoadingModal.js";
import { getProductionSkeleton } from "../../../api/productions.js";
import { ProductionAuthProvider } from "../../Contexts.js";

export default function SetDesignDashboard() {
  const { productionId } = useParams();
  const [loading, setLoading] = useState(false);
  const [production, setProduction] = useState({});
  useEffect(async () => {
    setLoading(true);
    const response = await getProductionSkeleton(productionId);
    if (response.status >= 400) {
      console.log("error fetching production skeleton");
    } else {
      setProduction(response.data);
    }
    setLoading(false);
  }, []);

  if (loading || !production.id) {
    return <LoadingModal displayText="Loading set design" />;
  }
  return (
    <ProductionAuthProvider productionId={productionId}>
      <h2>
        Set Design Dashboard for{" "}
        <Link to={`/productions/${production.id}`}>
          {production.play?.title}
        </Link>{" "}
        at{" "}
        <Link to={`/theaters/${production.theater.id}`}>
          {production.theater.name}
        </Link>
      </h2>
      <div>Coming soon: Design renderings</div>
      <div>Coming soon: build list</div>
      <div>
        <h3>Stage exits</h3>
        <StageExitsList />
      </div>
    </ProductionAuthProvider>
  );
}
