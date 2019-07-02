import React from 'react';
import {Jumbotron as Jumbo, Container} from 'react-bootstrap';

export const Jumbotron = () => (
  
<Jumbo fluid className="jumbo">
    <div className="overlay"></div>
    <Container>
        <h1>Fuel Rates & Predictions</h1>
        <p>Find Current Fuel Rates & Predictions in Your City!</p>  
    </Container>
</Jumbo>

)
