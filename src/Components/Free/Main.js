import { useBeforeunload } from "react-beforeunload";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Casting from "./Casting";
import CutPlays from "./CutPlays";
import Double from "./Double";
import PartScripts from "./PartScripts";
import Welcome from "./Welcome";
import WordCloud from "./WordCloud";
import { PlayProvider } from "../../lib/freePlayState";

const MainStyle = styled.div`
  width: 100%;
`;

export default function Main() {
  // useBeforeunload(() => "You’ll lose your data!");
  return (
    <PlayProvider>
      <MainStyle>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/casting" component={Casting} />
          <Route exact path="/cut" component={CutPlays} />
          <Route exact path="/doubling" component={Double} />
          <Route exact path="/part-scripts" component={PartScripts} />
          <Route exact path="/wordcloud" component={WordCloud} />
        </Switch>
      </MainStyle>
    </PlayProvider>
  );
}
