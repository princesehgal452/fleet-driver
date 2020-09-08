import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import OnboardNewDriverModal from '.';


describe('OnboardNewDriverModal', () => {
  let wrapper: ReactWrapper;
  let dismissHandler: jest.Mock;
  beforeEach(() => {
    dismissHandler = jest.fn();
    wrapper = mount(
      (
        <MemoryRouter>
          <OnboardNewDriverModal
            showNewDriverDialog
            dismissHandler={() => dismissHandler}
            redirectPath='/load'
          />
        </MemoryRouter>
      ),
    );
  });
  test('Should not show when open prop is false', () => {
    wrapper = mount(
      (
        <MemoryRouter>
          <OnboardNewDriverModal
            showNewDriverDialog={false}
            dismissHandler={() => console.log('test')}
            redirectPath='/load'
          />
        </MemoryRouter>
      ),
    );
    const inst = wrapper.find(OnboardNewDriverModal);
    expect(inst.text()).toBeFalsy();
  });
  test('Should have test when open prop is true', () => {
    const inst = wrapper.find(OnboardNewDriverModal);
    expect(inst.text()).toBeTruthy();
  });
});
