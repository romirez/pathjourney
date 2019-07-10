<template>
    <div class="text-input">
        <input class="password-input" :type="type" :value="value"
               @focus="toggle_line && value !== '' ? '' : toggle_line = !toggle_line"
               @blur="toggle_line && value === '' ? toggle_line = !toggle_line : ''"
               @input="$emit('input', $event.target.value)">
        <div class="label" :class="(toggle_line ? 'floated' : '')">{{placeholder}}</div>
        <div class="border-line" :class="toggle_line ? 'full' : 'zero'"></div>
    </div>
</template>
<script>
    export default {
      name: 'custom-input',
      data() {
        return {
          toggle_line: false
        }
      },
      props: {
        value: String,
        placeholder: String,
        type: String
      }
    }
</script>
<style lang="scss" scoped>
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
        & > .password-input {
            width: 100%;
            border: none;
            padding-bottom: 10px;
            outline: none;
            position: relative;
            background-color: rgba(220, 220, 220, 0);
            z-index: 3;
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
</style>