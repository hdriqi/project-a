<template>
  <div class="radio-input">
    <div class="field">
      <div class="input-title">
        <p class="subtitle" style="font-size:16px;">
          <b>{{title}}</b>
        </p>
      </div>
      <b-radio
        v-for="option in data"
        :key="option"
        v-model="obj.value"
        :native-value="option"
      >{{option}}</b-radio>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "obj", "title"],
};
</script>

<style scoped>
.radio-input {
  margin-bottom: 1.5%;
}
.input-title {
  margin-bottom: 1%;
}
</style>