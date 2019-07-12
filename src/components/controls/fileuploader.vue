<template>
  <div>
    <input type="file" multiple accept="image/jpeg" @change="detectFiles($event.target.files)" />
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
          this.uploadTask = firestorage.ref("photos/" + ref.id + ".jpg").put(file);
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
                this.$emit("url", this.uploadId);
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
</style>