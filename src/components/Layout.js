import Head from "next/head";
import Navbar from "./Navbar/Navbar";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Post App</title>
    </Head>
    <Navbar />
    {children}
  </>
);

export default Layout;
