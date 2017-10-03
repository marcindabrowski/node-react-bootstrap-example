import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from '../../components';
import AnimatedView from '../../components/animatedView/AnimatedView';

const Home = () => (
  <AnimatedView>
    <Jumbotron>
      <h1>At this page you can register a travel insurance claim.</h1>
      <h2>To login use this credentials:</h2>
      <p>
        <em>Login:</em> demo@example.com<br />
        <em>Password:</em> 12345678
      </p>
      <p>
        <Link className="btn btn-success btn-lg" to={'/registerClaim'}>
          Register claim
        </Link>
      </p>
    </Jumbotron>
  </AnimatedView>
);

export default Home;
