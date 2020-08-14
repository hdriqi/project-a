<template>
  <client-only>
    <section class="mb-4" :style="{
      order: order
    }">
      <div class="input-title">
        <p class="subtitle" style="font-size:16px;">
          <b>{{title}}</b>
        </p>
      </div>
      <quill-editor
        ref="editor"
        v-model="obj.value"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      />
    </section>
  </client-only>
</template>

<script>
export default {
  name: "quill",
  props: ["obj", "title", "placeholder", "order"],
  data() {
    return {
      content: "",
    };
  },
  methods: {
    onEditorBlur(editor) {
      console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
  },
};
</script>

<style scoped>
.richtext-input {
  margin-bottom: 1.5%;
}
.input-title {
  margin-bottom: 1%;
}
</style>