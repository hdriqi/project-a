<template>
  <div>
    <div class="w-48 h-48 bg-gray-200 shadow-md flex items-center p-4 rounded-md overflow-hidden">
      <div v-if="usedStorage">
        <h4 class="text-xl text-gray-600">Storage Used</h4>
        <h2 class="mt-2 font-bold text-5xl">{{((usedStorage/maxStorage)*100).toPrecision(2)}}%</h2>
        <p>{{usedStorage | prettyBytes}} of {{maxStorage | prettyBytes}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import schemas from "../generated/generated_schemas.js";
import checkbox from "../components/CheckBox";
import dropdown from "../components/Dropdown";
import radio from "../components/Radio";
import textInput from "../components/Text";
import textAreaInput from "../components/TextArea";
import textDropDown from "../components/TextDropdown";
import uploadInput from "../components/UploadButton";
import utilsPrettyBytes from "../utils/prettyBytes";
import axios from "axios";

const minSchedule = 3;

export default {
  data() {
    return {
      maxStorage: process.env.MAX_STORAGE,
      usedStorage: 0,
    };
  },
  filters: {
    prettyBytes: (val) => {
      return utilsPrettyBytes(Number(val));
    },
  },
  watch: {
    scheduleInputs: function (val) {
      this.isPlus = val.length - 1;
    },
  },
  async mounted() {
    axios.defaults.headers.common["x-api-key"] = window.localStorage.getItem(
      "token"
    );
    const mediaUsage = await axios.get(
      `${process.env.BASE_URL}/api/stats/medias`
    );
    this.usedStorage = mediaUsage.data.data
  },
};
</script>