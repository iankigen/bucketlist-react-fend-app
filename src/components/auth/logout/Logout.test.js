import 'jsdom-global/register';
import React from 'react';
import Logout from './Logout';
import { shallow } from 'enzyme';

describe('<Logout/>', () =>{
    it('renders 1 <Logout/> component', () =>{
        const component = shallow(<Logout/>);
        expect(component).toHaveLength(1);
    });

});

