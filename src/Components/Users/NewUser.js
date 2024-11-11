import UserForm from "./UserForm";

export default function NewUser({ onFormClose, onFormSubmit }) {
  return (
    <>
      <h1>Register New User</h1>
      <UserForm onFormSubmit={onFormSubmit} onFormClose={onFormClose} />
    </>
  );
}
