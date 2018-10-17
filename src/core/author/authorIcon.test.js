import React from 'react';

import renderer from 'react-test-renderer';
import {AuthorIcon} from "./authorIcon";
import {AuthorModel} from "./author.model";
import {TestHelper} from "../test.helper";

describe('testing author icon', () => {
  const context = {};
  const author = new AuthorModel(1, 'John', 'Doe');

  beforeEach(() => {
    context.author = author;
  });

  afterEach(() => {
    TestHelper.clearContext(context);
  });

  test('AuthorIcon', () => {
    const spy = jest.spyOn(context.author, 'toString');
    const component = renderer.create(
      <AuthorIcon author={context.author} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(spy.mock.calls.length).toBe(2);

    spy.mockRestore();
  });
});
