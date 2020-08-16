<template>
  <section>
    <div class="columns">
      <div class="column is-four-fifths"></div>
      <div class="column">
        <b-button
          type="is-primary"
          icon-right="plus"
          class="button-slug"
          @click="move"
          label="Add Data"
        />
      </div>
    </div>
    <tableSection
      :data="data"
      :columns="columns"
      :loading="loading"
      :total="total"
      :page="perPage"
      :onPageChange="onPageChange"
      :onSort="onSort"
      :edit="edit"
      :onDelete="deleting"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      paginated
      backend-pagination
      backend-sorting
    ></tableSection>
  </section>
</template>

<script>
import axios from "axios";
import allSchemas, { keys } from "../../../generated/generated_schemas";
import tableSection from "../../../components/TableSection";

export default {
  async asyncData({ params }) {
    const schemas = allSchemas.filter(
      (i) => i.name.toLowerCase() === params.slug
    )[0];

    const columns = [
      {
        field: "id",
        component: 'text',
        label: "ID",
        numeric: false,
        sortable: false,
      },
    ];
    schemas.fields.forEach((i) => {
      columns.push({
        field: i.name,
        label: i.name,
        sortable: true,
        component: i.component,
        numeric:
          i.type === "number" || i.type === "array_number" ? true : false,
      });
    });

    columns.push({
      field: "date",
      component: 'date',
      label: "date",
      sortable: false,
      numeric: false,
    });

    return {
      schemas,
      path: params.slug,
      loading: false,
      data: [],
      total: 0,
      perPage: 20,
      page: 1,
      sortField: "id",
      sortOrder: "desc",
      columns: columns,
    };
  },
  components: { tableSection },
  data() {
    return {};
  },
  computed: {},
  methods: {
    loadAsyncData() {
      const params = [
        `sort_by=${this.sortField}.${this.sortOrder}`,
        `page=${this.page}`,
      ].join("&");

      this.loading = true;
      const url = `${process.env.BASE_URL}/api/collections/${this.path}`;
      axios
        .get(url)
        .then(({ data }) => {
          this.data = [];
          let currentTotal = data.data.length;
          if (data.data.length / this.perPage > 1000) {
            currentTotal = this.perPage * 1000;
          }
          this.total = currentTotal;
          data.data.forEach((item) => {
            item.id = item._id;
            item.date = item.createdAt;
            this.data.push(item);
          });
          console.log(this.data);
          this.loading = false;
        })
        .catch((error) => {
          this.data = [];
          this.total = 0;
          this.loading = false;
          throw error;
        });
    },
    onPageChange(page) {
      this.page = page;
      this.loadAsyncData();
    },
    onSort(field, order) {
      this.sortField = field;
      this.sortOrder = order;
      this.loadAsyncData();
    },
    edit(value) {
      const route = `/section/${this.path.toLowerCase()}/edit/${value.id}`;
      this.$router.push(route);
    },
    deleteData(value) {
      const url = `${process.env.BASE_URL}/api/collections/${this.path}/${value.id}`;
      this.loading = true;
      axios
        .delete(url)
        .then(({ data }) => {
          console.log(data);
          this.loading = false;
          this.$buefy.toast.open("Data Has Been Deleted");
          this.loadAsyncData();
        })
        .catch((error) => {
          this.loading = false;
          throw error;
        });
    },
    deleting(value) {
      this.$buefy.dialog.confirm({
        message: "Continue on delete the data?",
        onConfirm: () => {
          this.deleteData(value);
        },
      });
    },
    move() {
      const route = `/section/${this.path.toLowerCase()}/add`;
      this.$router.push(route);
    },
  },
  mounted() {
    this.loadAsyncData();
  },
};
</script>

<style scoped>
.input-title {
  margin-bottom: 2%;
}
</style>