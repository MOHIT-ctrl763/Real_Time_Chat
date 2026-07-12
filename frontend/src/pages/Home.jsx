import GetCurrentUser from "../hooks/getCurrentUser";
import GetOtherUsers from "../hooks/getOtherUsers";

function Home() {

  GetCurrentUser();
  GetOtherUsers();

  return (
    <>
      {/* Your Home UI */}
    </>
  );
}

export default Home;