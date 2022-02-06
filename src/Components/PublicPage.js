import { PageContent } from "./Styled.js";
import Footer from "./Footer.js";
import PublicMain from "./PublicMain.js";
import PublicNavigation from "./PublicNavigation.js";

const PublicPage = () => {
  return (
    <PageContent>
      <PublicNavigation />
      <PublicMain />
      <Footer />
    </PageContent>
  );
};

export default PublicPage;
