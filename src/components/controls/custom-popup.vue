<template>
    <div class="wrapper">
        <div class="popup-content">
            <div class="header">
                <div class="title"><p>{{title}}</p></div>
                <div class="close-button" @click="$emit('close')">
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="20px" height="20px">
                        <path fill-rule="evenodd"  fill="rgb(254, 254, 254)"
                              d="M20.000,19.000 L19.000,20.000 L10.000,11.000 L1.000,20.000 L-0.000,19.000 L9.000,10.000 L-0.000,1.000 L1.000,-0.000 L10.000,9.000 L19.000,-0.000 L20.000,1.000 L11.000,10.000 L20.000,19.000 Z"/>
                    </svg>
                </div>
            </div>
            <div class="content">
                <slot name="content">
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
      name: 'popup',
      props: {
        title: String
      },
      data() {
        return {
        }
      }
    }
</script>
<style lang="scss" scoped>
    .wrapper {
        position: fixed;
        z-index: 9999;
        background: rgba(66, 66, 66, 0.8);
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        & > .popup-content {
            border-radius: 4px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-flow: column nowrap;
            position: absolute;
            background-color: #fff;
            & > .header {
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                display: flex;
                flex-flow: row nowrap;
                padding: 22px;
                justify-content: space-between;
                background-color: #374ba5;
                box-shadow: 0px 0px 1px;
                align-items: center;
                & > .title {
                    font-size: 24px;
                    color: #fff;
                }
                & > .close-button {
                    height: 20px;
                }
            }
            & > .content {
                padding: 78px 55px 55px;
            }
        }
    }
</style>