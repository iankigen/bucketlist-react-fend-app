import 'jsdom-global/register';
import React from 'react';
import SignUp from './SignUp';
import { mount ,shallow } from 'enzyme';

describe('<SignUp/>', () =>{
    it('renders 1 <SignUp/> component', () =>{
        const component = shallow(<SignUp/>);
        expect(component).toHaveLength(1);
    });
    describe('it returns props correctly', () =>{
        const component = shallow(<SignUp name="app"/>);
        expect(component.instance().props.name).toBe('app')
    });
    describe('render three <TextField/> components', () => {
        const component = mount(<SignUp/>);
        expect(component.find('TextField').length).toBe(3);
    });
    describe('render two <CardMedia/> components', () => {
        const component = mount(<SignUp/>);
        expect(component.find('CardMedia').length).toBe(1);
    });
    describe('render two <Card/> components', () => {
        const component = mount(<SignUp/>);
        expect(component.find('Card').length).toBe(1);
    });
    describe('check invalid email', () => {
        const component = mount(<SignUp/>);
        const input = component.find('input').at(0);

        input.simulate('change', { target: {value: 'Hello'} });
        expect(component.state()['email_error']).toBe('Invalid Email Address')
    });

    describe('check invalid password length', () => {
        const component = mount(<SignUp/>);
        const input = component.find('input').at(1);

        input.simulate('change', { target: {value: 'Hello'} });
        expect(component.state()['error']).toBe('Password must be more than 6 characters')
    });

    describe('check valid email', () => {
        const component = mount(<SignUp/>);
        const input = component.find('input').at(0);

        input.simulate('change', { target: {value: 'test@site.com'} });
        expect(component.state(['error'])).toBe('')
    });

    describe('check valid password length', () => {
        const component = mount(<SignUp/>);
        const input = component.find('input').at(1);

        input.simulate('change', { target: {value: 'Password'} });
        expect(component.state()['error']).toBe('')
    });


});

