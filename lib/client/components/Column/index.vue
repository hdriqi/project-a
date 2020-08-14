<template>
  <div>
    <div class="truncate" v-if="field.component === 'date'">{{data | parseDate}}</div>
    <div class="truncate" v-else-if="field.component === 'rich-text'">{{ data | parseRichText }}</div>
    <div v-else-if="field.component === 'upload'">
      <a class="truncate" :href="data" target="_blank">{{ data }}</a>
    </div>
    <div class="truncate" v-else-if="field.component === 'multiple_text' || field.component === 'checkbox' ">{{data | parseMultipleText}}</div>
    <div class="truncate" v-else>{{data}}</div>
  </div>
</template>

<script>
import htmlToText from "html-to-text";
import formatDate from '../../utils/formatDate';

export default {
  props: ["data", "field"],
  filters: {
    parseRichText(val) {
      return htmlToText.fromString(val, {
        ignoreHref: true,
        ignoreImage: true,
      });
    },
    parseMultipleText(val) {
      return val && val.join(', ')
    },
    parseDate(val) {
      return formatDate(val)
    }
  },
};
</script>