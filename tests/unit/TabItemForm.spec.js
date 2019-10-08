import { shallowMount } from '@vue/test-utils';
import TabItem from '@/components/TabItemForm.vue';

describe('TabItemForm.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TabItem, {
      propsData: {
        formSubmitted: true,
        inputPlaceholder: 'Input placeholder',
        submittedText: 'Form Submitted',
        buttonText: 'Submit!',
        value: 23,
      },
    });
  });

  describe('when formSubmitted prop is true', () => {
    it('hides input field and submit button', () => {
      const inputField = wrapper.find('input');
      const buttonElement = wrapper.find('button');

      expect(inputField.exists()).toBe(false);
      expect(buttonElement.exists()).toBe(false);
    });

    it('shows submitted text element', () => {
      const submittedText = wrapper.find('p');
      expect(submittedText.exists()).toBe(true);
    });
  });

  describe('when formSubmitted prop is false', () => {
    beforeEach(() => {
      wrapper.setProps({ formSubmitted: false });
    });

    it('shows input field and submit button', () => {
      const inputField = wrapper.find('input');
      const buttonElement = wrapper.find('button');

      expect(inputField.exists()).toBe(true);
      expect(buttonElement.exists()).toBe(true);
    });

    it('hides submitted text element', () => {
      const submittedText = wrapper.find('p');
      expect(submittedText.exists()).toBe(false);
    });

    describe('when value is being entered into input field', () => {
      it('emits inputChange event', () => {
        const inputField = wrapper.find('input');
        inputField.trigger('input');

        expect(wrapper.emitted().inputChange).toBeTruthy();
      });
    });

    describe('when submit button is clicked', () => {
      it('emits formSubmitted event', () => {
        const buttonElement = wrapper.find('button');
        buttonElement.trigger('click');

        expect(wrapper.emitted().formSubmitted).toBeTruthy();
      });
    });
  });
});
