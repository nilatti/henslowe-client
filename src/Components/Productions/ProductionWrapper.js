import { useParams } from "react-router";
import { Route, Routes } from "react-router-dom";
import DoublingCharts from "./DoublingCharts.js";
import ProductionShow from "./ProductionShow.js";
import ProductionRehearsalSchedule from "./RehearsalSchedule/ProductionRehearsalSchedule.js";
import SetDesignDashboard from "./SetDesign/SetDesignDashboard.js";
import { ProductionAuthProvider } from "../Contexts.js";
import { ProductionProvider } from "../../lib/productionState.js";

export default function ProductionWrapper() {
  const { productionId } = useParams();
  return (
    <ProductionAuthProvider productionId={productionId}>
      <ProductionProvider>
        <Routes>
          <Route path={`/doubling_charts/`} element={<DoublingCharts />} />
          <Route
            path={`/rehearsal-schedule`}
            element={<ProductionRehearsalSchedule />}
          />
          <Route path={`/set`} element={<SetDesignDashboard />} />
          <Route path={`/`} element={<ProductionShow />} />
        </Routes>
      </ProductionProvider>
    </ProductionAuthProvider>
  );
}
