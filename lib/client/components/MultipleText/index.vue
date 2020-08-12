<template>
  <div class="columns text-input" :style="{
    order: order
  }">
    <div class="column">
      <b-field>
        <b-input v-model="obj.value" :placeholder="placeholder" :type="type"></b-input>
      </b-field>
    </div>
    <div class="column" v-if="index == 0">
      <b-button
        v-if="index == 0"
        type="is-primary"
        icon-right="plus"
        class="button-schedule"
        @click="add(index,name)"
        label="price"
        size="is-small"
      />
    </div>
    <div class="column" v-if="isMin">
      <b-button
        type="is-danger"
        label="price"
        icon-right="minus"
        class="button-schedule"
        @click="remove(index,name)"
        size="is-small"
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

<style scoped>
.text-input {
  margin-bottom: 1.5%;
}
</style>