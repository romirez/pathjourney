<template>
  <div class="destination-content">
    <p
      class="date"
    >{{log.log_time.toDate().getDate()}}.{{log.log_time.toDate().getMonth() + 1}}.{{log.log_time.toDate().getFullYear()}}</p>
    <p class="name">{{log.name}}</p>
    <div class="description" v-if="log.notes">
      <p>{{log.notes}}</p>
    </div>
    <div class="images">
      <div v-for="(photo, index) in log.photos.slice(0, 5)" :key="photo.id">
        <img @click="galleryIndex = index" :src="photo.thumb256url" alt />
        <div v-if="index == 4 && log.photos.length > 5" class="overlay">
          <span>5+</span>
          <span>Open album</span>
        </div>
      </div>
    </div>
    <gallery :images="images" :index="galleryIndex" @close="galleryIndex = null"></gallery>
  </div>
</template>
<script>
import VueGallery from "vue-gallery";

export default {
  name: "ViewLog",
  components: {
    gallery: VueGallery
  },
  props: {
    log: Object
  },
  computed: {
    images() {
      var urls = [];
      this.log.photos.forEach(photo => {
        urls.push(photo.url);
      });
      return urls;
    }
  },
  data() {
    return { galleryIndex: null };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.destination-content {
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
      min-width: 238px;
      max-width: 238px;
      min-height: 238px;
      max-height: 238px;
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
</style>