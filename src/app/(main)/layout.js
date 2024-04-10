import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
import Container from "@/components/Container";
import Playlists from "@/components/Playlists";
import Artists from "@/components/Artists";

const layout = ({ children }) => {
  return (
    <div className="h-[100dvh] w-[100vw] flex flex-col gap-2 bg-black p-2">
      <Container>
        <Sidebar>
          <Playlists />
          <Artists />
        </Sidebar>
        {children}
      </Container>
      <div className="bg-black h-[13vh] rounded-md overflow-hidden">
        <Player />
      </div>
    </div>
  );
};

export default layout;
