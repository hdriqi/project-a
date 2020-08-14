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
        <b-table-column label="Actions" class="">
          <div class="flex">
            <button class="button is-small is-light my-button" @click.prevent="edit(props.row)">Edit</button>
            <button
              class="ml-2 button is-small is-danger my-button"
              @click.prevent="onDelete(props.row)"
            >Delete</button>
          </div>
        </b-table-column>
        <b-table-column
          v-for="field in columns"
          :field="field.field"
          :label="field.label"
          :key="field.label"
          :numeric="field.numeric"
          :sortable="field.sortable"
          class="truncate overflow-hidden max-w-sm"
        >{{props.row[field.field]}}</b-table-column>
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

<style>
.table-wrapper {
  overflow: auto !important;
}
.my-button {
  margin-bottom: 2%;
}
</style>