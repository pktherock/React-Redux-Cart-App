import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function PrivateLayout() {
  // console.log("I am private layout");
  return (
    <>
      <Header />
      <h1 className="text-2xl text-center mt-3">
        Built by using React, Redux Toolkit, firebase, tailwind CSS
      </h1>
      <Outlet />
      <Footer />
    </>
  );
}

export default PrivateLayout;
