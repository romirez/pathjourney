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
            <p class="name">Summer Carribean Cruise 2019</p>
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
      <!--<iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1949267.7723894767!2d-63.290313000554626!3d17.403933846161287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sst+martin+google+maps!5e0!3m2!1sru!2sru!4v1562323202208!5m2!1sru!2sru" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>-->
      <GmapMap
              :center="map.center"
              :zoom="7"
              style="width: 100%; height: 100%"
              ref="mapRef"
      >
      </GmapMap>
    </div>
    <div id="content" class="content balloon">
      <div class="destination balloon">
        <p class="date">{{map.current_info.date}}</p>
        <p class="name">{{map.current_info.note_name}}</p>
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
</template>

<script>
import VueCustomScrollbar from 'vue-custom-scrollbar'
import * as VueGoogleMaps from 'vue2-google-maps';
import image_marker from '../assets/images/marker.png'
import image_marker_selected from '../assets/images/marker-selected.png'
import { firestore } from '../firebase'

export default {
  name: 'Home',
  components: {
    VueCustomScrollbar
  },
  firestore: {
    coordinates: firestore.collection('coordinates'),
    journeylogs: firestore.collection('journeylogs'),
    segments: firestore.collection('journeylogs')
  },
  data() {
    return {
      coordinates: [],
      map: {
        center: {lat:18.073099, lng:-63.082199},
        markers: {
          segments: [
            {
              notes: [
                {
                  date: '16.06.2019',//there will be note info (date, description/photos urls)
                  coords: {lat:18.073099, lng:-63.082199},
                  selected: false, // state for marker,
                  marker: null
                },
                {
                  date: '16.05.2019',
                  coords: {lat:19.073101, lng:-62.082300},
                  selected: false, // state for marker,
                  marker: null
                },
                {
                  date: '16.04.2019',
                  coords: {lat:20.073102, lng:-61.082202},
                  selected: false, // state for marker,
                  marker: null
                },
                {
                  date: '16.03.2019',
                  coords: {lat:21.073104, lng:-60.082204},
                  selected: false, // state for marker,
                  marker: null
                },
                {
                  date: '16.02.2019',
                  coords: {lat:22.073105, lng:-66.082205},
                  selected: false, // state for marker,
                  marker: null
                }
              ]
            }
          ]
        },
        current_info: {
          date: '19.06.2019',
          note_name: 'St Martin',
          img_urls: [] //urls will be there
        }
      },
      map_ref: null
    }
  },
  computed: {
    google: VueGoogleMaps.gmapApi,
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then((map) => {
      this.map_ref = map;
      this.init();
    });
  },
  methods: {
    init() {
      const Popup = this.createPopupClass(this);

      const polyline_coords = []
      this.map.markers.segments.forEach((segment) => {
        segment.notes.forEach((note) => {
          polyline_coords.push(note.coords)
        })
      })
      const polyline = new this.google.maps.Polyline({
        path: polyline_coords,
        geodesic: true,
        strokeColor: '#f6655b',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      polyline.setMap(this.map_ref)

      this.map.markers.segments.forEach((segment) => {
        segment.notes.forEach((note) => {
          const marker = new this.google.maps.Marker({
            position: note.coords,
            map: this.map_ref,
            icon: note.selected
              ? {url: image_marker_selected, origin: new this.google.maps.Point(0, 0), anchor: new this.google.maps.Point(10, 10), size: new this.google.maps.Size(20, 20)}
              : {url: image_marker, origin: new this.google.maps.Point(0, 0), anchor: new this.google.maps.Point(6, 6), size: new this.google.maps.Size(12, 12)}
          });
          note.marker = marker
          marker.addListener('click', () => {

            this.map.markers.segments.forEach((segment) => {
              segment.notes.forEach((note) => {
                note.selected = false
                note.marker.setIcon({url: image_marker, origin: new this.google.maps.Point(0, 0), anchor: new this.google.maps.Point(6, 6), size: new this.google.maps.Size(12, 12)})
              })
            }) // unselect all markers

            marker.setIcon({url: image_marker_selected, origin: new this.google.maps.Point(0, 0), anchor: new this.google.maps.Point(10, 10), size: new this.google.maps.Size(20, 20)}) //selected clicked marker
            const popup = new Popup(
              new this.google.maps.LatLng(note.coords.lat, note.coords.lng), document.getElementById('content'));
            popup.setMap(this.map_ref);
          })
        })
      })
    },
    createPopupClass(context) {

      function Popup(position, content) {
        this.position = position;
        content.classList.add('popup-bubble');

        // This zero-height div is positioned at the bottom of the bubble.
        var bubbleAnchor = document.createElement('div');
        bubbleAnchor.classList.add('popup-bubble-anchor');
        bubbleAnchor.appendChild(content);

        // This zero-height div is positioned at the bottom of the tip.
        this.containerDiv = document.createElement('div');
        this.containerDiv.classList.add('popup-container');
        this.containerDiv.appendChild(bubbleAnchor);

        // Optionally stop clicks, etc., from bubbling up to the map.
        context.google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
      }
      // ES5 magic to extend google.maps.OverlayView.
      Popup.prototype = Object.create(context.google.maps.OverlayView.prototype);

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
        var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

        // Hide the popup when it is far out of view.
        var display =
          Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
            'block' :
            'none';

        if (display === 'block') {
          this.containerDiv.style.left = divPosition.x + 'px';
          this.containerDiv.style.top = divPosition.y + 'px';
        }
        if (this.containerDiv.style.display !== display) {
          this.containerDiv.style.display = display;
        }
      };

      return Popup;
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
          background-color: $control-hover
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
          content: '';
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