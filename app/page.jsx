import Image from "next/image";
import Blogs from "./Blogs/Blogs";

export default function Home() {
  return (
    <>
    <h1 className=" text-orange-600 text-3xl font-extrabold text-center p-2">Abuissalancers's Task</h1>
    
    <Blogs/>
    </>
  );
}
