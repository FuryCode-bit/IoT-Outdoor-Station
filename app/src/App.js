import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from './pages/main/Main';
import Graficos from './pages/displayData/Graficos';

function App() {

  const [debug, setDebug] = useState(false);

  return (
    <Container fluid className="p-0" id="mainContainer" style={{border: debug ? "3px solid red" : "none", overflowX: "hidden"}}>
      <div className="overlay">
        {debug ? <h3>Debug Mode</h3> : null}
      </div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/listagem" element={<Main />} />
          <Route exact path="/" element={<Graficos teste={debug}/>} />
          <Route exact path="/*" element={<Graficos teste={debug}/>} />
        </Routes>
      </BrowserRouter>
  </Container>
  );
}

export default App;
