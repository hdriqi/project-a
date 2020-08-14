<template>
  <div class="mb-4" :style="{
    order: order
  }">
    <div class="input-title">
      <p class="subtitle" style="font-size:16px;">
        <b>{{title}}</b>
      </p>
    </div>
    <div class="columns is-vcentered" v-if="!isUpload || remove">
      <div class="column is-one-third"></div>
      <div class="column is-one-third">
        <b-button type="is-info is-small" @click="uploadPicture">upload</b-button>
        <b-button
          v-if="isUpload"
          type="is-small"
          @click="remove = false"
          style="float:right; position: relative;  z-index: 99;"
          icon="close"
        >cancel</b-button>
        <b-field>
          <b-upload v-model="dropFiles" multiple drag-drop expanded>
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-large"></b-icon>
                </p>
                <p>Drop your file/image here</p>
              </div>
            </section>
          </b-upload>
        </b-field>
        <div class="tags">
          <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
            <p>{{file.name}}</p>
            <button class="delete is-small" type="button" @click="deleteDropFile(index)"></button>
          </span>
        </div>
      </div>
      <div class="column is-one-third"></div>
    </div>
    <div class="columns is-vcentered" v-if="isUpload && !remove">
      <div class="column is-one-third"></div>
      <div class="column is-one-third">
        <b-button
          type="is-danger is-small"
          @click="remove = true"
          style="float:right; position: relative;  z-index: 99;"
          icon="close"
        >X</b-button>
        <figure class="image is-256x256">
          <img :src="obj.value" :alt="obj.value" />
        </figure>
      </div>
      <div class="column is-one-third"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { keys } from "../../generated/generated_schemas";

export default {
  props: ["title", "placeholder", "obj", "loading", "isUpload", "order"],
  data() {
    return {
      file: {},
      dropFiles: [],
      remove: false,
    };
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
    async uploadPicture() {
      const url = `http://localhost:8000/api/upload`;
      let mediaFile = new FormData();
      mediaFile.append("file", this.uploadFile);
      try {
        const { data } = await axios.post(url, mediaFile, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.loading();
        this.obj.value = data.url;
        this.success();
      } catch (err) {
        console.log(err.response.data);
        this.danger();
      }
    },
    success() {
      setTimeout(() => {
        this.$buefy.notification.open({
          message: "Uploaded Successfully",
          type: "is-success",
        });
      }, 1300);
    },
    danger() {
      const notif = this.$buefy.notification.open({
        duration: 5000,
        message: `Failed to Upload File or Image`,
        position: "is-bottom-right",
        type: "is-danger",
        hasIcon: true,
      });
      notif.$on("close", () => {
        this.$buefy.notification.open("notification closed!");
      });
    },
  },
  watch: {
    dropFiles: function (val) {
      if (this.dropFiles.length > 1) {
        this.dropFiles = this.dropFiles.slice(0, 1);
      }
    },
  },
  computed: {
    uploadFile() {
      return this.dropFiles[0];
    },
  },
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