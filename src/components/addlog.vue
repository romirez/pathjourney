<template>
  <popup :title="'Add event'" @close="$emit('close')">
    <template v-slot:content>
      <div class="destination-info">
        <div class="text-inputs">
          <custom-input class="info-input" v-model="date" :placeholder="'Date'" :type="'text'"></custom-input>
          <custom-input
            class="info-input"
            v-model="location"
            :placeholder="'Location'"
            :type="'text'"
          ></custom-input>
          <custom-input
            class="info-input"
            v-model="description"
            :placeholder="'Description'"
            :type="'text'"
          ></custom-input>
        </div>
        <div class="upload-images">
          <div class="title">Add photo</div>
          <div class="images-wrapper">
            <div class="images">
              <div v-for="photo in photos" :key="photo.id">
                <img :src="photo.url" alt />
                <div class="delete-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="12px"
                    height="12px"
                  >
                    <path
                      fill-rule="evenodd"
                      fill="rgb(254, 254, 254)"
                      d="M12.000,11.000 L11.000,12.000 L6.000,7.000 L1.000,12.000 L-0.000,11.000 L5.000,6.000 L-0.000,1.000 L1.000,-0.000 L6.000,5.000 L11.000,-0.000 L12.000,1.000 L7.000,6.000 L12.000,11.000 Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <FileUploader @downloadURL="addPhoto"></FileUploader>
            <div class="add-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="20px"
                height="20px"
              >
                <path
                  fill-rule="evenodd"
                  fill="rgb(255, 255, 255)"
                  d="M11.000,-0.000 L9.000,-0.000 L9.000,9.000 L-0.000,9.000 L-0.000,11.000 L9.000,11.000 L9.000,20.000 L11.000,20.000 L11.000,11.000 L20.000,11.000 L20.000,9.000 L11.000,9.000 L11.000,-0.000 Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="submit-button">
          <input type="button" value="Submit" @click="submit" />
        </div>
      </div>
    </template>
  </popup>
</template>
<script>
import Popup from "../components/controls/custom-popup.vue";
import CustomInput from "../components/controls/custom-input.vue";
import FileUploader from "../components/controls/fileuploader.vue";
import { firestore } from "../firebase";

export default {
  name: "AddLog",
  components: { Popup, CustomInput, FileUploader },
  props: {
    title: String
  },
  data() {
    return {
      date: "",
      location: "",
      description: "",
      photos: []
    };
  },
  methods: {
    submit() {
      this.$emit("submit", {
        date: this.date,
        location: this.location,
        description: this.description
      });
    },
    addPhoto(id) {
        this.photos.push(firestore.collection('photos').doc(id));
    }
  }
};
</script>
<style lang="scss" scoped>
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
        flex-basis: calc(50% - 13px);
        & + .info-input {
          flex-basis: calc(50% - 13px);
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