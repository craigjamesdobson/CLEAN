<template>
  <div class="chores">
    <DateList></DateList>
    <ChoreList></ChoreList>
  </div>
</template>

<script>
import DateList from "@/components/DateList.vue";
import ChoreList from "@/components/ChoreList.vue";
import { mapState, mapActions } from "vuex";

// const currentDate = new Date(),
//   currentDay = currentDate.getDate().toString(),
//   currentMonth = currentDate.getMonth(),
//   currentYear = currentDate.getFullYear();

export default {
  Name: "Chores",
  components: {
    DateList,
    ChoreList
  },

  data() {
    return {};
  },

  mounted() {
    this.setCurrentDate();
  },

  computed: {
    ...mapState({
      activeDate: state => state.activeDate
    })
  },

  methods: {
    ...mapActions(["updateDate"]),

    setCurrentDate() {
      const currentDate = new Date(),
        d = currentDate.getDate().toString(),
        m = currentDate.getMonth() + 1,
        y = currentDate.getFullYear();

      this.updateDate(`${d}/${m}/${y}`);
    }
  },

  setup() {}
};
</script>
