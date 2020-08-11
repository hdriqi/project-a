<template>
  <b-table
    :data="data"
    :loading="loading"
    :total="total"
    :per-page="perPage"
    @page-change="onPageChange"
    @sort="onSort"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
    paginated
    backend-pagination
    backend-sorting
  >
    <template slot-scope="props">
      <b-table-column
        v-for="field in columns"
        :field="field.field"
        :label="field.label"
        :key="field.label"
        :numeric="field.numeric"
        :sortable="field.sortable"
      >{{props.row[field.field]}}</b-table-column>
      <b-table-column label="Actions">
        <button class="button is-small is-light" @click.prevent="onEdit(props.row)">Edit</button>
        <button class="button is-small is-danger" @click.prevent="onDelete(props.row)">Delete</button>
      </b-table-column>
    </template>
  </b-table>
</template>

<script>
export default {
  props: [
    "data",
    "columns",
    "edit",
    "delete",
    "loading",
    "total",
    "perpage",
    "onPageChange",
    "onSort",
  ],
  data() {
    return {
      loading: false,
      total: 5,
      perPage: 3,
      page: 1,
      data: [
        {
          id: 1,
          first_name: "Jesse",
          last_name: "Simmons",
          date: "2016-10-15 13:43:27",
          gender: "Male",
        },
        {
          id: 2,
          first_name: "John",
          last_name: "Jacobs",
          date: "2016-12-15 06:00:53",
          gender: "Male",
        },
        {
          id: 3,
          first_name: "Tina",
          last_name: "Gilbert",
          date: "2016-04-26 06:26:28",
          gender: "Female",
        },
        {
          id: 4,
          first_name: "Clarence",
          last_name: "Flores",
          date: "2016-04-10 10:28:46",
          gender: "Male",
        },
        {
          id: 5,
          first_name: "Anne",
          last_name: "Lee",
          date: "2016-12-06 14:38:38",
          gender: "Female",
        },
      ],
      columns: [
        {
          field: "id",
          label: "ID",
          width: "40",
          numeric: true,
          sortable: true,
        },
        {
          field: "first_name",
          label: "First Name",
        },
        {
          field: "last_name",
          label: "Last Name",
        },
        {
          field: "date",
          label: "Date",
          centered: true,
        },
        {
          field: "gender",
          label: "Gender",
        },
      ],
    };
  },
  methods: {
    onPageChange(page) {
      this.page = page;
    },
    onSort(field, order) {
      this.sortField = field;
      this.sortOrder = order;
    },
  },
};
</script>

<style scoped>
</style>