import styles from "./layout.module.css"
import { Container} from "react-bootstrap";
import Footer from "./footer";
import CustomNavbar from "./navbar";

export default function Layout({ children, setHash, user }) {
    return <>
        <CustomNavbar setHash={setHash} user={user}/>
        {children}
        <Footer setHash={setHash} />
    </>
}