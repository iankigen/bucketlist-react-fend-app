import 'jsdom-global/register';
import React from 'react';
import Bucketlist from './Bucketlist';
import { mount ,shallow } from 'enzyme';

describe('<Bucketlist/>', () =>{
    it('renders 1 <Bucketlist/> component', () =>{
        const component = shallow(<Bucketlist/>);
        expect(component).toHaveLength(1);
    });
    describe('it returns props correctly', () =>{
        const component = shallow(<Bucketlist name="app"/>);
        expect(component.instance().props.name).toBe('app')
    });
    describe('render three <TextField/> components', () => {
        const component = shallow(<Bucketlist/>);
        expect(component.find('TextField').length).toBe(3);
    });
    describe('render one <FloatingActionButton/> components', () => {
        const component = shallow(<Bucketlist/>);
        expect(component.find('FloatingActionButton').length).toBe(1);
    });
    describe('render three <Dialog/> components', () => {
        const component = shallow(<Bucketlist/>);
        expect(component.find('Dialog').length).toBe(3);
    });

});

