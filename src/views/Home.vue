<template>
  <div class="home">
    <div class="journey-log">
      <div class="header">
        <div class="logo">
          <img src="../assets/images/home-logo.png" alt />
        </div>
        <div class="add-button" @click="showAddLog">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="20px"
            height="20px"
          >
            <path
              fill-rule="evenodd"
              fill="#fff"
              d="M11.000,-0.000 L9.000,-0.000 L9.000,9.000 L-0.000,9.000 L-0.000,11.000 L9.000,11.000 L9.000,20.000 L11.000,20.000 L11.000,11.000 L20.000,11.000 L20.000,9.000 L11.000,9.000 L11.000,-0.000 Z"
            />
          </svg>
        </div>
      </div>
      <vue-custom-scrollbar
        class="scroll-area log"
        :settings="settings"
        @ps-scroll-y="scrollHandle"
      >
        <p>Journey Log</p>
        <div class="cruises">
          <div class="cruise">
            <p class="date">June 2019</p>
            <div v-for="log in journeylogs" :key="log.id" class="destination">
              <p
                class="date"
              >{{log.log_time.toDate().getDate()}}.{{log.log_time.toDate().getMonth() + 1}}.{{log.log_time.toDate().getFullYear()}}</p>
              <p class="name">{{log.name}}</p>
              <div class="description" v-if="log.notes">
                <p>{{log.notes}}</p>
              </div>
              <div class="images" v-if="log.photos">
                <div v-for="photo in log.photos.slice(0, 5)" :key="photo.id">
                  <img :src="photo.thumburl" alt />
                </div>
                <div v-if="log.photos.length > 5">
                  <img :src="log.photos[5].id + '_thumb.jpg'" alt />
                  <div v-if="log.photos.length > 6" class="overlay">
                    <span>+{{log.photos.length - 5}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vue-custom-scrollbar>
    </div>
    <TheMap
      v-bind:coordinates="coordinates"
      v-bind:journeylogs="journeylogs"
      v-bind:segments="segments"
      @addLog="showAddLog"
    />
    <AddLog
      v-if="isAddLogVisible"
      @close="isAddLogVisible = false;"
      @submit="addNewLog"
      v-bind:coords="selectedCoords"
    />
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
  </div>
</template>

<script>
import VueCustomScrollbar from "vue-custom-scrollbar";
import { firestore } from "../firebase";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import AddLog from "../components/AddLog.vue";
import TheMap from "../components/TheMap.vue";

export default {
  name: "Home",
  components: {
    VueCustomScrollbar,
    AddLog,
    Loading,
    TheMap
  },
  data() {
    return {
      coordinates: [],
      journeylogs: [],
      segments: [],
      settings: {
        maxScrollbarLength: 60
      },
      isAddLogVisible: false,
      isLoading: false
    };
  },
  mounted() {
    this.isLoading = true;
    this.$bind(
      "coordinates",
      firestore.collection("coordinates").orderBy("time", "asc")
    ).then(
      this.$bind(
        "journeylogs",
        firestore
          .collection("journeylogs")
          .where("draft", "==", false)
          .orderBy("log_time", "desc")
      ).then(() => {
        this.isLoading = false;
      })
    );
  },
  methods: {
    showAddLog(id = null) {
      this.selectedCoords = id;
      this.isAddLogVisible = true;
    },
    addNewLog(log) {
      console.log("add log " + JSON.stringify(log));
      this.isAddLogVisible = false;
      this.drawMap();
    },
    scrollHandle() {
      console.log("scrolling");
    }
  }
};
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
  width: 444px;
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
        background-color: $control-hover;
      }
    }
  }
  & > .log {
    height: 100%;
    overflow-y: scroll;
    font-size: 20px;
    padding: 20px 19px 20px 25px;
    background-color: #ececec;
    display: flex;
    flex-flow: column nowrap;
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
              content: "";
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
</style>