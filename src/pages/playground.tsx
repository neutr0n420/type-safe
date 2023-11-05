import Navbar from "@/components/ui/Navbar";
import { SessionProvider } from "next-auth/react";

const Playground = () => {
  return (
    <SessionProvider>
      <div>
        <Navbar />
        <hr />
        <h1 className="text-center text-8xl mt-44">Comming Soon!</h1>
      </div>
    </SessionProvider>
  );
};
export default Playground;
