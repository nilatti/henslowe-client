import styled from "styled-components";
import Footer from "./Footer";
import Main from "./Main";
import Navigation from "./Navigation";
const PrivateContainer = styled.div`
  margin-top: 75px;
  width: 100%;
  @media screen and (min-width: 600px) {
    margin-top: 150px;
    width: 85%;
    h2 {
      text-align: center;
    }
  }
`;
const PrivatePage = () => {
  return (
    <PrivateContainer>
      <h2>Henslowe's Cloud</h2>
      <Navigation />
      <Main />
      <Footer />
    </PrivateContainer>
  );
};

export default PrivatePage;
