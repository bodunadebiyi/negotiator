import { shallowMount } from '@vue/test-utils';
import NegotiationForm from '@/components/NegotiationForm.vue';
import ModalDialog from '@/components/ModalDialog.vue';
import TabItemForm from '@/components/TabItemForm.vue';

describe('Negotiation Form', () => {
  let wrapper;
  const closeModalSpyFunc = jest.fn();
  const submitMaximumOfferSpyFunc = jest.fn();
  const setMaximumOfferSpyFunc = jest.fn();
  const submitMinimumSalarySpyFunc = jest.fn();
  const setMinimumSalarySpyFunc = jest.fn();
  const showMessageSpyFunc = jest.fn();

  beforeEach(() => {
    wrapper = shallowMount(NegotiationForm, {
      propsData: {
        weatherInfo: {
          temperature: 200,
          weatherDescription: 'Sunny Day',
        },
      },
      methods: {
        closeModal: closeModalSpyFunc,
        submitMaximumOffer: submitMaximumOfferSpyFunc,
        setMaximumOffer: setMaximumOfferSpyFunc,
        submitMinimumSalary: submitMinimumSalarySpyFunc,
        setMinimumSalary: setMinimumSalarySpyFunc,
        showMessage: showMessageSpyFunc,
      },
    });
  });

  it('renders a ModalDialog Component', () => {
    const modalDialogComponent = wrapper.find(ModalDialog);
    expect(modalDialogComponent.exists()).toBe(true);
  });

  it('displays two tabs', () => {
    const tabs = wrapper.findAll('.tabs p');

    expect(tabs.at(0).text()).toEqual('Employer-Tab');
    expect(tabs.at(1).text()).toEqual('Employee-Tab');
  });

  it('displays two TabItemForm', () => {
    const tabItemForms = wrapper.findAll(TabItemForm);
    expect(tabItemForms.length).toBe(2);
  });

  describe('when Employer tab is clicked', () => {
    let selectTabSpy;

    beforeEach(() => {
      const employerTab = wrapper.findAll('.tabs div').at(0);

      selectTabSpy = jest.spyOn(wrapper.vm, 'selectTab');
      employerTab.trigger('click');
    });

    afterEach(() => {
      selectTabSpy.mockClear();
    });

    it('hides employee TabItemForm', () => {
      const employeeTabSection = wrapper.vm.$el.querySelector('.tab-content div:last-child');
      expect(employeeTabSection.style.display).toEqual('none');
    });

    it('shows employer TabItemForm', () => {
      const employerTabSection = wrapper.vm.$el.querySelector('.tab-content div:first-child');
      expect(employerTabSection.style.display).toEqual('');
    });

    it('calls selectTab method with correct tab index', () => {
      expect(selectTabSpy).toHaveBeenCalledWith(0);
    });
  });

  describe('when Employee tab is clicked', () => {
    let selectTabSpy;

    beforeEach(() => {
      const employeeTab = wrapper.findAll('.tabs div').at(1);

      selectTabSpy = jest.spyOn(wrapper.vm, 'selectTab');
      employeeTab.trigger('click');
    });

    afterEach(() => {
      selectTabSpy.mockClear();
    });

    it('calls selectTab method with correct tab index', () => {
      expect(selectTabSpy).toHaveBeenCalledWith(1);
    });

    it('shows employee TabItemForm', () => {
      const employeeTabSection = wrapper.vm.$el.querySelector('.tab-content div:last-child');
      expect(employeeTabSection.style.display).toEqual('');
    });

    it('hides employer TabItemForm', () => {
      const employerTabSection = wrapper.vm.$el.querySelector('.tab-content div:first-child');
      expect(employerTabSection.style.display).toEqual('none');
    });
  });

  describe('when dialogModal emits "closeModal" Event', () => {
    it('calls closeModal method', () => {
      const modalDialogComponent = wrapper.find(ModalDialog);
      modalDialogComponent.vm.$emit('closeModal');

      expect(closeModalSpyFunc).toHaveBeenCalled();
    });
  });

  describe('when Employer TabItemForm emits "formSubmitted" event', () => {
    it('calls "submitMaximumOffer" method', () => {
      const employerTabItemForm = wrapper.findAll(TabItemForm).at(0);
      employerTabItemForm.vm.$emit('formSubmitted');

      expect(submitMaximumOfferSpyFunc).toHaveBeenCalled();
    });
  });

  describe('when Employer TabItemForm emits "inputChange" event', () => {
    it('calls "submitMaximumOffer" method', () => {
      const employerTabItemForm = wrapper.findAll(TabItemForm).at(0);
      employerTabItemForm.vm.$emit('inputChange');

      expect(setMaximumOfferSpyFunc).toHaveBeenCalled();
    });
  });

  describe('when Employee TabItemForm emits "formSubmitted" event', () => {
    it('calls "submitMaximumOffer" method', () => {
      const employeeTabItemForm = wrapper.findAll(TabItemForm).at(1);
      employeeTabItemForm.vm.$emit('formSubmitted');

      expect(submitMaximumOfferSpyFunc).toHaveBeenCalled();
    });
  });

  describe('when Employee TabItemForm emits "inputChange" event', () => {
    it('calls "submitMaximumOffer" method', () => {
      const employerTabItemForm = wrapper.findAll(TabItemForm).at(1);
      employerTabItemForm.vm.$emit('inputChange');

      expect(setMaximumOfferSpyFunc).toHaveBeenCalled();
    });
  });

  describe('when negotiation is published', () => {
    describe('when maximumOffer or minimumSalary is null', () => {
      it('does not call showMessage method', () => {
        wrapper.setData({ maximumOffer: null });
        wrapper.vm.publishNegotiationResult();

        expect(showMessageSpyFunc).not.toHaveBeenCalled();
      });
    });

    describe('when maximumOffer and minimumOffer is not null', () => {
      beforeEach(() => {
        wrapper.setData({
          maximumOffer: 3000,
          minimumSalary: 4300,
        });
        showMessageSpyFunc.mockClear();
      });

      describe('when maximumOffer < minimumSalary', () => {
        it('calls showMessage method with Failure message & temperature details of London', () => {
          wrapper.vm.publishNegotiationResult();
          const modalMessage = 'Maximum offer was: $3,000.00 <br />Minimum salary expected was: $4,300.00 <br /> <br/>Temperature in London (K): 200<br>Weather in London: unavailable';

          expect(showMessageSpyFunc).toHaveBeenCalledWith('Failure!', modalMessage);
        });
      });

      describe('when maximumOffer >= minimumSalary', () => {
        beforeEach(() => {
          wrapper.setData({
            maximumOffer: 30000,
            minimumSalary: 4300,
          });
        });

        it('calls showMessage method with Success message & temperature details of London', () => {
          wrapper.vm.publishNegotiationResult();
          const modalMessage = 'Maximum offer was: $30,000.00 <br />Minimum salary expected was: $4,300.00 <br /> <br/>Temperature in London (K): 200<br>Weather in London: unavailable';

          expect(showMessageSpyFunc).toHaveBeenCalledWith('Success!', modalMessage);
        });
      });
    });
  });
});
