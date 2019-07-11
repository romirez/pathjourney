<template>
    <div class="segment">
        <p class="date">June 2019</p>
        <p class="name">Summer Carribean Cruise 2019</p>
        <!--v-for all note components-->
        <div class="line"></div>
    </div>
</template>
<script>
    import Note from './note.vue'
    export default {
      name: 'segment',
      components: {
        Note
      },
      props: {
        id: String
      },
      data() {
        return {
          notes: {
            //... there will be all notes info
          }
        }
      },
      created() {
        //ajax api call to get all notes by segment id
      }
    }
</script>
<style lang="scss" scoped>
    .segment {
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
    }
</style>