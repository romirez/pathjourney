<template>
  <popup :title="'Add event'" @close="$emit('close')">
    <template v-slot:content>
      <div class="destination-info">
        <div class="text-inputs">
          <custom-datepicker class="info-input" v-model="log_time" :placeholder="'Date'"></custom-datepicker>
          <custom-input class="info-input" v-model="name" :placeholder="'Name'"></custom-input>
          <custom-input class="info-input" v-model="notes" :placeholder="'Notes'"></custom-input>
        </div>
        <div class="upload-images">
          <div class="title">Add photo</div>

          <FileUploader :log="log" v-on:rebindLog="rebindLog()"></FileUploader>
        </div>
      </div>
      <div class="submit-button">
        <input type="button" value="Submit" @click="submit" />
      </div>
      <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true" :opacity="1"></loading>
    </template>
  </popup>
</template>
<script>
import Popup from "../components/controls/custom-popup.vue";
import CustomInput from "../components/controls/custom-input.vue";
import CustomDatepicker from "../components/controls/custom-datepicker.vue";
import FileUploader from "../components/controls/file-uploader.vue";
import Loading from "vue-loading-overlay";
import { firestore } from "../firebase";

export default {
  name: "AddLog",
  components: { Popup, CustomInput, CustomDatepicker, FileUploader, Loading },
  props: {
    title: String,
    coords: String
  },
  data() {
    return {
      log_time: null,
      notes: "",
      name: "",
      id: null,
      coordinates: null,
      isLoading: false,

      log: {
        log_time: null,
        notes: "",
        location: null,
        name,
        photos: [],
        draft: true,
        add_time: new Date()
      }
    };
  },
  mounted() {
    this.isLoading = true;
    if (this.coords) {
      firestore
        .collection("coordinates")
        .doc(this.coords)
        .get()
        .then(doc => {
          this.coordinates = doc.ref;
          this.log_time = doc.data()["time"].toDate();
          firestore
            .collection("journeylogs")
            .add(this.log)
            .then(nl => {
              console.log("created draft " + nl.id);
              this.id = nl.id;
              this.$bind(
                "log",
                firestore.collection("journeylogs").doc(nl.id),
                { maxRefDepth: 3 }
              );
              this.isLoading = false;
            });
        });
    } else {
      firestore
        .collection("journeylogs")
        .add(this.log)
        .then(nl => {
          console.log("created draft " + nl.id);
          this.id = nl.id;
          this.$bind("log", firestore.collection("journeylogs").doc(nl.id));
          this.isLoading = false;
        });
    }
  },
  destroyed() {
    if (this.log && this.log.draft == true) {
      console.log("deleting draft " + this.id);
      firestore
        .collection("journeylogs")
        .doc(this.id)
        .delete();
    }
  },
  methods: {
    submit() {
      if (!this.name || this.name == "") {
        console.log("name");
      } else if (!this.log_time) {
        console.log("logtime");
      } else {
        if (this.coords == null) {
          firestore
            .collection("coordinates")
            .where("time", ">", this.log_time)
            .orderBy("time", "asc")
            .limit(1)
            .get()
            .then(res1 => {
              if (res1.docs.length == 0) {
                firestore
                  .collection("coordinates")
                  .where("time", "<", this.log_time)
                  .orderBy("time", "desc")
                  .limit(1)
                  .get()
                  .then(res2 => {
                    firestore
                      .collection("journeylogs")
                      .doc(this.log.id)
                      .update({
                        name: this.name,
                        log_time: this.log_time,
                        notes: this.notes,
                        add_time: new Date(),
                        coordinates: res2.docs[0].ref,
                        draft: false
                      })
                      .then(() => {
                        this.$emit("submit", this.log);
                      });
                  });
              } else {
                firestore
                  .collection("journeylogs")
                  .doc(this.log.id)
                  .update({
                    name: this.name,
                    log_time: this.log_time,
                    notes: this.notes,
                    add_time: new Date(),
                    coordinates: res1.docs[0].ref,
                    draft: false
                  })
                  .then(() => {
                    this.$emit("submit", this.log);
                  });
              }
            });
        } else {
          firestore
            .collection("coordinates")
            .doc(this.coords)
            .get()
            .then(c => {
              firestore
                .collection("journeylogs")
                .doc(this.log.id)
                .update({
                  name: this.name,
                  log_time: this.log_time,
                  notes: this.notes,
                  add_time: new Date(),
                  coordinates: c.ref,
                  draft: false
                })
                .then(() => {
                  this.$emit("submit", this.log);
                });
            });
        }
      }
    },
    rebindLog() {
      var id = this.log.id;
      this.$unbind("log", false);
      this.$bind("log", firestore.collection("journeylogs").doc(id));
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
  }
}
</style>
