import React from 'react';
import { Jumbotron } from '../../components';
import AnimatedView from '../../components/animatedView/AnimatedView';

const PageNotFound = () => (
  <AnimatedView>
    <Jumbotron>
      <h1>
            Sorry this page does not exists...
      </h1>
    </Jumbotron>
  </AnimatedView>
);

export default PageNotFound;
