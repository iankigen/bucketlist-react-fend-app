import 'jsdom-global/register';
import React from 'react';
import Footer from './Footer';
import Nav from './Nav';
import { mount ,shallow } from 'enzyme';

describe('<Footer/>', () =>{
    it('renders 1 <Footer/> component', () =>{
        const component = shallow(<Footer/>);
        expect(component).toHaveLength(1);
    });
    describe('it returns props correctly', () =>{
        const component = shallow(<Footer name="app"/>);
        expect(component.instance().props.name).toBe('app')
    });

});

