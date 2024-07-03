import React from 'react';
import './header.css';
import { Row, Col } from 'reactstrap';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import logo from "./logoPNG.png"

function Header() {
    const navigate = useNavigate();

    return (
        <Row className="headerInitial">
          <Row className='headerContent'>
            <Col xs={12} md={4} lg={4}/>
                <Col xs={12} md={4} lg={4} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {/* <h2 style={{ color: "#FFF", marginBottom: 0 }}>RURAL THINGS</h2>
                    <h4 style={{ color: "#FFF", marginTop: 0, marginLeft: 5 }}>(Outdoor Station)</h4> */}
                    <img src={logo} style={{width: "70%"}} alt="RURAL THINGS" />
                </Col>
                <Col xs={12} md={4} lg={4} style={{display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    <Button variant="text" onClick={() => navigate("/")} style={{ color: "#fff", margin: "0 10px", backgroundColor: "darkBlue" }}>
                        Dashboard
                    </Button>
                    <Button variant="text" onClick={() => navigate("/listagem")} style={{ color: "#fff", margin: "0 10px", backgroundColor: "darkBlue" }}>
                        Listagem
                    </Button>
                </Col>
            </Row>
        </Row>
    );
}

export default Header;
