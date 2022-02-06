import RehearsalScheduleList from "./RehearsalScheduleList.js";
import { ProductionProvider } from "../../../lib/productionState.js";

export default function ProductionRehearsalsSchedule() {
  return (
    <ProductionProvider>
      <RehearsalScheduleList />
    </ProductionProvider>
  );
}
