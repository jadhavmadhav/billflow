import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FooterMenu from "./components/footerMenu";
import About from "./pages/about";
import Home from "./pages/home";
import Experience from "./pages/Experience";
import Contact from "./pages/contact";

function App() {
  return (

    <div className="container mx-auto xl:w-[768px] h-[100%] bg-fixed  bg-slate-700 text-white relative">
      {/* <div className="absolute h-[100%] w-[100%]"> */}

        <Home />
        <About />
        <Experience />
        <FooterMenu />
        <Contact />
      {/* </div> */}
    </div>

  );
}

export default App;
