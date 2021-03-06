import "../styles/global.css";
import "../styles/navbar.css";
import "../styles/about.css";
import "../styles/banner.css";
import '../styles/custom-carousel.css';
import '../styles/local-activities.css';
import '../styles/footer.css';
import '../styles/properties.css';
import '../styles/dashboard.css';
import '../styles/activities.css';

import '../styles/StgHeader.css'


// import "../styles/_datepicker.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-pro/css/all.min.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import theme from './../Theme/Theme'

import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>

      <Component {...pageProps} />
    </ChakraProvider>
  )
}
