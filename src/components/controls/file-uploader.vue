<template>
  <div class="images-wrapper">
    <div class="images" v-if="log.photos.length > 0">
      <div v-for="photo in log.photos" :key="photo.id">
        <img v-if="photo.thumburl" :src="photo.thumburl" alt />
        <v-progress-circular v-if="!photo.thumburl" :size="60" indeterminate></v-progress-circular>
        <div class="delete-button" @click="removePhoto(photo.id)">
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
    <div class="button-loader" v-if="isLoading > 0">
      <v-progress-circular :size="40" indeterminate></v-progress-circular>
    </div>
    <label for="file" v-if="isLoading == 0">
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
    </label>
    <input
      type="file"
      multiple
      accept="image/jpeg"
      @change="detectFiles($event.target.files)"
      id="file"
      style="display: none"
    />
  </div>
</template>

<script>
import { firestore, firestorage } from "../../firebase";
import firebase from "firebase/app";

export default {
  props: {
    log: Object
  },
  data() {
    return {
      progressUpload: 0,
      isLoading: 0,
      file: File,
      uploadTask: "",
      uploadId: null
    };
  },
  methods: {
    detectFiles(fileList) {
      console.log("detect");
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x]);
      });
    },
    upload(file) {
      firestore
        .collection("photos")
        .add({})
        .then(ref => {
          this.isLoading += 1;
          console.log("put");
          var uploadId = ref.id;
          var uploadTask = firestorage.ref("photos/" + ref.id).put(file);

          uploadTask.on(
            "state_changed",
            sp => {
              this.progressUpload = Math.floor(
                (sp.bytesTransferred / sp.totalBytes) * 100
              );
              console.log(this.progressUpload + " " + uploadId);
            },
            err => {
              console.log(err);
              this.isLoading -= 1;
            },
            () => {
              console.log("write " + uploadId);
              this.isLoading -= 1;
              uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                firestore
                  .collection("photos")
                  .doc(uploadId)
                  .set({ url: downloadURL })
                  .then(() => {
                    firestore
                      .collection("photos")
                      .doc(uploadId)
                      .get()
                      .then(doc => {
                        firestore
                          .collection("journeylogs")
                          .doc(this.log.id)
                          .update({
                            photos: firebase.firestore.FieldValue.arrayUnion(
                              doc.ref
                            )
                          });
                      });
                  });
              });
            }
          );
        });
    },
    removePhoto(photoId) {
      firestore
        .collection("photos")
        .doc(photoId)
        .get()
        .then(doc => {
          firestore
            .collection("journeylogs")
            .doc(this.log.id)
            .update({
              photos: firebase.firestore.FieldValue.arrayRemove(doc.ref)
            })
            .then(() => {
              firestorage
                .ref("photos/" + photoId)
                .delete()
                .then(function() {
                  console.log("deleted " + photoId);
                })
                .catch(function(error) {
                  console.log(error);
                });
              firestorage
                .ref("photos/" + photoId + "_thumb@60")
                .delete()
                .then(function() {
                  console.log("deleted 60 " + photoId);
                })
                .catch(function(error) {
                  console.log(error);
                });
              firestorage
                .ref("photos/" + photoId + "_thumb@256")
                .delete()
                .then(function() {
                  console.log("deleted 256 " + photoId);
                })
                .catch(function(error) {
                  console.log(error);
                });
              firestore
                .collection("photos")
                .doc(photoId)
                .delete();
            });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.progress-bar {
  margin: 10px 0;
}

.add-button {
  width: 40px;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 5px;
}

.button-loader {
  width: 40px;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 5px;
}

.images-wrapper {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

.images {
  display: flex;
  flex-flow: row nowrap;
  margin-top: 20px;
  margin-right: 20px;
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
      min-width: 60px;
      min-height: 60px;
      background-color: #aaaaaa;
    }
    margin-left: 1px;
  }
}
</style>