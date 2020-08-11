<template>
  <section>
    <b-table
      :data="data"
      :loading="loading"
      :total="total"
      :per-page="page"
      @page-change="onPageChange"
      @sort="onSort"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      paginated
      backend-pagination
      backend-sorting
      class="my-table"
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
          <button class="button is-small is-light my-button" @click.prevent="edit(props.row)">Edit</button>
          <button
            class="button is-small is-danger my-button"
            @click.prevent="onDelete(props.row)"
          >Delete</button>
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>

<script>
export default {
  props: [
    "data",
    "columns",
    "edit",
    "onDelete",
    "loading",
    "total",
    "page",
    "onPageChange",
    "onSort",
  ],
};
</script>

<style scoped>
.my-table {
  overflow: auto !important;
}
.my-button {
  margin-bottom: 2%;
}
</style>