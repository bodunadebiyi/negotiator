import { shallowMount } from '@vue/test-utils';
import ModalDialog from '@/components/ModalDialog.vue';

describe('ModalDialog.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ModalDialog, {
      propsData: {
        modalTitle: 'Test Modal Title',
        visible: true,
      },
    });
  });

  describe('when visible props is true', () => {
    it('renders modal title', () => {
      const modalTitleComponent = wrapper.find('.modal-header h3');

      expect(modalTitleComponent.exists()).toBe(true);
      expect(modalTitleComponent.text()).toBe('Test Modal Title');
    });

    it('renders a close button', () => {
      const closeButton = wrapper.find('button');
      expect(closeButton.exists()).toBe(true);
    });
  });

  describe('when visible props if false', () => {
    it('renders nothing', () => {
      wrapper.setProps({ visible: false });
      expect(wrapper.isEmpty()).toBe(true);
    });
  });

  describe('when closeButton is clicked', () => {
    it('emits closeModal event', () => {
      const closeButton = wrapper.find('button');
      closeButton.trigger('click');

      expect(wrapper.emitted().closeModal).toBeTruthy();
    });
  });
});
