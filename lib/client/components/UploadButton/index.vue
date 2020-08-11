<template>
  <div class="upload-input">
    <div class="input-title">
      <p class="subtitle" style="font-size:16px;">
        <b>{{title}}</b>
      </p>
    </div>
    <div class="columns is-vcentered">
      <div class="column is-four-fifths">
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
      <div class="column">
        <b-button type="is-info" @click="uploadPicture">click to upload</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { keys } from "../../generated/generated_schemas";

export default {
  props: ["title", "placeholder", "obj", "loading"],
  data() {
    return {
      file: {},
      dropFiles: [],
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
        let address = "";
        Object.keys(data).forEach((key) => {
          if (key !== "status") {
            address = address + data[key];
          }
        });
        this.obj.value = address;
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