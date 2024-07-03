import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from '../../components/header/Header';
import Leitura from '../../components/leitura/Leitura';
import api from "./../../api/api"
import TabelaLeituras from "./../displayData/TabelaLeituras"

function Main() {

    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/items");
                setData(response.data);
            } catch (error) {
                setError(error);
                console.error('There was an error!', error);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data.length) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid className="p-0">
            <Header />
            <Row>
                <Col sm="12" md="12" lg="12" style={{ display: "flex", flexDirection: 'column', alignItems: "center", padding: "20px" }}>
                    <TabelaLeituras leiturasLista={data} />
                </Col>
            </Row>
        </Container>
    )
}

export default Main;


