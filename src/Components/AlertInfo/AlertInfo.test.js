import React from 'react';
import { shallow } from 'enzyme';
import AlertInfo from './AlertInfo';

describe('Tests for <AlertInfo /> component:', () => {
            let wrapper, state;

            it('renders <div> with a class name .alertinfo', () => {
                wrapper = shallow( < AlertInfo / > );
                expect(wrapper.is('.alertinfo')).toBe(true);
            });

            it('displays correct alert from a a passed prop', () => {
                        state = { alertInfo: 'Test' }
                        wrapper = shallow( < AlertInfo alertInfo = { state.alertInfo }
                            />);
                            expect(wrapper.find('.alertinfo').text()).toBe('Test')
                        });

                    it('it has .success class when passed prop is true', () => {
                            state = { passed: true }
                            wrapper = shallow( < AlertInfo passed = { state.passed }
                                />);
                                expect(wrapper.is('.success')).toBe(true)
                            });

                        it('it has not .success class when passed prop is false', () => {
                                state = { passed: false }
                                wrapper = shallow( < AlertInfo passed = { state.passed }
                                    />);
                                    expect(wrapper.is('.success')).not.toBe(true)
                                });

                        });