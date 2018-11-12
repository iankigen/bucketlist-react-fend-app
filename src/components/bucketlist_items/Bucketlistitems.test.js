import 'jsdom-global/register';
import React from 'react';
import BucketlistItems from './Bucketlistitems';
import { mount ,shallow } from 'enzyme';

describe('<BucketlistItems/>', () =>{
    it('renders 1 <BucketlistItems/> component', () =>{
        const component = shallow(<BucketlistItems/>);
        expect(component).toHaveLength(1);
    });
    describe('it returns props correctly', () =>{
        const component = shallow(<BucketlistItems name="app"/>);
        expect(component.instance().props.name).toBe('app')
    });
    describe('render one <TextField/> components', () => {
        const component = shallow(<BucketlistItems/>);
        expect(component.find('TextField').length).toBe(1);
    });
    describe('render one <Dialog/> components', () => {
        const component = shallow(<BucketlistItems/>);
        expect(component.find('Dialog').length).toBe(1);
    });
    describe('render one <Snackbar/> components', () => {
        const component = shallow(<BucketlistItems/>);
        expect(component.find('Snackbar').length).toBe(1);
    });
    describe('render one <FloatingActionButton/> components', () => {
        const component = shallow(<BucketlistItems/>);
        expect(component.find('FloatingActionButton').length).toBe(1);
    });

});

