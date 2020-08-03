<template>
  <div class="text-area-input">
    <b-field :label="title">
      <b-input v-model="obj.value" :placeholder="placeholder" type="textarea"></b-input>
    </b-field>
  </div>
</template>

<script>
export default {
  props: ["obj", "title", "placeholder"],
};
</script>

<style scoped>
.text-area-input {
  margin-bottom: 1.5%;
}
</style>