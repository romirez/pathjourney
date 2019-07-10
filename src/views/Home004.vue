<template>
    <div class="home">
        <div class="journey-log">
            <div class="header">
                <div class="logo">
                    <img src="../assets/images/home-logo.png" alt="">
                </div>
                <div class="add-button">
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="20px" height="20px">
                        <path fill-rule="evenodd"  fill="#fff"
                              d="M11.000,-0.000 L9.000,-0.000 L9.000,9.000 L-0.000,9.000 L-0.000,11.000 L9.000,11.000 L9.000,20.000 L11.000,20.000 L11.000,11.000 L20.000,11.000 L20.000,9.000 L11.000,9.000 L11.000,-0.000 Z"/>
                    </svg>
                </div>
            </div>
            <vue-custom-scrollbar class="scroll-area log"  :settings="settings" @ps-scroll-y="scrollHanle">
                <p>Journey Log</p>
                <div class="cruises">
                    <div class="cruise">
                        <p class="date">June 2019</p>
                        <div class="destination">
                            <p class="date">30.06.2019</p>
                            <p class="name">St Martin</p>
                            <div class="images">
                                <div><img src="../assets/images/img1.png" alt=""></div>
                                <div><img src="../assets/images/img2.png" alt=""></div>
                                <div><img src="../assets/images/img3.png" alt=""></div>
                                <div><img src="../assets/images/img4.png" alt=""></div>
                                <div><img src="../assets/images/img1.png" alt=""></div>
                                <div><img src="../assets/images/img2.png" alt=""><div class="overlay"><span>5+</span></div></div>
                            </div>
                            <div class="dot"></div>
                        </div>
                        <div class="destination selected">
                            <p class="date">30.06.2019</p>
                            <p class="name">St Martin</p>
                            <div class="images">
                                <div><img src="../assets/images/img1.png" alt=""></div>
                                <div><img src="../assets/images/img2.png" alt=""></div>
                                <div><img src="../assets/images/img3.png" alt=""></div>
                                <div><img src="../assets/images/img4.png" alt=""></div>
                                <div><img src="../assets/images/img1.png" alt=""></div>
                                <div><img src="../assets/images/img2.png" alt=""><div class="overlay"><span>5+</span></div></div>
                            </div>
                            <div class="dot"></div>
                        </div>
                        <div class="line"></div>
                    </div>
                    <div class="cruise">
                        <p class="date">May 2019</p>
                        <div class="destination">
                            <p class="date">30.06.2019</p>
                            <p class="name">St Martin</p>
                            <div class="description">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget.</p>
                            </div>
                        </div>
                    </div>
                    <div class="cruise">
                        <p class="date">April 2019</p>
                        <div class="destination">
                            <p class="date">30.06.2019</p>
                            <p class="name">St Martin</p>
                            <div class="images">
                                <div><img src="../assets/images/img1.png" alt=""></div>
                                <div><img src="../assets/images/img2.png" alt=""></div>
                                <div><img src="../assets/images/img3.png" alt=""></div>
                                <div><img src="../assets/images/img4.png" alt=""></div>
                                <div><img src="../assets/images/img1.png" alt=""></div>
                                <div>
                                    <img src="../assets/images/img2.png" alt="">
                                    <div class="overlay">
                                        <span>5+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="destination">
                            <p class="date">30.06.2019</p>
                            <p class="name">St Martin</p>
                            <div class="images">
                                <div><img src="../assets/images/img1.png" alt=""></div>
                                <div><img src="../assets/images/img2.png" alt=""></div>
                                <div><img src="../assets/images/img3.png" alt=""></div>
                                <div><img src="../assets/images/img4.png" alt=""></div>
                                <div><img src="../assets/images/img1.png" alt=""></div>
                                <div><img src="../assets/images/img2.png" alt=""><div class="overlay"><span>5+</span></div></div>
                            </div>
                        </div>
                    </div>
                    <div class="cruise">
                        <p class="date">April 2019</p>
                        <div class="destination">
                            <p class="date">30.06.2019</p>
                            <p class="name">St Martin</p>
                            <div class="images">
                                <div><img src="../assets/images/img1.png" alt=""></div>
                                <div><img src="../assets/images/img2.png" alt=""></div>
                                <div><img src="../assets/images/img3.png" alt=""></div>
                                <div><img src="../assets/images/img4.png" alt=""></div>
                                <div><img src="../assets/images/img1.png" alt=""></div>
                                <div><img src="../assets/images/img2.png" alt=""><div class="overlay"><span>5+</span></div></div>
                            </div>
                        </div>
                        <div class="destination">
                            <p class="date">30.06.2019</p>
                            <p class="name">St Martin</p>
                            <div class="images">
                                <div><img src="../assets/images/img1.png" alt=""></div>
                                <div><img src="../assets/images/img2.png" alt=""></div>
                                <div><img src="../assets/images/img3.png" alt=""></div>
                                <div><img src="../assets/images/img4.png" alt=""></div>
                                <div><img src="../assets/images/img1.png" alt=""></div>
                                <div><img src="../assets/images/img2.png" alt=""><div class="overlay"><span>5+</span></div></div>
                            </div>
                        </div>
                    </div>
                    <div class="cruise">
                        <p class="date">April 2019</p>
                        <div class="destination">
                            <p class="date">30.06.2019</p>
                            <p class="name">St Martin</p>
                            <div class="images">
                                <div><img src="../assets/images/img1.png" alt=""></div>
                                <div><img src="../assets/images/img2.png" alt=""></div>
                                <div><img src="../assets/images/img3.png" alt=""></div>
                                <div><img src="../assets/images/img4.png" alt=""></div>
                                <div><img src="../assets/images/img1.png" alt=""></div>
                                <div><img src="../assets/images/img2.png" alt=""><div class="overlay"><span>5+</span></div></div>
                            </div>
                        </div>
                        <div class="destination">
                            <p class="date">30.06.2019</p>
                            <p class="name">St Martin</p>
                            <div class="images">
                                <div><img src="../assets/images/img1.png" alt=""></div>
                                <div><img src="../assets/images/img2.png" alt=""></div>
                                <div><img src="../assets/images/img3.png" alt=""></div>
                                <div><img src="../assets/images/img4.png" alt=""></div>
                                <div><img src="../assets/images/img1.png" alt=""></div>
                                <div><img src="../assets/images/img2.png" alt=""><div class="overlay"><span>5+</span></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </vue-custom-scrollbar>
        </div>
        <div class="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1949267.7723894767!2d-63.290313000554626!3d17.403933846161287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sst+martin+google+maps!5e0!3m2!1sru!2sru!4v1562323202208!5m2!1sru!2sru" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
            <div class="destination-content">
                <p class="date">30.06.2019</p>
                <p class="name">St Martin</p>
                <div class="description">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget.</p>
                </div>
                <div class="images">
                    <div><img src="../assets/images/img5.png" alt=""></div>
                    <div><img src="../assets/images/img6.png" alt=""></div>
                    <div><img src="../assets/images/img7.png" alt=""></div>
                    <div><img src="../assets/images/img8.png" alt=""></div>
                    <div><img src="../assets/images/img5.png" alt=""></div>
                    <div><img src="../assets/images/img6.png" alt=""><div class="overlay"><span>5+</span><span>Open album</span></div></div>
                </div>
            </div>
        </div>
        <popup :title="'Add event'">
            <template v-slot:content >
                <div class="destination-info">
                    <div class="text-inputs">
                        <custom-input
                                class="info-input"
                                v-model="date"
                                :placeholder="'Date'"
                                :type="'text'">
                        </custom-input>
                        <custom-input
                                class="info-input"
                                v-model="location"
                                :placeholder="'Location'"
                                :type="'text'">
                        </custom-input>
                        <custom-input
                                class="info-input"
                                v-model="description"
                                :placeholder="'Description'"
                                :type="'text'">
                        </custom-input>
                    </div>
                    <div class="upload-images">
                        <div class="title">Add photo</div>
                        <div class="images-wrapper">
                            <div class="images">
                                <div><img src="../assets/images/img1.png" alt=""><div class="delete-button"><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="12px" height="12px">
                                    <path fill-rule="evenodd"  fill="rgb(254, 254, 254)"
                                          d="M12.000,11.000 L11.000,12.000 L6.000,7.000 L1.000,12.000 L-0.000,11.000 L5.000,6.000 L-0.000,1.000 L1.000,-0.000 L6.000,5.000 L11.000,-0.000 L12.000,1.000 L7.000,6.000 L12.000,11.000 Z"/>
                                </svg></div></div>
                                <div><img src="../assets/images/img2.png" alt=""><div class="delete-button"><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="12px" height="12px">
                                    <path fill-rule="evenodd"  fill="rgb(254, 254, 254)"
                                          d="M12.000,11.000 L11.000,12.000 L6.000,7.000 L1.000,12.000 L-0.000,11.000 L5.000,6.000 L-0.000,1.000 L1.000,-0.000 L6.000,5.000 L11.000,-0.000 L12.000,1.000 L7.000,6.000 L12.000,11.000 Z"/>
                                </svg></div></div>
                                <div><img src="../assets/images/img3.png" alt=""><div class="delete-button"><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="12px" height="12px">
                                    <path fill-rule="evenodd"  fill="rgb(254, 254, 254)"
                                          d="M12.000,11.000 L11.000,12.000 L6.000,7.000 L1.000,12.000 L-0.000,11.000 L5.000,6.000 L-0.000,1.000 L1.000,-0.000 L6.000,5.000 L11.000,-0.000 L12.000,1.000 L7.000,6.000 L12.000,11.000 Z"/>
                                </svg></div></div>
                                <div><img src="../assets/images/img4.png" alt=""><div class="delete-button"><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="12px" height="12px">
                                    <path fill-rule="evenodd"  fill="rgb(254, 254, 254)"
                                          d="M12.000,11.000 L11.000,12.000 L6.000,7.000 L1.000,12.000 L-0.000,11.000 L5.000,6.000 L-0.000,1.000 L1.000,-0.000 L6.000,5.000 L11.000,-0.000 L12.000,1.000 L7.000,6.000 L12.000,11.000 Z"/>
                                </svg></div></div>
                                <div><img src="../assets/images/img1.png" alt=""><div class="delete-button"><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="12px" height="12px">
                                    <path fill-rule="evenodd"  fill="rgb(254, 254, 254)"
                                          d="M12.000,11.000 L11.000,12.000 L6.000,7.000 L1.000,12.000 L-0.000,11.000 L5.000,6.000 L-0.000,1.000 L1.000,-0.000 L6.000,5.000 L11.000,-0.000 L12.000,1.000 L7.000,6.000 L12.000,11.000 Z"/>
                                </svg></div></div>
                                <div><img src="../assets/images/img2.png" alt=""><div class="delete-button"><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="12px" height="12px">
                                    <path fill-rule="evenodd"  fill="rgb(254, 254, 254)"
                                          d="M12.000,11.000 L11.000,12.000 L6.000,7.000 L1.000,12.000 L-0.000,11.000 L5.000,6.000 L-0.000,1.000 L1.000,-0.000 L6.000,5.000 L11.000,-0.000 L12.000,1.000 L7.000,6.000 L12.000,11.000 Z"/>
                                </svg></div></div>
                            </div>
                            <div class="add-button">
                                <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="20px" height="20px">
                                    <path fill-rule="evenodd"  fill="rgb(255, 255, 255)"
                                          d="M11.000,-0.000 L9.000,-0.000 L9.000,9.000 L-0.000,9.000 L-0.000,11.000 L9.000,11.000 L9.000,20.000 L11.000,20.000 L11.000,11.000 L20.000,11.000 L20.000,9.000 L11.000,9.000 L11.000,-0.000 Z"/>
                                </svg>
                            </div>

                        </div>
                    </div>
                    <div class="submit-button">
                        <input type="button" value="Submit">
                    </div>
                </div>
            </template>
        </popup>
    </div>
