import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../../components/_index";
import "../../styles/request.css";
import { Container } from "@mui/material";
import { FrameSVG } from "../../assets/svg/_index";

const RootLayout: React.FC = () => {
    return <>
        <Navbar />
        <Container sx={{ position: "relative", zIndex: 1 }} >
            <div className="sticks">
                <div className="right"><FrameSVG /></div>
                <div className="left"><FrameSVG /></div>
            </div>
            <Outlet />
        </Container>
        <Footer />
    </>
}

export default RootLayout;