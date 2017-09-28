import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from '../../components';
import AnimatedView from '../../components/animatedView/AnimatedView';

const Home = () => (
  <AnimatedView>
    <Jumbotron>
      <h1>At this page you can register a travel insurance claim.</h1>
      <p>
        <Link
          className="btn btn-success btn-lg"
          to={'/registerClaim'}
        >
              Register claim
        </Link>
      </p>
    </Jumbotron>
  </AnimatedView>
);

export default Home;
