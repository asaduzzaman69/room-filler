import styles from "./layout.module.css"
import { Container} from "react-bootstrap";
import Footer from "./footer";
import CustomNavbar from "./navbar";
import StgFooter from "./StgFooter";
import StgHeader from "./StgHeader";

export default function Layout({ children, setHash, user }) {
    return <>
        {/*  <CustomNavbar setHash={setHash} user={user}/> */}

        <StgHeader cssStyle={{ p: '36px 60px' }} />
        {children}

        <StgFooter />
        {/*         <Footer setHash={setHash} />
 */}    </>
}