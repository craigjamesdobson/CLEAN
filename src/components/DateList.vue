<template>
  <div class="container mx-auto">
    <select
      class="p-3 my-2 text-2xl"
      name=""
      id=""
      v-model="selectedMonth"
      @change="getDaysInMonth(selectedMonth, currentYear, 0)"
    >
      <option
        :selected="index == new Date().getMonth()"
        v-for="(date, index) in monthDates"
        :key="`date_${index}`"
        :value="index"
      >
        {{ date }}
      </option>
    </select>
    <h2 class="mb-4 text-gray-500">{{ this.activeDate }}</h2>
    <flickity
      ref="flickity"
      class="dates-carousel border-t-2 border-b-2 border-gray-200"
      :options="flickityOptions"
    >
      <a
        href=""
        class="carousel-cell w-1/4"
        :class="{ 'is-selected': date.currentDay }"
        v-for="(date, index) in dates[0]"
        :key="index"
        :data-date="date.date"
      >
        <div class="inner mx-2 my-4 p-3 shadow-md uppercase rounded-sm">
          <h1 class="mb-2 font-light text-xl">
            <strong>{{ date[0] }}</strong>
          </h1>
          <h3>{{ date[2] }}</h3>
        </div>
      </a>
    </flickity>
  </div>
</template>

<script>
import Flickity from "vue-flickity";
import { mapActions, mapState } from "vuex";

const currentDate = new Date(),
  currentDay = currentDate.getDate();

export default {
  name: "DateList",
  components: {
    Flickity
  },

  data() {
    return {
      contentLoaded: false,
      ad: this.activeDate,
      dates: [],
      currentDay: 5,
      selectedMonth: new Date().getMonth(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      flickityOptions: {
        initialIndex: currentDay - 1,
        pageDots: false,
        prevNextButtons: false,
        wrapAround: true
      }
    };
  },

  mounted() {
    this.getDaysInMonth(this.selectedMonth, this.currentYear, currentDay - 1);
  },

  computed: {
    ...mapState({
      activeDate: "activeDate",
      monthDates: "dates"
    })
  },

  methods: {
    ...mapActions(["updateDate"]),

    onFlickitySlide() {
      const vm = this;

      this.$refs.flickity.on("select", function() {
        vm.ad = vm.$refs.flickity.selectedElement().dataset.date;
        vm.updateSelectedDate();
      });
    },

    getDaysInMonth(month, year, initialIndex) {
      let date = new Date(year, month, 1);
      let days = [];

      while (date.getMonth() === month) {
        let newDate = new Date(date);
        let newDateSplit = newDate
          .toString()
          .slice(0, 15)
          .split(" ");

        let d = newDate.getDate();
        let m = newDate.getMonth() + 1;
        let y = newDate.getFullYear();

        const isCurrentDay =
          newDateSplit[2] === currentDay.toString() ? true : false;

        const newDateObj = {
          ...newDateSplit,
          date: `${d}/${m}/${y}`,
          currentDay: isCurrentDay,
          activeDay: isCurrentDay
        };

        days.push(newDateObj);

        date.setDate(date.getDate() + 1);
      }

      this.dates = [days];

      this.$nextTick(() => {
        this.$refs.flickity.rerender();

        this.onFlickitySlide();
        this.$refs.flickity.select(initialIndex);

        this.ad = `1/${this.selectedMonth + 1}/${this.currentYear}`;
        this.updateSelectedDate();
      });
    },

    updateSelectedDate() {
      this.updateDate(this.ad);
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: "Bebas Neue", cursive;
}

.flickity-enabled:focus .flickity-viewport {
  outline: none;
}

.carousel-cell {
  .inner {
    transition: all 0.5s ease-in-out;
  }

  &.is-selected {
    .inner {
      background: #4c51bf;
      color: #fff;
    }
  }
}

.list-complete-item {
  transition: all 0.5s;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
}

.list-complete-enter {
  transform: translateY(30%);
}

.list-complete-leave-to {
  transform: translateX(100%);
}
.list-complete-leave-active {
  position: absolute;
  left: 0.5em;
  right: 0.5em;
}
</style>
