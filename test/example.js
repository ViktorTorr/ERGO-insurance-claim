import React from 'react';
// import { expect } from 'chai';
import { shallow } from 'enzyme';
// import sinon from 'sinon';

import ClaimForm from './src/ClaimForm';
// import Foo from './Foo';

const wrapper = shallow(<ClaimForm />);
expect(wrapper.props().data).toBe('something');