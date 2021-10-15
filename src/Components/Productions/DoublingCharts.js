import { ProductionProvider } from "../../lib/productionState";
import DoublingChartContainer from "./DoublingChartContainer";

export default function DoublingCharts() {
  return (
    <ProductionProvider>
      <DoublingChartContainer />
    </ProductionProvider>
  );
}
