<template>
  <div class="map">
    <GmapMap :center="center" :zoom="7" style="width: 100%; height: 100%" ref="mapRef">
      <!-- all log markers -->
      <GmapMarker
        v-for="log in logsWithCoordinates"
        :key="log.id"
        :position="{ lat: log['coordinates'].location._lat, lng: log['coordinates'].location._long}"
        :clickable="true"
        :draggable="false"
        :icon="loghover == log ? markerSelectedIcon : markerIcon"
        @mouseover="loghover = log"
        @mousemove="loghover = log"
        @mouseout="loghover = null"
        @click="$emit('selectedLog', log)"
      />
      <!-- info window on log hover -->
      <gmap-info-window
        v-if="infoWindowLog"
        :options="{pixelOffset: {width: 0,height: -10}}"
        :position="selectedLogCoords"
        @closeclick="$emit('selectedLog', null)"
      >
        <div class="destination balloon">
          <p
            class="date"
          >{{infoWindowLog.log_time.toDate().getDate()}}.{{infoWindowLog.log_time.toDate().getMonth() + 1}}.{{infoWindowLog.log_time.toDate().getFullYear()}}</p>
          <p class="name">{{infoWindowLog.name}}</p>
          <p class="description" v-if="infoWindowLog.notes">{{infoWindowLog.notes}}</p>
          <div class="images" v-if="infoWindowLog.photos">
            <div v-for="photo in infoWindowLog.photos.slice(0, 5)" :key="photo.id">
              <img :src="photo.thumburl" alt />
            </div>
            <div v-if="infoWindowLog.photos.length > 5">
              <img :src="infoWindowLog.photos[5].id + '_thumb.jpg'" alt />
              <div v-if="infoWindowLog.photos.length > 6" class="overlay">
                <span>+{{infoWindowLog.photos.length - 5}}</span>
              </div>
            </div>
          </div>
        </div>
      </gmap-info-window>
      <!-- poly paths -->
      <div v-for="(path, index) in polypath" :key="index">
        <gmap-polyline
          :path="path.coordinates"
          :editable="false"
          :draggable="false"
          :options="{geodesic:true, strokeColor:path.color, zIndex: 100-index}"
        />
        <gmap-polyline
          :path="path.coordinates"
          :editable="false"
          :draggable="false"
          :options="{geodesic:true, strokeColor:path.color, strokeOpacity: 0.1, strokeWeight: 40, zIndex: 100-index}"
          @click="pathClick(path, $event)"
          @mouseout="linehover = null"
          @mousemove="polyMouseMove(path, $event)"
        />
      </div>
      <!-- marker for last location -->
      <GmapMarker
        v-if="map_ref"
        :position="center"
        :clickable="false"
        :draggable="false"
        :icon="pathMarkerIcon"
      />
      <!-- marker for poly point hover -->
      <GmapMarker
        v-if="linehover && !loghover"
        :position="linehover"
        :clickable="false"
        :draggable="false"
        :icon="markerIcon"
      />
      <!-- info window on poly point hover -->
      <gmap-info-window
        v-if="linehover && !loghover"
        :options="{pixelOffset: {width: 0,height: -10}}"
        :position="linehover"
        @closeclick="linehover = null"
      >
        <div v-if="linehover">
          <p>{{linehover.time | formatDate}}</p>
          <p>Source: {{linehover.source}}</p>
        </div>
      </gmap-info-window>
    </GmapMap>
    <ViewLog v-if="selectedLog" :log="selectedLog" />
  </div>
</template>
<script>
import * as VueGoogleMaps from "vue2-google-maps";
import image_marker from "../assets/images/marker.png";
import image_marker_selected from "../assets/images/marker-selected.png";
import image_path_marker from "../assets/images/pathmarker.png";
import moment from "moment";
import { getClosestPointOnLines } from "../snaptoroute.js";
import ViewLog from "../components/ViewLog.vue";

