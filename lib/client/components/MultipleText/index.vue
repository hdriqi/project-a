<template>
  <div class="flex items-center justify-between mb-4" :style="{
    order: order
  }">
    <div class="flex-grow pr-4">
      <b-field>
        <b-input v-model="obj.value" :placeholder="placeholder" :type="type"></b-input>
      </b-field>
    </div>
    <div class="flex">
      <b-button
        type="is-danger"
        label="Remove"
        icon-right="minus"
        class="button-schedule ml-auto"
        @click="remove(index,name)"
        size="is-small"
        :disabled="!isMin"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "obj",
    "add",
    "remove",
    "index",
    "isMin",
    "name",
    "placeholder",
    "type",
    "order"
  ],
};
</script>