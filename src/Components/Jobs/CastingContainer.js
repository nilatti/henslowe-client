import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Typeahead } from "react-bootstrap-typeahead";
import { Form, FormGroupInline } from "../Form";
import { updateServerItem } from "../../api/crud";
import CastingForm from "../Jobs/CastingForm";
import CastingShow from "../Jobs/CastingShow";

import { buildUserName } from "../../utils/actorUtils";

import { calculateLineCount } from "../../utils/playScriptUtils";
import { createSuper } from "typescript";

// import { ProductionAuthContext } from "../Contexts";

export default function CastingContainer({
  availableActors,
  casting,
  onDeleteClick,
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(
    casting.user
      ? [
          {
            id: casting.user?.id,
            name: buildUserName(casting.user),
          },
        ]
      : []
  );
  let lineCount = casting.character?.new_line_count;

  function handleChangeUser(e) {
    if (e.length > 0) {
      setFormOpen(false);
      setSelectedUser([e[0]]);

      updateJobOnServer(e[0].id);
    }
  }
  function toggleForm() {
    setFormOpen(!formOpen);
  }
  async function updateJobOnServer(actorId) {
    let newCasting = { ...casting, user_id: actorId };
    const response = await updateServerItem(newCasting, "job");

    if (response >= 400) {
      console.log("Error writing casting to server");
    } else {
    }
  }

  return (
    <div key={casting.character.id}>
      {formOpen ? (
        <CastingForm
          availableActors={availableActors}
          casting={casting}
          handleChangeUser={handleChangeUser}
          selectedUser={selectedUser}
          toggleForm={toggleForm}
        />
      ) : (
        <CastingShow
          casting={casting}
          handleEditClick={toggleForm}
          lineCount={lineCount}
          onDeleteClick={onDeleteClick}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
}

//     this.formToggle();
//   }

//   handleFormClose = () => {
//     this.setState({
//       newCastingFormOpen: false,
//     });
//   };

//   onDeleteClick = (castingId) => {
//     this.deleteCasting(castingId);
//   };

//   render() {
//     let lineCount = this.props.casting.character?.new_line_count;
//     let selectedUser = this.state.selectedUser;
//     return (
//       <div>
//         {this.state.editOpen ? (
//           <Form>
//             <Form.Group>
//               <Form.Label>{this.props.casting.character.name}</Form.Label>
//               <Typeahead
//                 id="user"
//                 options={this.props.availableActors}
//                 onBlur={() => {
//                   this.formToggle();
//                 }}
//                 onChange={(selected) => {
//                   this.handleChangeUser(selected);
//                 }}
//                 selected={this.state.selectedUser}
//                 placeholder="Choose actor"
//               />
//               <Form.Control.Feedback type="invalid">
//                 User is required
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Form>
//         ) : (
//           <div>
//             <span>{this.props.casting.character?.name}</span>

//             {lineCount > 0 ? <em> ({lineCount}) </em> : <span> </span>}
//             <ProductionAuthContext.Consumer>
//               {(value) => {
//                 if (value === "admin") {
//                   return (
//                     <span>
//                       {selectedUser.length > 0 ? (
//                         <span onClick={() => this.handleEditClick()}>
//                           {selectedUser[0].name}
//                         </span>
//
