<template>
  <div>
    <div class="columns">
      <div class="column">
        <b-field grouped position="is-left">
          <b-select placeholder="Order By" v-model="selector">
            <option value="none">None</option>
            <option value="createdAt">Created At</option>
            <option value="fileName">File Name</option>
          </b-select>
          <b-switch
            v-model="isSwitchedCustom"
            true-value="Descending"
            false-value="Ascending"
          >{{ isSwitchedCustom }}</b-switch>
        </b-field>
      </div>
      <div class="column">
        <b-field grouped position="is-right">
          <b-input placeholder="Search..." type="search" icon="magnify" v-model="searchQuery"></b-input>
        </b-field>
      </div>
    </div>
    <div class="tile is-ancestor media">
      <div class="tile is-parent is-4" v-for="item in paginatedItems" :key="item.title">
        <div class="tile is-child box w-full">
          <figure class="image is-square" v-if="!loading && item.type =='image'">
            <a @click="imageModal(item.address)">
              <img class="object-cover" :src="item.address" :alt="item.fileName" />
            </a>
          </figure>
          <figure class="image is-square" v-if="!loading && item.type =='document'">
            <a :href="item.address">
              <img
                class="object-cover"
                src="https://png.pngtree.com/png-vector/20190216/ourlarge/pngtree-vector-document-icon-png-image_541782.jpg"
                :alt="item.fileName"
              />
            </a>
          </figure>
          <b-skeleton size="is-large" :active="loading" :count="1" :height="220"></b-skeleton>
          <div class="flex items-center justify-between mt-2">
            <div class="w-2/3 overflow-hidden">
              <p class="m-0 truncate">{{item.fileName}}</p>
            </div>
            <div class="w-1/3 flex">
              <button
                class="ml-auto button is-small is-danger"
                @click="_ => deleteFile(item.uniqueName)"
              >Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-pagination :total="total" :current.sync="current" :per-page="perPage"></b-pagination>
  </div>
</template>

<script>
import axios from "axios";

export default {
  async asyncData({ params }) {
    const { data } = await axios.get(`http://localhost:8000/api/medias`);
    data.data.forEach((element) => {
      element.address = `http://localhost:8000/cdn/${element.uniqueName}`;
      element.date = new Date(element.createdAt);
      const fileFormat = element.uniqueName.slice(
        element.uniqueName.length - 3,
        element.uniqueName.length
      );
      const pictureFormat = ["png", "jpg"];
      pictureFormat.includes(fileFormat)
        ? (element.type = "image")
        : (element.type = "document");
    });
    return { items: data.data, resetData: data.data };
  },
  data() {
    return {
      loading: true,
      isImageModalActive: false,
      isSwitchedCustom: "Descending",
      current: 1,
      perPage: 6,
      searchQuery: null,
      selector: null,
    };
  },
  methods: {
    imageModal(src) {
      this.$buefy.modal.open(
        `<p style="text-align:center;">
        <img src="${src}">
        </p>`
      );
    },
    async deleteFile(key) {
      const self = this;
      this.$buefy.dialog.confirm({
        message: "Confirm delete?",
        onConfirm: async () => {
          try {
            const response = await axios.delete(
              `${process.env.BASE_URL}/api/medias/${key}`
            );
            const idx = this.items.findIndex((item) => item.uniqueName === key);
            self.items.splice(idx, 1);
            self.$buefy.notification.open({
              message: "Deleted Successfully",
              type: "is-success",
            });
          } catch (err) {
            const notif = self.$buefy.notification.open({
              duration: 5000,
              message: `Failed to delete data`,
              position: "is-top-right",
              type: "is-danger",
              hasIcon: true,
            });
          }
        },
      });
    },
    filterData() {
      if (this.selector === "none") {
        this.items = this.resetData;
      } else {
        if (
          this.selector === "createdAt" &&
          this.isSwitchedCustom === "Descending"
        ) {
          this.items = this.items.slice().sort((a, b) => b.date - a.date);
        } else if (
          this.selector === "createdAt" &&
          this.isSwitchedCustom === "Ascending"
        ) {
          this.items = this.items.slice().sort((a, b) => a.date - b.date);
        } else if (
          this.selector === "fileName" &&
          this.isSwitchedCustom === "Ascending"
        ) {
          this.items = this.items.sort((a, b) => {
            if (a.fileName < b.fileName) {
              return -1;
            }
            if (a.fileName > b.fileName) {
              return 1;
            }
            return 0;
          });
        } else if (
          this.selector === "fileName" &&
          this.isSwitchedCustom === "Descending"
        ) {
          this.items = this.items.sort((a, b) => {
            if (a.fileName < b.fileName) {
              return 1;
            }
            if (a.fileName > b.fileName) {
              return -1;
            }
            return 0;
          });
        }
      }
    },
  },
  watch: {
    selector: function (val) {
      this.filterData();
    },
    isSwitchedCustom: function (val) {
      this.filterData();
    },
  },
  computed: {
    total() {
      return this.resultQuery.length;
    },
    resultQuery() {
      if (this.searchQuery) {
        return this.items.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.fileName.toLowerCase().includes(v));
        });
      } else {
        return this.items;
      }
    },
    paginatedItems() {
      let page_number = this.current - 1;

      return this.resultQuery.slice(
        page_number * this.perPage,
        (page_number + 1) * this.perPage
      );
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = !this.loading;
    }, 2 * 1000);
  },
};
</script>

<style scoped>
.media {
  flex-wrap: wrap;
}
</style>