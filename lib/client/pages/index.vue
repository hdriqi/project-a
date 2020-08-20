<template>
  <div>
    <div class="w-48 h-48 bg-gray-200 shadow-md flex items-center p-4 rounded-md overflow-hidden">
      <div>
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
import Axios from "axios";

const minSchedule = 3;

export default {
  components: {
    checkbox,
    dropdown,
    radio,
    textInput,
    textAreaInput,
    textDropDown,
    uploadInput,
  },
  computed: {
    checkboxInput: function () {
      return this.checkboxInputValue.filter((i) => i != null && i != false);
    },
  },
  methods: {
    add(index) {
      this.scheduleInputs.push([
        {
          day: null,
        },
        {
          hour: null,
        },
      ]);
    },
    remove(index) {
      this.scheduleInputs.splice(index, 1);
    },
    submit() {
      console.log("submit");
    },
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
  data() {
    const schedule = [];
    for (let i = 0; i < minSchedule; i++) {
      schedule.push([
        {
          day: null,
        },
        {
          hour: null,
        },
      ]);
    }
    axios.defaults.headers.common['x-api-key'] = window.localStorage.getItem("token");
    const mediaUsage = await Axios.get(
      `${process.env.BASE_URL}/api/stats/medias`
    );
    return {
      scheduleInputs: schedule,
      minValue: minSchedule - 1,
      maxStorage: process.env.MAX_STORAGE,
      usedStorage: mediaUsage.data.data,
      isPlus: minSchedule - 1,
      checkbox: ["Matematika", "Fisika", "Kimia", "Biologi"],
      checkboxInputValue: [],
      dropdown: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      dropdownInput: {
        value: null,
      },
      radio: ["Paket 8 sesi", "Paket 24 sesi", "Paket 48 sesi"],
      radioInput: {
        value: null,
      },
      textInput: {
        value: null,
      },
      textAreaInput: {
        value: null,
      },
      textDropdownInputText: {
        value: null,
      },
      textDropdownData: ["Ny.", "Tn.", "Ibu.", "Bpk."],
      textDropdownInputSelect: {
        value: null,
      },
      textUploadInput: {
        value: null,
      },
    };
  },
};
</script>