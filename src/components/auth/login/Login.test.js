import 'jsdom-global/register';
import React from 'react';
import Login from './Login';
import { mount ,shallow } from 'enzyme';

describe('<Login/>', () =>{
    it('renders 1 <Login/> component', () =>{
        const component = shallow(<Login/>);
        expect(component).toHaveLength(1);
    });
    describe('it returns props correctly', () =>{
        const component = shallow(<Login name="app"/>);
        expect(component.instance().props.name).toBe('app')
    });
    describe('render two <TextField/> components', () => {
        const component = mount(<Login/>);
        expect(component.find('TextField').length).toBe(2);
    });
    describe('render two <CardMedia/> components', () => {
        const component = mount(<Login/>);
        expect(component.find('CardMedia').length).toBe(1);
    });
    describe('render two <Card/> components', () => {
        const component = mount(<Login/>);
        expect(component.find('Card').length).toBe(1);
    });
    describe('check invalid email', () => {
        const component = mount(<Login/>);
        const input = component.find('input').at(0);

        input.simulate('change', { target: {value: 'Hello'} });
        expect(component.state()['email_error']).toBe('Invalid Email Address')
    });

    describe('check invalid password length', () => {
        const component = mount(<Login/>);
        const input = component.find('input').at(1);

        input.simulate('change', { target: {value: 'Hello'} });
        expect(component.state()['error']).toBe('Password must be more than 6 characters')
    });

    describe('check valid email', () => {
        const component = mount(<Login/>);
        const input = component.find('input').at(0);

        input.simulate('change', { target: {value: 'test@site.com'} });
        expect(component.state()['email_error']).toBe('')
    });

    describe('check valid password length', () => {
        const component = mount(<Login/>);
        const input = component.find('input').at(1);

        input.simulate('change', { target: {value: 'Password'} });
        expect(component.state()['error']).toBe('')
    });


});

