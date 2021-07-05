import styled from "styled-components";
import TreeViewMenu from "react-simple-tree-menu";

const TextSelectStyles = styled.div`
  flex: 1 0 15%;
  padding-right: 15px;
  .rstm-tree-item {
    display: flex;
    padding: 2px;
  }
  .rstm-tree-item-level2 {
    padding-left: 4.25rem !important;
  }
  .rstm-tree-item--active,
  .rstm-tree-item--focused {
    background-color: var(--color-light);
  }
  .rstm-toggle-icon {
    padding: 0 7px;
  }
`;
export default function TextSelect({ playSkeleton, loadText }) {
  if (!playSkeleton.acts) {
    return <div>Awaiting skeletong</div>;
  }
  const textSelectMenuData = playSkeleton.acts.map((act) => {
    let scenes = act.scenes.map((scene) => {
      let frenchScenes = scene.french_scenes.map((frenchScene) => {
        return {
          key: frenchScene.id,
          label: `${act.number}.${scene.number}.${frenchScene.number}`,
        };
      });
      return {
        key: scene.id,
        label: `${act.number}.${scene.number}`,
        nodes: frenchScenes,
      };
    });
    return {
      key: act.id,
      label: `Act ${act.number}`,
      nodes: scenes,
    };
  });

  return (
    <TextSelectStyles>
      <a onClick={async () => await loadText(`play: ${playSkeleton.id}`)}>
        Load entire text of {playSkeleton.title}
      </a>
      <TreeViewMenu
        data={textSelectMenuData}
        onClickItem={async ({ key, label, ...props }) => {
          await loadText(key);
        }}
      />
    </TextSelectStyles>
  );
}
