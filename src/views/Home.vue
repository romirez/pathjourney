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
    <div class="map">
      <GmapMap :center="map.center" :zoom="7" style="width: 100%; height: 100%" ref="mapRef">
        <!-- leave for better days when I can properly implement this :(
        <gmap-marker
          v-for="log in journeylogs"
          :key="log.id"
          :position="{lat: log['coordinates'].location.latitude, lng: 0}"
          :opacity="1"
          :draggable="false"
          :icon="iconSettings()"
        ></gmap-marker>
        -->
      </GmapMap>
    </div>
    <AddLog v-if="isAddLogVisible" @close="hideAddLog" @submit="addNewLog"></AddLog>
    <div id="content" class="content balloon">
      <div class="destination balloon" v-if="map.selected">
        <p
          class="date"
        >{{map.selected.log_time.toDate().getDate()}}.{{map.selected.log_time.toDate().getMonth() + 1}}.{{map.selected.log_time.toDate().getYear()}}</p>
        <p class="name">{{map.selected.name}}</p>
        <p class="description" v-if="map.selected.notes">{{map.selected.notes}}</p>
        <div class="images" v-if="map.selected.photos">
          <div v-for="photo in map.selected.photos.slice(0, 5)" :key="photo.id">
            <img :src="photo.thumburl" alt />
          </div>
          <div v-if="map.selected.photos.length > 5">
            <img :src="map.selected.photos[5].id + '_thumb.jpg'" alt />
            <div v-if="map.selected.photos.length > 6" class="overlay">
              <span>+{{map.selected.photos.length - 5}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCustomScrollbar from "vue-custom-scrollbar";
import * as VueGoogleMaps from "vue2-google-maps";
import image_marker from "../assets/images/marker.png";
import image_marker_selected from "../assets/images/marker-selected.png";
import { firestore } from "../firebase";
import AddLog from '../components/addlog.vue'

export default {
  name: "Home",
  components: {
    VueCustomScrollbar,
    AddLog
  },
  data() {
    return {
      coordinates: [],
      journeylogs: [],
      segments: [],
      map: {
        center: { lat: 42.36197, lng: 8.773408 },
        selected: null,
        markers: {}
      },
      map_ref: null,
      settings: {
        maxScrollbarLength: 60
      },
      isAddLogVisible: false
    };
  },
  computed: {
    google: VueGoogleMaps.gmapApi
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => {
      this.map_ref = map;

      this.$bind("coordinates", firestore.collection("coordinates")).then(
        this.$bind("journeylogs", firestore.collection("journeylogs")).then(
          () => {
            this.drawMap();
          }
        )
      );
    });
  },
  updated() {
    //TODO: need to figure out where to redraw poly and markers (if we want to make it reactive) - this gets called too often when initializing
    //this.init()
  },
  methods: {
    showAddLog() {
      this.isAddLogVisible = true;
    },
    hideAddLog() {
      this.isAddLogVisible = false;
    },
    addNewLog(log) {
      console.log ("add log " + JSON.stringify(log));
      this.hideAddLog();
    },
    scrollHandle() {
      console.log("scrolling");
    },

    // Draw a poly line on map
    drawPoly(coordinates, color, weight, opacity) {
      const polyline_coords = [];
      coordinates.forEach(doc => {
        polyline_coords.push({
          lat: doc["location"].latitude,
          lng: doc["location"].longitude
        });
      });
      const polyline = new this.google.maps.Polyline({
        path: polyline_coords,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: opacity,
        strokeWeight: weight
      });
      polyline.setMap(this.map_ref);
    },

    // Draw markers on map based on this.journeylog
    drawMarkers() {
      const Popup = this.createPopupClass(this);
      this.map.markers = [];

      this.journeylogs.forEach(log => {
        const marker = new this.google.maps.Marker({
          position: {
            lat: log.coordinates["location"].latitude,
            lng: log.coordinates["location"].longitude
          },
          map: this.map_ref,
          icon: {
            url: image_marker,
            origin: new this.google.maps.Point(0, 0),
            anchor: new this.google.maps.Point(6, 6),
            size: new this.google.maps.Size(12, 12)
          }
        });

        this.map.markers.push({ log: log, marker: marker, selected: false });
        marker.addListener("mouseover", () => {
          console.log("mouseover");
          this.map.selected = log;
          marker.setIcon({
            url: image_marker_selected,
            origin: new this.google.maps.Point(0, 0),
            anchor: new this.google.maps.Point(10, 10),
            size: new this.google.maps.Size(20, 20)
          }); //selected clicked marker
          const popup = new Popup(
            new this.google.maps.LatLng(
              log["coordinates"]["location"].latitude,
              log["coordinates"]["location"].longitude
            ),
            document.getElementById("content")
          );
          popup.setMap(this.map_ref);
        });
        marker.addListener("mouseout", () => {
          console.log("mouseout");
          this.map.markers.forEach(marker => {
            marker.selected = false;
            marker.marker.setIcon({
              url: image_marker,
              origin: new this.google.maps.Point(0, 0),
              anchor: new this.google.maps.Point(6, 6),
              size: new this.google.maps.Size(12, 12)
            });
          }); //unselect all markers
          this.map.selected = null;
        });
      });
    },

    drawMap() {
      console.log("init");
      var date = new Date();

      var thismonth = this.coordinates.filter(
        c => c.time.toDate() > new Date(date.getFullYear(), date.getMonth(), 1)
      );
      this.drawPoly(thismonth, "#F6655B", 4, 1);
      var lastmonth = this.coordinates.filter(
        c =>
          c.time.toDate() >
            new Date(date.getFullYear(), date.getMonth() - 1, 1) &&
          c.time.toDate() < new Date(date.getFullYear(), date.getMonth(), 1)
      );
      this.drawPoly(lastmonth, "#F6655B", 2, 1);
      var alltime = this.coordinates.filter(
        c =>
          c.time.toDate() < new Date(date.getFullYear(), date.getMonth() - 1, 1)
      );
      this.drawPoly(alltime, "#F6655B", 1, 0.8);
      this.drawMarkers();
    },

    createPopupClass(context) {
      function Popup(position, content) {
        this.position = position;
        content.classList.add("popup-bubble");

        // This zero-height div is positioned at the bottom of the bubble.
        var bubbleAnchor = document.createElement("div");
        bubbleAnchor.classList.add("popup-bubble-anchor");
        bubbleAnchor.appendChild(content);

        // This zero-height div is positioned at the bottom of the tip.
        this.containerDiv = document.createElement("div");
        this.containerDiv.classList.add("popup-container");
        this.containerDiv.appendChild(bubbleAnchor);

        // Optionally stop clicks, etc., from bubbling up to the map.
        context.google.maps.OverlayView.preventMapHitsAndGesturesFrom(
          this.containerDiv
        );
      }
      // ES5 magic to extend google.maps.OverlayView.
      Popup.prototype = Object.create(
        context.google.maps.OverlayView.prototype
      );

      /** Called when the popup is added to the map. */
      Popup.prototype.onAdd = function() {
        this.getPanes().floatPane.appendChild(this.containerDiv);
      };

      /** Called when the popup is removed from the map. */
      Popup.prototype.onRemove = function() {
        if (this.containerDiv.parentElement) {
          this.containerDiv.parentElement.removeChild(this.containerDiv);
        }
      };

      /** Called each frame when the popup needs to draw itself. */
      Popup.prototype.draw = function() {
        var divPosition = this.getProjection().fromLatLngToDivPixel(
          this.position
        );

        // Hide the popup when it is far out of view.
        var display =
          Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
            ? "block"
            : "none";

        if (display === "block") {
          this.containerDiv.style.left = divPosition.x + "px";
          this.containerDiv.style.top = divPosition.y - 60 + "px";
        }
        if (this.containerDiv.style.display !== display) {
          this.containerDiv.style.display = display;
        }
      };

      return Popup;
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
.map {
  height: 100%;
  width: 100%;
  position: relative;
  & > iframe {
    width: 100% !important;
    height: 100% !important;
  }
  & > .destination {
    display: flex;
    flex-flow: column nowrap;
    position: absolute;
    left: 500px;
    top: 300px;
    &.balloon {
      box-shadow: 0px 2px 15px 0px rgba(236, 236, 236, 0.75);
      &:after {
        display: block;
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 10px 0 10px;
        border-color: #ffffff transparent transparent transparent;
        position: absolute;
        bottom: -10px;
        left: calc(50% - 10px);
      }
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
}</style>