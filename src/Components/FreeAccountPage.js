import FreeAccountMain from "./FreeAccountMain";
import FreeAccountNavigation from "./FreeAccountNavigation";
import { PageContent } from "./Styled";

const FreeAccountPage = () => {
  return (
    <PageContent>
      <FreeAccountNavigation />
      <FreeAccountMain />
    </PageContent>
  );
};

export default FreeAccountPage;
