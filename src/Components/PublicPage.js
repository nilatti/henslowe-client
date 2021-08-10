import styled from "styled-components";

import Footer from "./Free/Footer";
import Main from "./Free/Main";
import Navigation from "./Free/Navigation";

const PublicContainer = styled.div`
  margin-top: 75px;
  width: 100%;
  @media screen and (min-width: 600px) {
    margin-top: 300px;
    width: 85%;
    h2 {
      text-align: center;
    }
  }
`;
const PublicPage = () => {
  return (
    <PublicContainer>
      <h2>Henslowe's Cloud</h2>
      <Navigation />
      <Main />
      <Footer />
    </PublicContainer>
  );
};

export default PublicPage;
