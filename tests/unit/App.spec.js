import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import NegotiationForm from '@/components/NegotiationForm.vue';
import getCurrentTemperature from '@/helpers';

jest.mock('@/helpers', () => jest.fn().mockImplementation(() => ({
  main: {
    temp: 300,
  },
  weather: [{
    description: 'Sunny day',
  }],
})));


describe('App.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(App);
  });

  it('contains NegotiationForm component', () => {
    expect(wrapper.contains(NegotiationForm)).toBe(true);
  });

  it('displays the app logo', () => {
    expect(wrapper.contains('img')).toBe(true);
  });

  it('renders a negotiation component that has the right weatherInfo prop', () => {
    const negotiationComponent = wrapper.find(NegotiationForm);
    const { temperature, weatherDesc } = negotiationComponent.props('weatherInfo');

    expect(temperature).toEqual(300);
    expect(weatherDesc).toEqual('Sunny day');
  });

  describe('when component is mounted', () => {
    it('calls helper function to call temperature', () => {
      expect(getCurrentTemperature).toHaveBeenCalledWith('london');
    });
  });
});
