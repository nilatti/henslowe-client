import { deleteItem, getItem, updateServerItem } from "../../api/crud";
import ProductionShow from "./ProductionShow";
import { Spinner } from "../Loaders";
import Modal from "../Modal";
import { useProductionState } from "../../lib/productionState";

export default function EditableProduction({ onDeleteClick }) {
  const { loading, production } = useProductionState();

  async function updateServerProduction(production) {
    const response = await updateServerItem(production, "production");
    if (response.status >= 400) {
      console.log("Error updating production");
    } else {
      setProduction(response.data);
    }
  }

  function handleSubmit(production) {
    updateServerProduction(production);
    setEditFormOpen(false);
  }
  if (loading && !production) {
    return (
      <Modal>
        <h1>Loading production</h1>
        <Spinner />
      </Modal>
    );
  } else {
    return (
      <ProductionShow
        onDeleteClick={onDeleteClick}
        onFormSubmit={handleSubmit}
      />
    );
  }
}
