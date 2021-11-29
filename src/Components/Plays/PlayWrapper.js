import { PlayProvider, usePlayState } from "../../lib/playState";
import { ProductionAuthProvider } from "../Contexts";
export default function PlayWrapper({ children }) {
  return (
    <PlayProvider>
      <InnerWrapper>{children}</InnerWrapper>
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
