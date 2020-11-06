<template>
  <button class="btn"
          :class="c_schema"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  name: "VButton",
  data() {
    return {
      schema: {
        default: "primary"
      }
    };
  },
  computed: {
    c_schema() {
      return "button_" + this.schema;
    }
  },
};
</script>

<style lang="scss" scoped>
.button {
  background: $dark;
  position: relative;
  color: white;
  font: $button-font;
  border: none;
  box-shadow: $card-shadow;
  border-radius: 7px;
  padding: 12px 30px;
  z-index: 1;
  cursor: pointer;
  transition: all .1s ease-in;

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    //background: url('./button-bg.png') no-repeat center;
    //background-size: 100% 50px;
    opacity: 0.4;
  }

  &:active {
    transform: translate(4px, 4px);
    box-shadow: 0 0 0 rgba(15, 40, 94, 0.18);
  }

  &:active, &:focus {
    outline: none;
  }
}

.button_dark {
  background: $dark;

  &:hover {
    background: darken($dark, 2%);
  }
}

.button_primary {
  background: $primary;

  &:hover {
    background: darken($primary, 5%);
  }
}

.button_secondary {
  background: $secondary;
  color: $dark;

  &:hover {
    background: darken($secondary, 2%);
  }

  &:before {
    opacity: 1;
  }
}

.button_extra {
  background: $extra;
  color: $secondary;

  &:hover {
    background: darken($extra, 2%);
  }
}

.button_link {
  background: none;
  color: $extra;
  padding: 0;
  box-shadow: none;

  &:hover {
    color: darken($extra, 10%);
  }

  &:active {
    transform: none;
    box-shadow: none;
  }

  [class^="icon-"], [class*=" icon-"] {
    vertical-align: middle;
  }
}
</style>
