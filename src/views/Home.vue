<template>
  <div class="home">
    <div class="journey-log">
      <div class="header">
        <div class="logo">
          <img src="../assets/images/home-logo.png" alt />
        </div>
        <div class="menu">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <i class="material-icons" title="Menu">more_horiz</i>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <router-link to="/logout">
                    <i class="material-icons" title="Logout">logout</i> Logout
                  </router-link>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <v-tabs v-model="tabs">
        <v-tabs-slider color="#31b9f1"></v-tabs-slider>
        <v-tab>Journey Log</v-tab>
        <v-tab>Segments</v-tab>
      </v-tabs>
      <vue-custom-scrollbar class="scroll-area log" :settings="settings" v-if="tabs == 0">
        <div class="header">
          <p>Journey Log</p>
          <div
            class="add-button"
            @click="showAddLog(null)"
            v-if="user && user.admin"
            title="Add new log"
          >
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
        <div class="cruises" v-for="(month, index) in logHierarchy" :key="index">
          <div class="cruise">
            <p class="date" v-if="month.name">{{month.name}}</p>
            <div
              class="destination"
              :class="selectedLog == log ? 'selected' : ''"
              @click="selectedLog = log"
              v-for="log in month.logs"
              :key="log.id"
            >
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
                  <img :src="log.photos[5].thumburl" alt />
                  <div v-if="log.photos.length > 6" class="overlay">
                    <span>+{{log.photos.length - 5}}</span>
                  </div>
                </div>
              </div>
              <v-btn icon class="remove" v-if="user && user.admin" @click.stop="removeLog(log)">
                <i class="material-icons" title="Remove log">delete</i>
              </v-btn>
            </div>
          </div>
        </div>
      </vue-custom-scrollbar>
      <vue-custom-scrollbar class="scroll-area log" :settings="settings" v-if="tabs == 1">
        <div class="header">
          <p>Segments</p>
          <div
            class="add-button"
            @click="showAddSegment()"
            v-if="user && user.admin"
            title="Add new segment"
          >
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
        <div class="cruises" v-for="(segment, index) in segments" :key="index">
          <div class="cruise">{{segment.name}}</div>
          <v-btn icon class="remove" v-if="user && user.admin" @click.stop="removeSegment(segment)">
            <i class="material-icons" title="Remove segment">delete</i>
          </v-btn>
        </div>
      </vue-custom-scrollbar>
    </div>
    <TheMap
      v-if="!isLoading"
      v-bind:coordinates="coordinates"
      v-bind:journeylogs="journeylogs"
      v-bind:segments="segments"
      v-bind:selectedLog="selectedLog"
      @addLog="showAddLog"
      @selectedLog="selectLog"
    />
    <AddLog
      v-if="isAddLogVisible && user && user.admin"
      @close="isAddLogVisible = false;"
      @submit="addNewLog"
      v-bind:coords="selectedCoords"
    />
    <AddSegment
      v-if="isAddSegmentVisible && user && user.admin"
      @close="isAddSegmentVisible = false;"
      @submit="addNewSegment"
    />
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true" :opacity="1"></loading>
    <div v-if="permissionError" class="permissionError">
      You don't have permissions to access this page.
      <div class="logout">
        <router-link to="/logout">Logout</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import VueCustomScrollbar from "vue-custom-scrollbar";
import { firestore } from "../firebase";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import AddLog from "../components/AddLog.vue";
import AddSegment from "../components/AddSegment.vue";
import TheMap from "../components/TheMap.vue";

