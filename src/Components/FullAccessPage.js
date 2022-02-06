import FullAccessMain from "./FullAccessMain.js";
import FullAccessNavigation from "./FullAccessNavigation.js";
import Footer from "./Footer.js";
import { PageContent } from "./Styled.js";

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
