<template>
  <div>
    <h1 class="title">Main Page</h1>
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
const minSchedule = 3;
export default {
  async asyncData(context) {
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
    return {
      scheduleInputs: schedule,
      minValue: minSchedule - 1,
    };
  },
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
  watch: {
    scheduleInputs: function (val) {
      this.isPlus = val.length - 1;
    },
  },
  data() {
    return {
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