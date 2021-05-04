import RehearsalScheduleList from "./RehearsalScheduleList";
import { ProductionProvider } from "../../../lib/productionState";

export default function ProductionRehearsalsSchedule() {
  return (
    <ProductionProvider>
      <RehearsalScheduleList />
    </ProductionProvider>
  );
}

//   async createRehearsal(productionId, rehearsal) {
//     const response = await createItemWithParent(
//       "production",
//       productionId,
//       "rehearsal",
//       rehearsal
//     );
//     if (response.status >= 400) {
//       this.setState({
//         errorStatus: "Error creating character",
//       });
//     } else {
//       let newRehearsals = _.sortBy(
//         [...this.state.rehearsals, response.data],
//         function (rehearsal) {
//           return new Date(rehearsal.start_time);
//         }
//       );
//       this.setState({
//         rehearsals: newRehearsals,
//       });
//     }
//   }

//   async loadProduction(productionId) {
//     const response = await getItem(productionId, "production");
//     if (response.status >= 400) {
//       this.setState({
//         errorStatus: "Error retrieving production",
//       });
//     } else {
//       let rehearsals = _.sortBy(response.data.rehearsals, function (rehearsal) {
//         return new Date(rehearsal.start_time);
//       });
//       this.setState(
//         {
//           production: response.data,
//           rehearsals: response.data.rehearsals,
//         },
//         function () {
//           this.setUserAuth(
//             JSON.parse(window.localStorage.getItem("user")),
//             this.state.production
//           );
//         }
//       );
//     }
//   }

//
//   }
// }

// export default ProductionRehearsalSchedule;
