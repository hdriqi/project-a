<template>
  <div class="upload-input">
    <div class="input-title">
      <p class="subtitle" style="font-size:16px;">
        <b>{{title}}</b>
      </p>
    </div>
    <b-field class="file">
      <b-upload v-model="obj.value">
        <a class="button is-primary">
          <b-icon icon="upload"></b-icon>
          <span>Upload</span>
        </a>
      </b-upload>
      <span class="file-name" v-if="obj.value">{{ obj.value.name }}</span>
    </b-field>
  </div>
</template>

<script>
export default {
  props: ["title", "placeholder", "obj"],
};
</script>

<style scoped>
.upload-input {
  margin-bottom: 1.5%;
}
.input-title {
  margin-bottom: 1%;
}
</style>