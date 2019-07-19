<template>
  <div>
    <label for="file">
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
    <div class="progress-bar" :style="{ width: progressUpload + '%'}">{{ progressUpload }}%</div>
  </div>
</template>

<script>
import { firestorage, firestore } from "../../firebase";

export default {
  data() {
    return {
      progressUpload: 0,
      file: File,
      uploadTask: "",
      uploadId: null
    };
  },
  methods: {
    detectFiles(fileList) {
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x]);
      });
    },
    upload(file) {
      firestore
        .collection("photos")
        .add({})
        .then(ref => {
          this.uploadId = ref.id;
          this.uploadTask = firestorage
            .ref("photos/" + ref.id)
            .put(file);
        });
    }
  },
  watch: {
    uploadTask: function() {
      this.uploadTask.on(
        "state_changed",
        sp => {
          this.progressUpload = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          );
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            firestore
              .collection("photos")
              .doc(this.uploadId)
              .set({ url: downloadURL })
              .then(() => {
                this.$emit("uploaded", this.uploadId);
              });
          });
        }
      );
    }
  }
};
</script>

<style>
.progress-bar {
  margin: 10px 0;
}

.add-button {
  width: 40px;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 5px;
  margin-left: 20px;
}
</style>