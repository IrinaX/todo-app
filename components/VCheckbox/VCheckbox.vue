<template>
  <label class="checkbox__label"
  >
    <slot/>
    <input type="checkbox" class="checkbox__input"
           v-model="c_value"
           :value="checkboxValue"
    >
    <span class="checkbox__icon"></span>
  </label>
</template>

<script>
export default {
  name: "VCheckbox",
  data() {
    return {
      value: {
        default: null,
      },
      checkboxValue: {
        default: false,
      }
    };
  },

  computed: {
    c_value: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox__input {
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
}

.checkbox__label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  cursor: pointer;
}

.checkbox__icon {
  align-self: baseline;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 7px;
    display: block;
    background: url('./checkbox.svg') center no-repeat;
    width: 8px;
    height: 11px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &::after {
    content: '';
    display: block;
    width: 22px;
    height: 22px;
    box-shadow: 0 2px 13px 1px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    border: none;
    background: $light;
    transition: all .1s ease-in;
  }
}

.checkbox__input:checked + .checkbox__icon::before {
  opacity: 1;
}

.checkbox__input:checked + .checkbox__icon::after {
  background: $primary;
}
</style>
