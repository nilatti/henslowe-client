import RehearsalScheduleList from "./RehearsalScheduleList";
import { ProductionProvider } from "../../../lib/productionState";

export default function ProductionRehearsalsSchedule() {
  return (
    <ProductionProvider>
      <RehearsalScheduleList />
    </ProductionProvider>
  );
}
