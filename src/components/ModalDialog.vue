<template>
    <div v-if="visible" class="modal-wrapper">
        <div class="modal-content">
            <div class="modal-header">
                <h3>{{ modalTitle }}</h3>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-action">
                <button @click="closeModal" class="modal-button">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ModalDialog',
  props: {
    modalTitle: {
      type: String,
      default: 'Modal Title',
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>

<style scoped lang="scss">
    .modal-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        width: 100%;
        height: 100%;
        z-index: 10;

        .modal-content {
            width: 350px;
            background: white;
            margin: auto;
            position: relative;
            transform: translateY(-100%);
            top: 50%;
            padding: 10px;
        }

        .modal-button {
            padding: 10px 20px;
        }
    }
</style>
