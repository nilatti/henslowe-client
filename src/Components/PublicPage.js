import { PageContent } from "./Styled";
import Footer from "./Footer";
import PublicMain from "./PublicMain";
import PublicNavigation from "./PublicNavigation";

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
