import "../styles/global.css";
import "../styles/navbar.css";
import "../styles/about.css";
import "../styles/banner.css";
import '../styles/custom-carousel.css';
import '../styles/local-activities.css';
import '../styles/footer.css';
// import "../styles/_datepicker.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-pro/css/all.min.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
