import "../styles/global.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "react-nice-dates/build/style.css";

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}