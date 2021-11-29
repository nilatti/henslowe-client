import { useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";

import DoublingCharts from "./DoublingCharts";
import ProductionWrapper from "./ProductionWrapper";
import ProductionShow from "./ProductionShow";
import ProductionsList from "./ProductionsList";
import ProductionRehearsalSchedule from "./RehearsalSchedule/ProductionRehearsalSchedule";
import SetDesignDashboard from "./SetDesign/SetDesignDashboard";

import NewProductionForm from "./NewProductionForm";
import { createItem, deleteItem } from "../../api/crud";
import { useQuery } from "../../hooks/environmentUtils";
export default function Productions() {
  const history = useHistory();
  let query = useQuery();
  const [errors, setErrors] = useState([]);

  async function createProduction(production) {
    const response = await createItem(production, "production");
    if (response.status >= 400) {
      console.log("Error creating Production");
    } else {
      history.push(`/productions/${response.data.id}`);
    }
  }

  async function deleteProduction(productionId) {
    const response = await deleteItem(productionId, "production");
    if (response.status >= 400) {
      console.log("Error deleting Production");
    } else {
      history.push("/productions");
    }
  }
  function handleCreateFormSubmit(production) {
    createProduction(production);
  }

  function handleDeleteClick(productionId) {
    deleteProduction(productionId);
  }

  return (
    <>
      <div>
        <div id="productions">
          <h2>
            <Link to="/productions">Productions</Link>
          </h2>
          <hr />
          <Switch>
            <Route
              path="/productions/new"
              render={(props) => (
                <NewProductionForm
                  playId={parseInt(query.get("playId"))}
                  theaterId={parseInt(query.get("theaterId"))}
                  onFormSubmit={handleCreateFormSubmit}
                />
              )}
            />

            <Route
              path={`/productions/:productionId/doubling_charts/`}
              component={DoublingCharts}
            />
            <Route
              path={`/productions/:productionId/rehearsal-schedule`}
              render={(props) => (
                <ProductionWrapper {...props}>
                  <ProductionRehearsalSchedule />
                </ProductionWrapper>
              )}
            />
            <Route path={`/productions/:productionId/set`}>
              <SetDesignDashboard />
            </Route>
            <Route
              path={`/productions/:productionId`}
              render={(props) => (
                <ProductionWrapper {...props}>
                  <ProductionShow />
                </ProductionWrapper>
              )}
            />
            <Route
              path="/productions/"
              component={ProductionsList}
              onDeleteClick={handleDeleteClick}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}
