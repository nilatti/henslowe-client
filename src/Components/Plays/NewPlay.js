import PlayForm from "./PlayForm";

export default function NewPlay({ onFormSubmit }) {
  function handleFormClose() {
    history.push("/plays");
  }
  function handleFormSubmit(play) {
    onFormSubmit(play);
  }
  return (
    <div id="new-play-form">
      <PlayForm
        isOnAuthorPage={false}
        onFormSubmit={handleFormSubmit}
        onFormClose={handleFormClose}
      />
    </div>
  );
}
