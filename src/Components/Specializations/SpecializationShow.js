import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SpecializationProfileForAdmin from "./SpecializationProfileForAdmin.js";
import SpecializationProfileForVisitor from "./SpecializationProfileForVisitor.js";
import LoadingModal from "../LoadingModal.js";
import { useSuperAuthState } from "../Contexts.js";
import SpecializationJobsList from "../Jobs/SpeciailzationJobsList.js";
import { Profile } from "../Styled.js";
import { getItem, updateServerItem } from "../../api/crud.js";

export default function SpecializationShow({ onDeleteClick }) {
  const { role } = useSuperAuthState();
  const { specializationId } = useParams();
  const [loading, setLoading] = useState(false);
  const [specialization, setSpecialization] = useState();
  useEffect(async () => {
    setLoading(true);
    let response = await getItem(specializationId, "specialization");
    if (response.status >= 400) {
      console.log("error getting specialization");
    } else {
      setSpecialization(response.data);
    }
    setLoading(false);
  }, []);

  async function updateSpecialization(specialization) {
    let response = await updateServerItem(specialization, "specialization");
    if (response.status >= 400) {
      console.log("error updating specialization");
    } else {
      setSpecialization(response.data);
    }
  }

  if (loading || !specialization) {
    return <LoadingModal displayText="loading specialization" />;
  }
  return (
    <Profile>
      {role === "superadmin" ? (
        <SpecializationProfileForAdmin
          onDeleteClick={onDeleteClick}
          specialization={specialization}
          updateSpecialization={updateSpecialization}
        />
      ) : (
        <SpecializationProfileForVisitor specialization={specialization} />
      )}
      <SpecializationJobsList jobs={specialization.jobs} />
    </Profile>
  );
}
