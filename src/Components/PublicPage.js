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
      {/* <Navigation />
      <Main />
      <Footer /> */}
      <div class="temp">
        Text tools are temporarily offline until the launch of our book,{" "}
        <a href="http://www.cuttingplays.com">Cutting Plays for Performance.</a>{" "}
        <a
          class="nav-link"
          href="https://7eb01415.sibforms.com/serve/MUIEANSIBpHX1ebcwI6sCz6rKT9E1gYsq_cQlSr3TuGbDsV6aAx9lsp3YKU_mGdYu5viKpe-80RPz4vZb7py3hn5xhN8g-DozWbOvHR4GHv0_Ua_qYVpyKUKEytxSl_be1APkglNZ0ctaK5baVWx7Pvu5tw0DzrT-sLpBDt7cA00oiopekJzDTkyuxVEvLQP5pT-6Wo9j4V_ZTSq"
          target="_blank"
        >
          Subscribe to our newsletter
        </a>{" "}
        for updates!
      </div>
    </PublicContainer>
  );
};

export default PublicPage;
