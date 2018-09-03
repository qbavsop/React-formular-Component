import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

describe('Tests for <LoginForm /> component:', () => {
    let wrapper, state;
    const passwordPattern = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w!@#$%^&*]{6,}$/;
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    beforeEach(() => {
        state = {
            isEmailValid: false,
            isPasswordValid: false,
            emailValue: '',
            passwordValue: '',
            alertInfo: 'Test'
        }
        wrapper = shallow( <LoginForm /> );
    })

    it('renders without crashing', () => {
        wrapper
    });

    it('should have <input> with ID #password', () => {
        const container = wrapper.find("input#password");
        expect(container).toHaveLength(1);
    });

    it('<input> with ID #password has onChange as prop', () => {
        const container = wrapper.find("input#password");
        const containerProp = container.props();
        expect(typeof containerProp.onChange).toBe("function");
    });

    it('should have <input> with ID #email', () => {
        const container = wrapper.find("input#email");
        expect(container).toHaveLength(1);
    });

    it('<input> with ID #email has onChange as prop', () => {
        const container = wrapper.find("input#email");
        const containerProp = container.props();
        expect(typeof containerProp.onChange).toBe("function");
    });

    it('<form> should has onSubmit as prop', () => {
        const container = wrapper.find("form");
        const containerProp = container.props();
        expect(typeof containerProp.onSubmit).toBe("function");
    });

    /* checking password pattern */

    it('expects password NOT to match pattern / missing number', () => {
        const password = 'Password';
        expect(password).not.toMatch(passwordPattern);
    })

    it('expects password NOT to match pattern / missing Uppercase', () => {
        const password = 'password1';
        expect(password).not.toMatch(passwordPattern);
    })

    it('expects password NOT to match pattern / missing lowercase', () => {
        const password = 'PASSWORD1';
        expect(password).not.toMatch(passwordPattern);
    })

    it('expects password NOT to match pattern / too short', () => {
        const password = 'Pass1';
        expect(password).not.toMatch(passwordPattern);
    })

    /* checking email pattern */

    it('expects email NOT to match pattern / missing @', () => {
        const email = 'testtest.pl';
        expect(email).not.toMatch(emailPattern);
    })

    it('expects email NOT to match pattern / incorrect domain', () => {
        const email = 'test@test.';
        expect(email).not.toMatch(emailPattern);
    })

    it('expects email NOT to match pattern / incorect username', () => {
        const email = '.test.@test.pl';
        expect(email).not.toMatch(emailPattern);
    })

})