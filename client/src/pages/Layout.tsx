import Navbar from "../components/Navbar";
import TWFooter from "../components/TWFooter";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-between body h-screen">
      <div className="flex flex-col">
        <Navbar />
        <div className="md:mx-10">{children ? children : <div></div>}</div>
      </div>
      <TWFooter />
    </div>
  );
};

export default Layout;
