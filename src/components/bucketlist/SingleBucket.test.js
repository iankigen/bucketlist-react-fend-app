import 'jsdom-global/register';
import React from 'react';
import SingleBucket from './SingleBucket';
import { mount ,shallow } from 'enzyme';

describe('<SingleBucket/>', () =>{
    it('renders 1 <SingleBucket/> component', () =>{
        const component = shallow(<SingleBucket/>);
        expect(component).toHaveLength(1);
    });
    describe('it returns props correctly', () =>{
        const component = shallow(<SingleBucket name="app"/>);
        expect(component.instance().props.name).toBe('app')
    });
    describe('render one <TextField/> components', () => {
        const component = shallow(<SingleBucket/>);
        expect(component.find('TextField').length).toBe(1);
    });
    describe('render one <Dialog/> components', () => {
        const component = shallow(<SingleBucket/>);
        expect(component.find('Dialog').length).toBe(1);
    });
    describe('render one <Snackbar/> components', () => {
        const component = shallow(<SingleBucket/>);
        expect(component.find('Snackbar').length).toBe(1);
    });
    describe('render one <Card/> components', () => {
        const component = shallow(<SingleBucket/>);
        expect(component.find('Card').length).toBe(1);
    });
    describe('render one <CardText/> components', () => {
        const component = shallow(<SingleBucket/>);
        expect(component.find('CardText').length).toBe(1);
    });
    describe('render three <FlatButton/> components', () => {
        const component = shallow(<SingleBucket/>);
        expect(component.find('FlatButton').length).toBe(3);
    });
    describe('render one <CardHeader/> components', () => {
        const component = shallow(<SingleBucket/>);
        expect(component.find('CardHeader').length).toBe(1);
    });

});

