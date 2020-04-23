<template>
  <div class="container mx-auto mt-2 px-2">
    <p class="py-2" v-if="filteredChores.length < 1">
      There are currently no chores for this day
    </p>
    <div v-else>
      <content-loader
        v-if="!contentLoaded"
        class="w-100"
        height="160"
        primaryColor="#d4d4d4"
        secondaryColor="#b4b4b4"
      >
        <circle cx="10" cy="20" r="8" />
        <rect x="30" y="15" rx="5" ry="5" width="90%" height="10" />
        <circle cx="10" cy="50" r="8" />
        <rect x="30" y="45" rx="5" ry="5" width="90%" height="10" />
        <circle cx="10" cy="80" r="8" />
        <rect x="30" y="75" rx="5" ry="5" width="90%" height="10" />
        <circle cx="10" cy="110" r="8" />
        <rect x="30" y="105" rx="5" ry="5" width="90%" height="10" />
      </content-loader>
      <transition-group name="list-complete" tag="div" v-else>
        <div
          v-for="chore in filteredChores"
          :key="chore._id"
          class="flex items-center py-2 list-complete-item"
        >
          <!-- {{ chore.task }} -->
          <p
            v-if="!chore.isEditing"
            class="mr-auto px-2 py-1"
            :class="{
              'line-through': chore.isCompleted
            }"
          >
            {{ chore.task }}
          </p>
          <input
            class="mr-auto py-1 px-2 bg-gray-200 focus:outline-none"
            placeholder="Chore name..."
            v-if="chore.isEditing"
            v-model="chore.task"
            :id="`input_${chore._id}`"
            :key="`input_${chore._id}`"
            @keyup.enter="toggleEdit(chore)"
            type="text"
          />
          <input
            type="checkbox"
            class="w-6 h-6 mx-3"
            v-model="chore.isCompleted"
            :checked="chore.isCompleted"
          />
          <button @click="toggleEdit(chore)" class="mx-2 w-8 h-8">
            <i
              class="text-2xl text-indigo-700"
              :class="{
                'fas fa-edit': !chore.isEditing,
                'fas fa-save': chore.isEditing
              }"
            ></i>
          </button>
          <button @click="deleteChore(chore)" class="mx-2 w-8 h-8">
            <i class="text-2xl text-red-700 far fa-trash-alt"></i>
          </button>
        </div>
      </transition-group>
    </div>
    <div class="fixed bottom-0 inset-x-0">
      <button
        @click="addChore()"
        class="mb-4 w-10 h-10 rounded-full bg-indigo-700 text-white"
      >
        <i class="fas fa-plus"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { ContentLoader } from "vue-content-loader";
import { mapState, mapGetters } from "vuex";

const currentDate = new Date(),
  currentDay = currentDate.getDate().toString();

export default {
  name: "ChoreList",

  components: {
    ContentLoader
  },

  data() {
    return {
      contentLoaded: false,
      flickityOptions: {
        initialIndex: currentDay - 1,
        pageDots: false,
        prevNextButtons: false,
        wrapAround: true
      }
    };
  },

  computed: {
    ...mapGetters({
      filteredChores: "activeDayChores"
    }),
    ...mapState({
      chores: state => state.chores,
      activeDate: state => state.activeDate
    })
  },

  mounted() {
    setTimeout(() => {
      this.showContent();
    }, 1000);
  },

  methods: {
    showContent() {
      this.contentLoaded = true;
    },

    toggleEdit(chore) {
      chore.isEditing = !chore.isEditing;

      this.filteredChores.forEach(e => {
        if (e._id !== chore._id) {
          e.isEditing = false;
        }
      });

      if (chore.isEditing) {
        this.$nextTick(() => {
          const choreInput = document.getElementById(`input_${chore._id}`);
          choreInput.focus();
          choreInput.select();
        });
      }
    },

    deleteChore(chore) {
      const deletedChore = this.chores.findIndex(c => c._id === chore._id);
      this.chores.splice(deletedChore, 1);
    },

    addChore() {
      const addedChoreID = uuidv4();
      this.chores.push({
        _id: addedChoreID,
        task: "",
        room: "Living Room",
        month: 3,
        date: this.activeDate,
        dateCreated: new Date(),
        isCompleted: false,
        isEditing: true
      });

      this.$nextTick(() => {
        const choreInput = document.getElementById(`input_${addedChoreID}`);
        choreInput.focus();
        choreInput.select();
      });
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
