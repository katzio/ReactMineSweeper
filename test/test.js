import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Game from '../src/Components/Game';
import Grid from '../src/Components/Grid';
import Controls from '../src/Components/Controls';
import Row from '../src/Components/Row';
import Cell from '../src/Components/Cell';


describe('<Game />', () => {
  it('renders a <Grid /> component', () => {
    const grid = shallow(<Grid />);
    expect(grid.find(Grid)).to.have.length(1);
  });

  it('renders a <Controls /> component', () => {
    const controls = shallow(<Controls />);
    expect(controls.find(controls)).to.have.length(1);
  });
});