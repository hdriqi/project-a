<template>
  <div class="mb-4" :style="{
    order: order
  }">
    <div class="field">
      <div class="input-title">
        <p class="subtitle" style="font-size:16px;">
          <b>{{title}}</b>
        </p>
      </div>
      <b-checkbox
        v-for="(option,index) in data"
        :key="option"
        v-model="arr[index]"
        :true-value="option"
      >{{option}}</b-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "arr", "title", "order"],
};
</script>

<style scoped>
.checkbox-input {
  margin-bottom: 1.5%;
}
.input-title {
  margin-bottom: 1%;
}
</style>