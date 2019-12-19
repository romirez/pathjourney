<template>
  <popup :title="'Add segment'" @close="$emit('close')">
    <template v-slot:content>
      <div class="destination-info">
        <div class="text-inputs">
          <custom-datepicker class="info-input" v-model="start_date" :placeholder="'Start Date'"></custom-datepicker>
          <custom-datepicker class="info-input" v-model="end_date" :placeholder="'End Date'"></custom-datepicker>
          <custom-input class="info-input" v-model="name" :placeholder="'Name'"></custom-input>
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
import Loading from "vue-loading-overlay";
import { firestore } from "../firebase";

export default {
  name: "AddSegment",
  components: { Popup, CustomInput, CustomDatepicker, Loading },
  data() {
    return {
      start_date: null,
      end_Date: null,
      name: "",
      id: null,

      segment: {
        start_date: null,
        end_date: null,
        name,
        draft: true,
        add_time: new Date()
      }
    };
  },
  mounted() {
    this.isLoading = true;
    firestore
      .collection("segments")
      .add(this.segment)
      .then(ns => {
        console.log("created segment draft " + ns.id);
        this.id = ns.id;
        this.$bind("segment", firestore.collection("segments").doc(ns.id));
        this.isLoading = false;
      });
  },
  destroyed() {
    if (this.segment && this.segment.draft == true) {
      console.log("deleting segment draft " + this.id);
      firestore
        .collection("segments")
        .doc(this.id)
        .delete();
    }
  },
  methods: {
    submit() {
      if (!this.name || this.name == "") {
        console.log("name");
      } else if (!this.start_date) {
        console.log("start_date");
      } else if (!this.end_date) {
        console.log("end_date");
      } else {
                firestore
                  .collection("segments")
                  .doc(this.segment.id)
                  .update({
                    name: this.name,
                    start_date: this.start_date,
                    end_date: this.end_date,
                    add_time: new Date(),
                    draft: false
                  })
                  .then(() => {
                    this.$emit("submit", this.segment);
                  });
  
        }
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
