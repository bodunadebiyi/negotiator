<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/negotiation.png" height=120 width="auto">
    <NegotiationForm :weatherInfo="weatherInfo" />
  </div>
</template>

<script>
import get from 'lodash/get';
import NegotiationForm from './components/NegotiationForm.vue';
import getCurrentTemperature from './helpers';

export default {
  name: 'app',
  data() {
    return { weatherInfo: {} };
  },
  async mounted() {
    try {
      const temperature = await getCurrentTemperature('london');
      const weatherInfo = {
        temperature: get(temperature, 'main.temp', 'unavailable'),
        weatherDesc: get(temperature, 'weather[0].description', 'unavailable'),
      };

      this.weatherInfo = weatherInfo;
    } catch (e) {
      console.log(e);
    }
  },
  components: {
    NegotiationForm,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  & > img {
    margin-bottom: 20px;
  }
}
</style>
