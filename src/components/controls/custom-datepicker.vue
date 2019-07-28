<template>
  <div class="text-input">
    <datepicker
      input-class="date-input"
      :value="value"
      @input="dateSet"
    ></datepicker>
    <div class="label" :class="(toggle_line ? 'floated' : '')">{{placeholder}}</div>
    <div class="border-line" :class="toggle_line ? 'full' : 'zero'"></div>
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";

export default {
  name: "custom-datepicker",
  components: { Datepicker },
  props: {
    value: Date,
    placeholder: String
  },
  methods: {
      dateSet(date) {
        this.$emit('input', date); 
      }
  },
  computed: {
    toggle_line() {
      return this.value != null;
    }
  }
};
</script>
<style lang="scss">
.text-input {
  position: relative;
  width: 100%;
  & > .label {
    position: absolute;
    left: 0;
    top: 0;
    color: #8e8e8e;
    font-size: 18px;
    transition: 0.2s ease-out;
    z-index: 2;
    &.floated {
      top: -20px;
      left: 0px;
      font-size: 15px;
      color: #31b9f1;
    }
  }
  & > .border-line {
    width: 100%;
    height: 2px;
    background-color: #31b9f1;
    transition: width 0.2s ease-out;
    &.full {
      background-color: #31b9f1;
    }
    &.zero {
      background-color: #c1c1c1;
    }
  }
}
.date-input {
  width: 100%;
  border: none;
  padding-bottom: 10px;
  outline: none;
  position: relative;
  background-color: rgba(220, 220, 220, 0);
  z-index: 3;
}
</style>