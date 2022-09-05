import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
