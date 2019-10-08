<template>
    <div>
        <div v-if="!formSubmitted">
            <input
                :value="value"
                @input="onInputChange"
                type="number"
                class="Input-text"
                :placeholder="inputPlaceholder" />
            <button
                @click="submitForm()"
                class="Submit-button">
                {{ buttonText }}
            </button>
        </div>
        <p v-if="formSubmitted">{{ submittedText }}</p>
    </div>
</template>

<script>
export default {
  name: 'TabItemForm',
  props: {
    formSubmitted: {
      type: Boolean,
    },
    inputPlaceholder: {
      type: String,
    },
    submittedText: {
      type: String,
    },
    buttonText: {
      type: String,
    },
    value: {
      type: Number,
    },
  },
  methods: {
    submitForm() {
      this.$emit('formSubmitted');
    },
    onInputChange(e) {
      this.$emit('inputChange', e.target.value);
    },
  },
};
</script>
