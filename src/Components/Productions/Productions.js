import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

import ProductionWrapper from "./ProductionWrapper.js";
import ProductionsList from "./ProductionsList.js";

import NewProductionForm from "./NewProductionForm.js";
import { createItem, deleteItem } from "../../api/crud.js";
import { useQuery } from "../../hooks/environmentUtils.js";
export default function Productions() {
  const navigate = useNavigate();
  let query = useQuery();
  const [errors, setErrors] = useState([]);

  async function createProduction(production) {
    const response = await createItem(production, "production");
    if (response.status >= 400) {
      console.log("Error creating Production");
    } else {
      navigate(`/productions/${response.data.id}`);
    }
  }

  async function deleteProduction(productionId) {
    const response = await deleteItem(productionId, "production");
    if (response.status >= 400) {
      console.log("Error deleting Production");
    } else {
      navigate("/productions");
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
          <Routes>
            <Route
              path="/new"
              element={
                <NewProductionForm
                  playId={parseInt(query.get("playId"))}
                  theaterId={parseInt(query.get("theaterId"))}
                  onFormSubmit={handleCreateFormSubmit}
                />
              }
            />
            <Route path="/:productionId/*" element={<ProductionWrapper />} />
            <Route
              path="/"
              element={<ProductionsList />}
              onDeleteClick={handleDeleteClick}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}
