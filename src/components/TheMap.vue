<template>
  <div class="map">
    <GmapMap :center="map.center" :zoom="7" style="width: 100%; height: 100%" ref="mapRef">
      <GmapMarker
        v-for="log in logsWithCoordinates"
        :key="log.id"
        :position="{ lat: log['coordinates'].location._lat, lng: log['coordinates'].location._long}"
        :clickable="true"
        :draggable="false"
        :icon="map.selected == log ? markerSelectedIcon : markerIcon"
        @mouseover="map.selected = log"
        @mousemove="map.selected = log"
      />
      <gmap-info-window
        v-if="map.selected"
        :options="{pixelOffset: {width: 0,height: -10}}"
        :position="selectedLogCoords"
        @closeclick="map.selected = null"
      >
        <div class="destination balloon">
          <p
            class="date"
          >{{map.selected.log_time.toDate().getDate()}}.{{map.selected.log_time.toDate().getMonth() + 1}}.{{map.selected.log_time.toDate().getFullYear()}}</p>
          <p class="name">{{map.selected.name}}</p>
          <p class="description" v-if="map.selected.notes">{{map.selected.notes}}</p>
          <div class="images" v-if="map.selected.photos">
            <div v-for="photo in map.selected.photos.slice(0, 5)" :key="photo.id">
              <img :src="photo.thumburl" alt />
            </div>
            <div v-if="map.selected.photos.length > 5">
              <img :src="map.selected.photos[5].id + '_thumb.jpg'" alt/>
              <div v-if="map.selected.photos.length > 6" class="overlay">
                <span>+{{map.selected.photos.length - 5}}</span>
              </div>
            </div>
          </div>
        </div>
      </gmap-info-window>
      <div v-for="(path, index) in polypath" :key="index">
        <gmap-polyline
          :path="path.coordinates"
          :editable="false"
          :draggable="false"
          :options="{geodesic:true, strokeColor:path.color}"
        />
        <gmap-polyline
          :path="path.coordinates"
          :editable="false"
          :draggable="false"
          :options="{geodesic:true, strokeColor:path.color, strokeOpacity: 0.1, strokeWeight: 40}"
          @click="pathClick(path, $event)"
          @mouseout="map.linehover = null"
          @mousemove="polyMouseMove(path, $event)"
        />
      </div>
      <GmapMarker
        v-if="map.linehover && !map.selected"
        :position="map.linehover"
        :clickable="false"
        :draggable="false"
        :icon="markerIcon"
      />
      <gmap-info-window
        v-if="map.linehover && !map.selected"
        :options="{pixelOffset: {width: 0,height: -10}}"
        :position="map.linehover"
        @closeclick="map.linehover = null"
      >
        <div v-if="map.linehover">
          <p>{{map.linehover.time | formatDate}}</p>
          <p>Source: {{map.linehover.source}}</p>
        </div>
      </gmap-info-window>
    </GmapMap>
  </div>
</template>
<script>
import * as VueGoogleMaps from "vue2-google-maps";
import image_marker from "../assets/images/marker.png";
import image_marker_selected from "../assets/images/marker-selected.png";
import moment from "moment";
import { getClosestPointOnLines } from "../snaptoroute.js";

export default {
  name: "TheMap",
  props: {
    coordinates: Array,
    journeylogs: Array,
    segments: Array
  },
  data() {
    return {
      map: {
        center: { lat: 42.36197, lng: 8.773408 },
        selected: null,
        linehover: null,
        infoWindowPos: null
      },
      map_ref: null
    };
  },
  filters: {
    formatDate: function(value) {
      if (value) {
        return moment(value).format("MMM Do YY, h:mm a");
      }
    }
  },
  computed: {
    google: VueGoogleMaps.gmapApi,
    logsWithCoordinates() {
      return this.journeylogs.filter(log => {
        return log["coordinates"].location;
      });
    },
    markerIcon() {
      return {
        url: image_marker,
        origin: new this.google.maps.Point(0, 0),
        anchor: new this.google.maps.Point(6, 6),
        size: new this.google.maps.Size(12, 12)
      };
    },
    markerSelectedIcon() {
      return {
        url: image_marker_selected,
        origin: new this.google.maps.Point(0, 0),
        anchor: new this.google.maps.Point(10, 10),
        size: new this.google.maps.Size(20, 20)
      };
    },
    polypath() {
      function getSegment(segment) {
        const c1 = [];
        segment.forEach(doc => {
          c1.push({
            lat: doc["location"].latitude,
            lng: doc["location"].longitude,
            id: doc.id,
            time: doc.time.toDate(),
            source: doc.source
          });
        });
        return c1;
      }

      var date = new Date();
      const segments = [];
      segments.push({
        color: "#F6655B",
        stroke: 4,
        opacity: 1,
        coordinates: getSegment(
          this.coordinates.filter(
            c =>
              c.time.toDate() > new Date(date.getFullYear(), date.getMonth(), 1)
          )
        )
      });

      segments.push({
        color: "#F9B55A",
        stroke: 4,
        opacity: 1,
        coordinates: getSegment(
          this.coordinates.filter(
            c =>
              c.time.toDate() >
                new Date(date.getFullYear(), date.getMonth() - 1, 1) &&
              c.time.toDate() < new Date(date.getFullYear(), date.getMonth(), 1)
          )
        )
      });

      segments.push({
        color: "#E0CB91",
        stroke: 4,
        opacity: 1,
        coordinates: getSegment(
          this.coordinates.filter(
            c =>
              c.time.toDate() <
              new Date(date.getFullYear(), date.getMonth() - 1, 1)
          )
        )
      });

      return segments;
    },
    selectedLogCoords() {
      return new this.google.maps.LatLng(
        this.map.selected["coordinates"]["location"].latitude,
        this.map.selected["coordinates"]["location"].longitude
      );
    }
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => {
      this.map_ref = map;
    });
  },
  methods: {
    closestPoint(path, e) {
      var routePixels = new Array();
      var proj = this.map_ref.getProjection();
      for (var i = 0; i < path.coordinates.length; i++) {
        var Px = proj.fromLatLngToPoint(
          new this.google.maps.LatLng(
            path.coordinates[i].lat,
            path.coordinates[i].lng
          )
        );
        routePixels.push(Px);
      }

      var thisPx = proj.fromLatLngToPoint(e.latLng);
      var res = getClosestPointOnLines(thisPx, routePixels);

      return res.fFrom < res.fTo
        ? path.coordinates[res.i]
        : path.coordinates[res.i - 1];
    },
    pathClick(path, e) {
      var p = this.closestPoint(path, e);
      // The closest point in the polyline
      this.$emit("addLog", p.id);
      this.isAddLogVisible = true;
    },
    polyMouseMove(path, e) {
      if (this.map.selected == null)
        this.map.linehover = this.closestPoint(path, e);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/custom.scss";

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
</style>
