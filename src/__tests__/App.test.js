import renderer from 'react-test-renderer'
import React from 'react'
import App from './App';
import MockRouter from 'react-mock-router';

it('should render correctly', () => {
  const component = renderer.create(
    <MockRouter>
      <App />
    </MockRouter>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