</template>

<script>
  import VueCustomScrollbar from 'vue-custom-scrollbar'
  import Popup from '../components/controls/custom-popup.vue'
  import CustomInput from '../components/controls/custom-input.vue'
  export default {
    name: 'Home004',
    components: {
      Popup, VueCustomScrollbar, CustomInput
    },
    data() {
      return {
        date: '',
        location: '',
        description: ''
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import "../assets/style/custom.scss";
    .home {
        height: 100%;
        color: #282828;
        display: flex;
        flex-flow: row nowrap;
        overflow: hidden;
    }
    .journey-log {
        width: 400px;
        background-color: #fff;
        display: flex;
        flex-flow: column nowrap;
        box-shadow: -11px 5px 22px 5px rgba(0, 0, 0, 0.75);
        height: 100%;
        & > .header {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-between;
            padding: 10px 17px;
            & > .add-button {
                background-color: #31b9f1;
                border-radius: 50%;
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
                width: 50px;
                height: 50px;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
                cursor: pointer;
                &:hover {
                    background-color: $control-hover
                }
            }
        }
        & > .log {
            height: 100%;
            overflow-y: scroll;
            font-size: 20px;
            padding: 20px 19px 20px 0px;
            background-color: #ececec;
            display: flex;
            flex-flow: column nowrap;
            & > p:first-of-type {
                padding-left: 15px;
            }
            & > .cruises {
                margin-top: 23px;
                & > .cruise {
                    &:first-of-type {
                        margin-top: 0;
                    }
                    margin-top: 18px;
                    color: #282828;
                    position: relative;
                    & > .line {
                        left: -13px;
                        top: 45px;
                        height: 89.4%;
                        background-color: #00aa8d;
                        width: 2px;
                        position: absolute;
                    }
                    & > .date {
                        font-size: 16px;
                        padding-left: 15px;
                    }
                    & > .name {
                        color: #00aa8d;
                        font-size: 16px;
                        font-weight: bold;
                        margin-top: 18px;
                    }
                    & > .destination {
                        display: flex;
                        flex-flow: column nowrap;
                        position: relative;
                        & > * {
                            position: relative;
                            z-index: 5;
                        }
                        &.selected {
                            position: relative;
                            &:after {
                                display: block;
                                content: '';
                                width: 100%;
                                height: 100%;
                                left: 0;
                                top: 0;
                                position: absolute;
                                border-radius: 4px;
                                border: 1px solid $control-color;
                            }
                            background-color: #d6f1fc;
                        }
                        &:first-of-type {
                            margin-top: 20px;
                        }
                        margin-top: 15px;
                        border-radius: 4px;
                        background-color: #fff;
                        box-shadow: 0px 2px 5px 0px rgba(236, 236, 236, 0.75);
                        padding: 17px;
                        padding-left: 14px;
                        width: 95%;
                        & > .dot {
                            border-radius: 50%;
                            width: 11px;
                            height: 11px;
                            border: 3px solid #f6655b;
                            position: absolute;
                            left: -21px;
                            top: 40px;
                            background-color: #fff;
                            z-index: 5;
                        }
                        & > .date {
                            color: #a7a7a7;
                            font-size: 13px;
                        }
                        & > .description {
                            margin-top: 7px;
                            & > p {
                                font-size: 15px;
                                color: #a7a7a7;
                                line-height: 24px;
                            }
                        }
                        & > .name {
                            color: #282828;
                            font-weight: bold;
                            margin-top: 8px;
                        }
                        & > .images {
                            display: flex;
                            flex-flow: row nowrap;
                            margin-top: 20px;
                            & > * {
                                &:first-of-type > img {
                                    border-top-left-radius: 4px;
                                    border-bottom-left-radius: 4px;
                                }
                                &:last-of-type {
                                    position: relative;
                                    & > .overlay {
                                        cursor: pointer;
                                        display: flex;
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                        height: 60px;
                                        width: 100%;
                                        background-color: rgba(51, 102, 153, 0.8);
                                        flex-flow: row nowrap;
                                        justify-content: center;
                                        align-items: center;
                                        border-top-right-radius: 4px;
                                        border-bottom-right-radius: 4px;
                                        & > span {
                                            font-size: 20px;
                                            color: #fff;
                                        }
                                    }
                                    border-top-right-radius: 4px;
                                    border-bottom-right-radius: 4px;
                                    & > img {
                                        border-top-right-radius: 4px;
                                        border-bottom-right-radius: 4px;
                                    }
                                }
                                margin-left: 1px;
                            }
                        }
                    }
                }
            }
        }
    }
    .map {
        height: 100%;
        width: 100%;
        position: relative;
        & > iframe {
            width: 100%!important;
            height: 100%!important;
        }
        & > .destination-content {
            position: absolute;
            width: 90%;
            bottom: 15px;
            display: flex;
            flex-flow: column nowrap;
            background-color: #fff;
            border-radius: 4px;
            padding: 20px;
            width: 95%;
            left: 1%;
            padding-right: 16px;
            & > .images {
                display: flex;
                flex-flow: row nowrap;
                margin-top: 20px;
                & > * {
                    flex: 1;
                    min-width: 120px;
                    max-width: 238px;
                    & > img {
                        width: 100%;
                        height: auto;
                    }
                    &:first-of-type > img {
                        border-top-left-radius: 4px;
                        border-bottom-left-radius: 4px;
                    }
                    &:last-of-type {
                        position: relative;
                        & > .overlay {
                            cursor: pointer;
                            display: flex;
                            position: absolute;
                            left: 0;
                            top: 0;
                            height: 98%;
                            width: 100%;
                            background-color: rgba(51, 102, 153, 0.8);
                            flex-flow: column nowrap;
                            justify-content: center;
                            align-items: center;
                            border-top-right-radius: 4px;
                            border-bottom-right-radius: 4px;
                            & > span {
                                font-size: 18px;
                                color: #fff;
                            }
                        }
                        border-top-right-radius: 4px;
                        border-bottom-right-radius: 4px;
                        & > img {
                            border-top-right-radius: 4px;
                            border-bottom-right-radius: 4px;
                        }
                    }
                    margin-left: 2px;
                }
            }
            & > .date {
                color: #a7a7a7;
                font-size: 13px;
            }
            & > .description {
                margin-top: 7px;
                & > p {
                    font-size: 15px;
                    color: #a7a7a7;
                    line-height: 24px;
                }
            }
            & > .name {
                color: #282828;
                font-weight: bold;
                margin-top: 8px;
            }
        }

    }

    .destination-info {
        display: flex;
        flex-flow: column nowrap;
        & > .text-inputs {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            & > .info-input {
                width: auto;
                &:first-child {
                    flex-basis:calc(50% - 13px);
                    & + .info-input {
                        flex-basis:calc(50% - 13px);
                    }
                }
            }
            & > .info-input:last-child {
                margin-top: 50px;
                flex-basis: 100%;
            }
        }
        & > .upload-images {
            margin-top: 40px;
            display: flex;
            flex-flow: column nowrap;
            & > .title {
                font-size: 17px;
                color: #282828;
            }
            & > .images-wrapper {
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                & > .images {
                    display: flex;
                    flex-flow: row nowrap;
                    margin-top: 20px;
                    & > * {
                        &:first-of-type > img {
                            border-top-left-radius: 4px;
                            border-bottom-left-radius: 4px;
                        }
                        position: relative;
                        &:last-of-type {
                            & > .delete-button {
                                border-top-right-radius: 4px;
                                border-bottom-right-radius: 4px;
                            }
                        }
                        & > .delete-button {
                            cursor: pointer;
                            display: flex;
                            position: absolute;
                            right: 0px;
                            top: 0px;
                            height: 20px;
                            width: 20px;
                            background-color: rgba(0, 0, 0, 0.67);
                            flex-flow: row nowrap;
                            justify-content: center;
                            align-items: center;
                            &:last-of-type {
                                border-bottom-left-radius: 4px;
                            }

                        }
                        border-top-right-radius: 4px;
                        border-bottom-right-radius: 4px;
                        & > img {
                            border-top-right-radius: 4px;
                            border-bottom-right-radius: 4px;
                        }
                        margin-left: 1px;
                    }
                }
                & > .add-button {
                    width: 40px;
                    height: 40px;
                    margin-top: 20px;
                    margin-bottom: 5px;
                    margin-left: 20px;
                }
            }
        }

    }

</style>