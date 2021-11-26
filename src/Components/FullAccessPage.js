import FullAccessMain from "./FullAccessMain";
import FullAccessNavigation from "./FullAccessNavigation";
import { PageContent } from "./Styled";

const FullAccessPage = () => {
  return (
    <PageContent>
      <FullAccessNavigation />
      <FullAccessMain />
    </PageContent>
  );
};

export default FullAccessPage;
