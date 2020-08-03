<template>
  <div class="text-input">
    <b-field :label="title">
      <b-input v-model="obj.value" :placeholder="placeholder"></b-input>
    </b-field>
  </div>
</template>

<script>
export default {
  props: ["obj", "title", "placeholder"],
};
</script>

<style scoped>
.text-input {
  margin-bottom: 1.5%;
}
</style>