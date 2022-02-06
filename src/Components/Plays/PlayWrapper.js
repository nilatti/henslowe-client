import { PlayProvider, usePlayState } from "../../lib/playState.js";
import { ProductionAuthProvider } from "../Contexts.js";
import { Route, Routes } from "react-router-dom";

import CharactersBreakdown from "./Characters/CharactersBreakdown.js";
import PartScriptsContainerPaid from "./PlayScripts/PartScripts/PartScriptsContainerPaid.js";
import PlayShow from "./PlayShow.js";
import PlayScript from "./PlayScripts/PlayScript.js";
import TextUnitBreakdown from "./TextUnitBreakdown.js";
import WordCloudContainerPaid from "./PlayScripts/WordClouds/WordCloudContainerPaid.js";

export default function PlayWrapper({ onDeleteClick }) {
  return (
    <PlayProvider>
      <InnerWrapper>
        <Routes>
          <Route
            path={"/"}
            element={<PlayShow onDeleteClick={onDeleteClick} />}
          />
          <Route
            path="/character_breakdown"
            element={<CharactersBreakdown />}
          />
          <Route path="/part_scripts" element={<PartScriptsContainerPaid />} />
          <Route path="/playscript" element={<PlayScript />} />

          <Route path="/text_breakdown" element={<TextUnitBreakdown />} />

          <Route path="/word_clouds" element={<WordCloudContainerPaid />} />
        </Routes>
      </InnerWrapper>
    </PlayProvider>
  );
}

function InnerWrapper({ children }) {
  const { play } = usePlayState();
  return (
    <ProductionAuthProvider productionId={play.production_id}>
      {children}
    </ProductionAuthProvider>
  );
}
