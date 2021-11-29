import { PageContent } from "./Styled";
import PublicMain from "./PublicMain";
import PublicNavigation from "./PublicNavigation";

const PublicPage = () => {
  return (
    <PageContent>
      <PublicNavigation />
      <PublicMain />
    </PageContent>
  );
};

export default PublicPage;
