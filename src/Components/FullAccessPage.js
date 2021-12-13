import FullAccessMain from "./FullAccessMain";
import FullAccessNavigation from "./FullAccessNavigation";
import Footer from "./Footer";
import { PageContent } from "./Styled";

const FullAccessPage = () => {
  return (
    <PageContent>
      <FullAccessNavigation />
      <FullAccessMain />
      <Footer />
    </PageContent>
  );
};

export default FullAccessPage;