export default {
  name: "Home",
  components: {
    VueCustomScrollbar,
    AddLog,
    AddSegment,
    Loading,
    TheMap
  },
  data() {
    return {
      coordinates: [],
      journeylogs: [],
      segments: [],
      selectedLog: null,
      selectedCoords: null,
      settings: {
        maxScrollbarLength: 60
      },
      isAddLogVisible: false,
      isAddSegmentVisible: false,
      isLoading: false,
      permissionError: false,
      user: null,
      tabs: null //v-model for the sidebar tabs
    };
  },
  computed: {
    logHierarchy() {
      var h = [];
      var m = null;
      this.journeylogs
        .concat()
        .sort((a, b) => {
          return a.log_time.toDate() < b.log_time.toDate();
        })
        .forEach(log => {
          var nm =
            log.log_time.toDate().toLocaleString("default", { month: "long" }) +
            " " +
            log.log_time.toDate().getFullYear();
          if (nm != m) {
            h.push({
              name: nm,
              logs: [log]
            });
            m = nm;
          } else {
            h[h.length - 1].logs.push(log);
          }
        });
      return h;
    }
  },
  mounted() {
    this.isLoading = true;
        console.log("binding");
    this.$bind(
      "coordinates",
      firestore.collection("coordinates").orderBy("time", "asc")
    )
      .then(
        this.$bind(
          "journeylogs",
          firestore
            .collection("journeylogs")
            .where("draft", "==", false)
            .orderBy("log_time", "desc")
        )
          .then(
            this.$bind(
              "segments",
              firestore
                .collection("segments")
                .where("draft", "==", false)
                .orderBy("end_date", "desc")
            )
              .then(() => {
                this.$bind(
                  "user",
                  firestore
                    .collection("users")
                    .doc(firebase.auth().currentUser.uid)
                )
                  .then(() => {
                    console.log("bindings done");
                    this.isLoading = false;
                  })
                  .catch(e => {
                    console.log(e);
                    this.permissionError = true;
                    this.isLoading = false;
                  });
              })
              .catch(e => {
                console.log(e);
                this.permissionError = true;
                this.isLoading = false;
              })
          )
          .catch(e => {
            console.log(e);
            this.permissionError = true;
            this.isLoading = false;
          })
      )
      .catch(e => {
        console.log(e);
        this.permissionError = true;
        this.isLoading = false;
      });
  },
  methods: {
    showAddLog(id) {
      this.selectedCoords = id;
      this.isAddLogVisible = true;
    },
    showAddSegment() {
      this.isAddSegmentVisible = true;
    },
    selectLog(log) {
      this.selectedLog = log;
    },
    addNewLog(log) {
      console.log("add log " + JSON.stringify(log));
      this.isAddLogVisible = false;
    },
    addNewSegment(segment) {
      console.log("add segment " + JSON.stringify(segment));
      this.isAddSegmentVisible = false;
    },
    async removeLog(log) {
      const res = await this.$dialog.confirm({
        text: "Are you sure you want to remove this log?",
        title: "Warning"
      });

      if (res) {
        if (this.selectedLog && this.selectedLog.id == log.id) {
          this.selectedLog = null;
        }
        firestore
          .collection("journeylogs")
          .doc(log.id)
          .delete();
      }
    },
    async removeSegment(segment) {
      const res = await this.$dialog.confirm({
        text: "Are you sure you want to remove this segment?",
        title: "Warning"
      });

      if (res) {
        if (this.selectedSegment && this.selectedSegment.id == segment.id) {
          this.selectedSegment = null;
        }
        firestore
          .collection("segments")
          .doc(segment.id)
          .delete();
      }
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

  & > .v-tabs {
    margin: 0px 10px;
  }

  & > .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 10px 17px;

    a {
      color: black;
      text-decoration: none;
    }
  }

  & > .log {
    height: 100%;
    width: 444px;
    overflow-y: scroll;
    font-size: 20px;
    padding: 20px 19px 20px 25px;
    background-color: #ececec;
    display: flex;
    flex-flow: column nowrap;
    & > .header {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
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
    & > .cruises {
      margin-top: 10px;
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
          & > .remove {
            color: #a7a7a7;
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
                  width: 60px;
                  height: 60px;
                }
              }
              margin-left: 1px;
            }
          }
          & > .remove {
            font-size: 15px;
            text-decoration: none;
            position: absolute;
            right: 0px;
            top: 0px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.permissionError {
  z-index: 999;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  background-color: #ffffff;
  padding-top: 100px;
  text-align: center;
}
</style>