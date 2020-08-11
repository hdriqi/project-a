<template>
  <div class="text-input">
    <b-field :label="title">
      <b-input v-model="obj.value" :placeholder="placeholder" :type="type"></b-input>
    </b-field>
  </div>
</template>

<script>
export default {
  props: ["obj", "title", "placeholder", "type"],
};
</script>

<style scoped>
.text-input {
  margin-bottom: 1.5%;
}
</style>