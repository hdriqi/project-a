<template>
  <div class="dropdown-input">
    <b-field :label="title">
      <b-select :placeholder="placeholder" v-model="obj.value">
        <option v-for="option in data" :value="option" :key="option">{{ option }}</option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
export default {
  props: ["data", "title", "placeholder", "obj"],
};
</script>

<style scoped>
.dropdown-input {
  margin-bottom: 1.5%;
}
</style>