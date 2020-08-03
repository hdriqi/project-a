<template>
  <div class="text-dropdown">
    <div class="input-title">
      <p class="subtitle" style="font-size:16px;">
        <b>{{title}}</b>
      </p>
    </div>
    <div class="columns">
      <div class="column is-one-fifth">
        <b-field>
          <b-select :placeholder="placeholder" v-model="arr.value">
            <option v-for="option in data" :value="option" :key="option">{{ option }}</option>
          </b-select>
        </b-field>
      </div>
      <div class="column">
        <b-field>
          <b-input v-model="obj.value" :placeholder="placeholder"></b-input>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["obj", "title", "placeholder", "data", "arr"],
};
</script>

<style scoped>
.text-dropdown {
  margin-bottom: 1.5%;
}
.input-title {
  margin-bottom: 1%;
}
</style>