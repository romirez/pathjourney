<template @click="select_note">
  <div class="note" :class="selected">
    <p class="date">{{date}}</p>
    <p class="name">{{name}}</p>
    <div class="images">
      <div v-for="(image, index) in images" v-bind:key="image.id">
        <img :src="image" alt />
        <div class="overlay" v-if="index === images.length">
          <span>5+</span>
        </div>
      </div>
    </div>
    <div class="dot" v-if="in_segment"></div>
  </div>
</template>
<script>
export default {
  name: "note",
  props: {
    id: String,
    in_segment: Boolean
  },
  data() {
    return {
      images: [
        "../assets/images/img1.png",
        "../assets/images/img2.png",
        "../assets/images/img3.png",
        "../assets/images/img4.png",
        "../assets/images/img1.png",
        "../assets/images/img2.png"
      ],
      coords: {},
      date: "30.06.2019",
      name: "St Martin",
      selected: false
    };
  },
  created() {
    //ajax api call we'll pass to component only note id and get all data by it
  },
  methods: {
    select_note() {
      this.set_selected_note({
        id: this.id,
        images: this.images,
        coords: this.coords,
        date: this.date,
        name: this.name
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/custom.scss";
.note {
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
</style>