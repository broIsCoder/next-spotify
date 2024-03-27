import Sidebar from "@/components/Sidebar";
import Songbar from "@/components/Songbar";
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";

const layout = ({ children }) => {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col gap-2 bg-black p-2">
      <Container>{children}</Container>
      <div className="bg-amber-800 h-[13vh] rounded-md overflow-hidden">
        <Songbar />
      </div>
    </div>
  );
};

export default layout;
