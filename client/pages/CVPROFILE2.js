import React from "react";
//import "./App.css";
import Resume from "../components/Resume";
import "bootstrap/dist/css/bootstrap.min.css";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Navbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footers/Footer.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
     marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function CVPROFILE2 () {
  const classes = useStyles();
    return (
      <> 
      
      



<Navbar transparent />
<main className="profile-page">
  <section className="relative block h-500-px">
    <div
      className="absolute top-0 w-full h-full bg-center bg-cover"
      style={{
        backgroundImage:
          "url('/TR_Resumes_Feature.png')",
      }}
    >
      <span
        id="blackOverlay"
        className="w-full h-full absolute opacity-50 bg-black"
      ></span>
    </div>
    <div
      className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
      style={{ transform: "translateZ(0)" }}
    >
      <svg
        className="absolute bottom-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 2560 100"
        x="0"
        y="0"
      >
        <polygon
          className="text-blueGray-200 fill-current"
          points="2560 0 2560 100 0 100"
        ></polygon>
      </svg>
    </div>
  </section>
  <section className="relative py-40 bg-blueGray-200">
    <div className="container mx-auto px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src="/img/team-2-800x800.jpg"
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">

            </div>
            <div className="w-full lg:w-4/12 px-4 lg:order-1">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">


                </div>
                <div className="mr-4 p-3 text-center">

                </div>
                <div className="lg:mr-4 p-3 text-center">

                </div>
              </div>
            </div>
          </div>
         

          <div className="App">
           
           <Resume />
          </div>


         

        </div>
      </div>
    </div>
  </section>
</main>
<Footer />
</>
    );
  }

export default CVPROFILE2;
