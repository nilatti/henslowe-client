import { ProductionProvider } from "../../lib/productionState.js";
import DoublingChartContainer from "./DoublingChartContainer.js";

export default function DoublingCharts() {
  return (
    <ProductionProvider>
      <DoublingChartContainer />
    </ProductionProvider>
  );
}
