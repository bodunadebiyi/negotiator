<template>
  <div class="container">
    <ModalDialog
      :modalTitle="modalTitle"
      :visible="modalVisible"
      @closeModal="closeModal">
      <p v-html="modalMessage"></p>
    </ModalDialog>
    <div class="tab-wrapper">
      <div class="tabs">
        <div :class="employerTabClasses" @click="selectTab(0)">
          <p>Employer-Tab</p>
        </div>
        <div :class="employeeTabClasses" @click="selectTab(1)">
          <p>Employee-Tab</p>
        </div>
      </div>
      <div class="tab-content">
        <div v-show="displayEmployerTab">
          <TabItemForm
            inputPlaceholder="Enter Maximum Offer"
            submittedText="Maximum Offer Submitted!"
            buttonText="Submit Offer"
            :formSubmitted="maximumOfferSubmitted"
            :value="maximumOffer"
            @formSubmitted="submitMaximumOffer"
            @inputChange="setMaximumOffer" />
        </div>
        <div v-show="displayEmployeeTab">
          <TabItemForm
            inputPlaceholder="Enter Minimum Salary"
            submittedText="Minimum Salary Submitted!"
            buttonText="Submit Salary"
            :formSubmitted="minimumSalarySubmitted"
            :value="minimumSalary"
            @formSubmitted="submitMinimumSalary"
            @inputChange="setMinimumSalary" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';
import ModalDialog from './ModalDialog.vue';
import TabItemForm from './TabItemForm.vue';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const initialState = {
  selectedTabIndex: 0,
  maximumOffer: null,
  minimumSalary: null,
  maximumOfferSubmitted: false,
  minimumSalarySubmitted: false,
  modalMessage: null,
  modalVisible: false,
  modalTitle: null,
};

export default {
  name: 'NegotiationForm',
  components: { ModalDialog, TabItemForm },
  data() {
    return { ...initialState };
  },
  props: {
    weatherInfo: {
      type: Object,
    },
  },
  computed: {
    displayEmployeeTab() {
      return this.selectedTabIndex === 1;
    },
    displayEmployerTab() {
      return this.selectedTabIndex === 0;
    },
    employeeTabClasses() {
      return this.selectedTabIndex === 1 ? ['tab-item', 'tab-selected'] : 'tab-item';
    },
    employerTabClasses() {
      return this.selectedTabIndex === 0 ? ['tab-item', 'tab-selected'] : 'tab-item';
    },
    temperature() {
      return get(this.weatherInfo, 'temperature', 'unavailable');
    },
    weatherDescription() {
      return get(this.weatherInfo, 'weatherDesc', 'unavailable');
    },
  },
  methods: {
    selectTab(tabIndex) {
      this.selectedTabIndex = tabIndex;
    },
    publishNegotiationResult() {
      if (this.maximumOffer === null || this.minimumSalary === null) {
        return;
      }
      const modalTitle = this.maximumOffer >= this.minimumSalary ? 'Success!' : 'Failure!';
      this.showMessage(
        modalTitle,
        `Maximum offer was: ${formatter.format(this.maximumOffer)} <br />Minimum salary expected was: ${formatter.format(this.minimumSalary)} <br /> <br/>Temperature in London (K): ${this.temperature}<br>Weather in London: ${this.weatherDescription}`,
      );
    },
    showMessage(header, message) {
      this.modalMessage = message;
      this.modalTitle = header;
      this.modalVisible = true;
    },
    closeModal() {
      this.modalMessage = null;
      this.modalTitle = null;
      this.modalVisible = false;

      if (this.maximumOffer !== null && this.minimumSalary !== null) {
        this.resetApp();
      }
    },
    submitMinimumSalary() {
      if (this.minimumSalary === null) {
        this.showMessage('Error', 'Enter a minimum salary!');
      } else {
        this.minimumSalarySubmitted = true;
        this.publishNegotiationResult();
      }
    },
    submitMaximumOffer() {
      if (this.maximumOffer === null) {
        this.showMessage('Error', 'Enter a maximum offer!');
      } else {
        this.maximumOfferSubmitted = true;
        this.publishNegotiationResult();
      }
    },
    setMaximumOffer(value) {
      this.maximumOffer = +value;
    },
    setMinimumSalary(value) {
      this.minimumSalary = +value;
    },
    resetApp() {
      Object.assign(this.$data, { ...initialState });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .tab-wrapper {
    width: 70%;
    max-width: 400px;
    min-width: 300px;
    border: solid 1px black;
    margin: auto;
    .tabs {
      .tab-item {
        display: inline-block;
        box-sizing: border-box;
        text-align: center;
        width: 50%;
        cursor: pointer;
        background: lightgray;
      }
      .tab-selected {
        background-color: gray;
        p {
          color: white;
        }
      }
    }
    .tab-content {
      padding: 30px;
      div {
        text-align: center;
      }
    }
  }

  .Input-text {
    display: block;
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 10px;
    color: inherit;
    width: 100%;
    font-family: inherit;
    font-size: 15px;
    font-weight: inherit;
    border: solid thin black;
    border-radius: 0.4rem;
    transition: box-shadow ease-in-out .2s;
  }

  .Input-text::placeholder {
    color: #B0BEC5;
  }

  .Input-text:focus {
    outline: none;
    box-shadow: 0.2rem 0.2rem 0.2rem #B0BEC5;
  }

  .Submit-button {
    display: block;
    margin: auto;
    border: solid 2px black;
    padding: 10px 30px;
    display: block;
    transition: all ease-in-out 0.1s;
    cursor: pointer;
  }

  .Submit-button:hover {
    border-radius: 10px;
    border-color: green;
    color: green;
  }
</style>