export default {
  name: "TheMap",
  components: { ViewLog },
  props: {
    coordinates: Array,
    journeylogs: Array,
    segments: Array,
    selectedLog: Object
  },
  data() {
    return {
      loghover: null,
      linehover: null,
      infoWindowPos: null,
      map_ref: null,
      pathMarkerImg: null
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
    center() {
      if (!this.coordinates || this.coordinates.length == 0)
        return { lat: 42.36197, lng: 8.773408 };
      return {
        lat: this.coordinates[this.coordinates.length - 1]["location"].latitude,
        lng: this.coordinates[this.coordinates.length - 1]["location"].longitude
      };
    },
    infoWindowLog() {
      return this.selectedLog ? this.selectedLog : this.loghover;
    },
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
    pathMarkerIcon() {
      var canv = document.createElement("canvas");
      canv.width = 16;
      canv.height = 16;

      var p1 = new this.google.maps.LatLng(
        this.coordinates[this.coordinates.length - 2]["location"].latitude,
        this.coordinates[this.coordinates.length - 2]["location"].longitude
      );
      var p2 = new this.google.maps.LatLng(
        this.coordinates[this.coordinates.length - 1]["location"].latitude,
        this.coordinates[this.coordinates.length - 1]["location"].longitude
      );

      var heading = this.google.maps.geometry.spherical.computeHeading(p1, p2);

      var ctx = canv.getContext("2d");
      ctx.save();
      ctx.translate(8, 8);
      ctx.rotate((heading * Math.PI) / 180);
      ctx.drawImage(this.pathMarkerImg, -8, -8);
      ctx.restore();

      return {
        url: canv.toDataURL(),
        origin: new this.google.maps.Point(0, 0),
        anchor: new this.google.maps.Point(8, 8),
        size: new this.google.maps.Size(16, 16)
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
      function getSegments(segment) {
        const segments = [[]];
        var lastdate = null;
        segment.forEach(doc => {
          if (lastdate != null && doc.time.toDate() - lastdate > 604800000) {
            // check if date gap is > 1 week and split segments if so
            segments.push([]);
          }
          lastdate = doc.time.toDate();
          segments[segments.length - 1].push({
            lat: doc["location"].latitude,
            lng: doc["location"].longitude,
            id: doc.id,
            time: doc.time.toDate(),
            source: doc.source
          });
        });
        return segments;
      }

      var date = new Date();
      const segments = [];

      var coordsegments = getSegments(
        this.coordinates.filter(
          c =>
            c.time.toDate() <
            new Date(date.getFullYear(), date.getMonth() - 1, 1)
        )
      );
      coordsegments.forEach(coords => {
        segments.push({
          color: "#C6C1AB",
          stroke: 4,
          opacity: 1,
          coordinates: coords
        });
      });

      coordsegments = getSegments(
        this.coordinates.filter(
          c =>
            c.time.toDate() >
              new Date(date.getFullYear(), date.getMonth() - 1, 1) &&
            c.time.toDate() < new Date(date.getFullYear(), date.getMonth(), 1)
        )
      );
      coordsegments.forEach(coords => {
        segments.push({
          color: "#DCBF85",
          stroke: 4,
          opacity: 1,
          coordinates: coords
        });
      });

      coordsegments = getSegments(
        this.coordinates.filter(
          c =>
            c.time.toDate() > new Date(date.getFullYear(), date.getMonth(), 1)
        )
      );
      coordsegments.forEach(coords => {
        segments.push({
          color: "#F6655B",
          stroke: 4,
          opacity: 1,
          coordinates: coords
        });
      });

      //add last point to next segment to have unbroken path
      for (var i = 0; i < segments.length - 1; i++) {
        if (
          segments[i].coordinates.length > 0 &&
          segments[i + 1].coordinates.length > 0 &&
          segments[i].coordinates[segments[i].coordinates.length - 1].time -
            segments[i + 1].coordinates[0].time >
            -604800000
        ) {
          console.log(
            segments[i].coordinates[segments[i].coordinates.length - 1].time -
              segments[i + 1].coordinates[0].time
          );
          segments[i].coordinates.push(segments[i + 1].coordinates[0]);
        }
      }

      return segments.reverse();
    },
    selectedLogCoords() {
      return new this.google.maps.LatLng(
        this.infoWindowLog["coordinates"]["location"].latitude,
        this.infoWindowLog["coordinates"]["location"].longitude
      );
    }
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => {
      this.map_ref = map;
    });
    this.pathMarkerImg = new Image();
    this.pathMarkerImg.src = image_path_marker;
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
      if (this.loghover == null) this.linehover = this.closestPoint(path, e);
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
