import TreeViewMenu from "react-simple-tree-menu";
import { TextSelectStyles } from "./ScriptStyles";
export default function TextSelect({ play, loadText }) {
  if (!play.acts) {
    return <div>Awaiting skeletong</div>;
  }
  const textSelectMenuData = play.acts.map((act) => {
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
      <a onClick={async () => await loadText(`play: ${play.id}`)}>
        Load entire text of {play.title}
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
