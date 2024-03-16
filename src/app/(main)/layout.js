import Sidebar from "@/components/Sidebar";
import Songbar from "@/components/Songbar";
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";

const layout = ({ children }) => {

return (
  <div className="h-[100vh] w-[100vw] flex flex-col gap-2 bg-black p-2 overflow-hidden">
    <div className="flex h-[87vh] w-full gap-2 relative overflow-hidden">
        <Sidebar />
      <div className="h-full w-full overflow-hidden rounded-md relative bg-green-700">
        <div className="h-[8vh] absolute w-full top-0">
          <Navbar />
        </div>
        <div className="h-full w-full flex">
          <Container>
          {children}
          </Container>
          </div>
      </div>
    </div>
    <div className="bg-amber-800 h-[13vh] rounded-md overflow-hidden">
      <Songbar />
    </div>
  </div>
);
};

export default layout;
