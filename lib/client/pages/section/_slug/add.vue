<template>
  <section>
    <textInput
      v-for="field in textComponent"
      :key="field.name"
      :title="field.name"
      :type="field.type"
      :placeholder="field.name"
      :obj="textInputValue[field.name]"
    ></textInput>
    <textAreaInput
      v-for="field in textAreaComponent"
      :key="field.name"
      :title="field.name"
      :placeholder="field.name"
      :obj="textAreaInputValue[field.name]"
    ></textAreaInput>
    <dropdown
      v-for="field in dropdownComponent"
      :key="field.name"
      :title="field.name"
      :placeholder="field.name"
      :obj="dropdownInputValue[field.name]"
      :data="dropdownDefault[field.name]"
    ></dropdown>
    <textDropDown
      v-for="field in textDropdownComponent"
      :key="field.name"
      :title="field.name"
      :placeholder="field.name"
      :obj="textDropdownInputValue[field.name].text"
      :arr="textDropdownInputValue[field.name].dropdown"
      :data="textDropdownDefault[field.name]"
    ></textDropDown>
    <uploadInput
      v-for="field in uploadComponent"
      :key="field.name"
      :title="field.name"
      :placeholder="field.name"
      :obj="uploadInputValue[field.name]"
      :loading="openLoading"
    ></uploadInput>
    <radio
      v-for="field in radioComponent"
      :key="field.name"
      :title="field.name"
      :data="radioDefault[field.name]"
      :obj="radioInputValue[field.name]"
    ></radio>
    <checkbox
      v-for="field in checkboxComponent"
      :key="field.name"
      :title="field.name"
      :data="checkboxDefault[field.name]"
      :arr="checkboxInputValue[field.name]"
    ></checkbox>
    <div v-for="key in scheduleKey" :key="key">
      <div class="input-title">
        <p class="subtitle" style="font-size:16px;">
          <b>{{key}}</b>
        </p>
      </div>
      <schedule
        :userType="scheduleComponentType[key]"
        v-for="(input,index) in scheduleInputValue[key]"
        :key="index+key"
        :isMin="index > scheduleMin[key] - 1"
        :add="addSchedule"
        :remove="removeSchedule"
        :index="index"
        :obj="scheduleInputValue[key][index]"
        :name="key"
      ></schedule>
    </div>
    <div v-for="key in multipleKey" :key="key">
      <div class="input-title">
        <p class="subtitle" style="font-size:16px;">
          <b>{{key}}</b>
        </p>
      </div>
      <multipleText
        v-for="(input,index) in multipleTextInputValue[key]"
        :key="index+key"
        :index="index"
        :placeholder="key+' '+(index+1)"
        :obj="multipleTextInputValue[key][index]"
        :isMin="index > multipleTextMin[key] - 1"
        :name="key"
        :add="addMultipleText"
        :remove="removeMultipleText"
        :type="multipleTextComponentType[key]"
      ></multipleText>
    </div>
    <richText
      v-for="field in richTextComponent"
      :key="field.name"
      :title="field.name"
      :placeholder="field.name"
      :obj="richTextInputValue[field.name]"
    ></richText>
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
    <b-button type="is-primary" expanded @click="submit">Submit</b-button>
  </section>
</template>

<script>
import axios from "axios";
import allSchemas, { keys } from "../../../generated/generated_schemas";
import checkbox from "../../../components/CheckBox";
import dropdown from "../../../components/Dropdown";
import radio from "../../../components/Radio";
import textInput from "../../../components/Text";
import textAreaInput from "../../../components/TextArea";
import textDropDown from "../../../components/TextDropdown";
import uploadInput from "../../../components/UploadButton";
import richText from "../../../components/RichText";
import multipleText from "../../../components/MultipleText";

export default {
  async asyncData({ params }) {
    const schemas = allSchemas.filter(
      (i) => i.name.toLowerCase() === params.slug
    )[0];

    //Rich Component
    const richTextInputValue = {};
    const richTextComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "rich-text") {
        richTextInputValue[i.name] = {
          value: "",
        };
        return i;
      }
    });

    //Text Component
    const textInputValue = {};
    const textComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "text") {
        textInputValue[i.name] = {
          value: null,
        };
        return i;
      }
    });

    //TextArea Component
    const textAreaInputValue = {};
    const textAreaComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "textarea") {
        textAreaInputValue[i.name] = {
          value: null,
        };
        return i;
      }
    });

    //Dropdown Component
    const dropdownInputValue = {};
    const dropdownDefault = {};
    const dropdownComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "dropdown") {
        dropdownInputValue[i.name] = {
          value: null,
        };
        dropdownDefault[i.name] = i.default;
        return i;
      }
    });

    //Text Dropdown Component
    const textDropdownInputValue = {};
    const textDropdownDefault = {};
    const textDropdownComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "text-dropdown") {
        textDropdownInputValue[i.name] = {
          text: { value: null },
          dropdown: { value: null },
        };
        textDropdownDefault[i.name] = i.default;
        return i;
      }
    });

    //Upload Component
    const uploadInputValue = {};
    const uploadComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "upload") {
        uploadInputValue[i.name] = {
          value: null,
        };
        return i;
      }
    });

    //Radio Component
    const radioInputValue = {};
    const radioDefault = {};
    const radioComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "radio") {
        radioInputValue[i.name] = {
          value: null,
        };
        radioDefault[i.name] = i.default;
        return i;
      }
    });

    //Checkbox Component
    const checkboxInputValue = {};
    const checkboxDefault = {};
    const checkboxComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "checkbox") {
        checkboxInputValue[i.name] = [];
        checkboxDefault[i.name] = i.default;
        return i;
      }
    });

    //Schedule Component
    const scheduleInputValue = {};
    const scheduleMin = {};
    const scheduleComponentType = {};
    const scheduleComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "schedule") {
        scheduleMin[i.name] = i.scheduleMin;
        scheduleInputValue[i.name] = [];
        scheduleComponentType[i.name] = i.componentType;
        for (let j = 0; j < i.scheduleMin; j++) {
          scheduleInputValue[i.name].push([
            {
              day: null,
            },
            {
              hour: null,
            },
          ]);
        }

        return i;
      }
    });
    const scheduleKey = Object.keys(scheduleInputValue);

    //MultipleText Component
    const multipleTextInputValue = {};
    const multipleTextMin = {};
    const multipleTextComponentType = {};

    const multipleTextComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "multiple_text") {
        multipleTextMin[i.name] = i.multipleTextMin;
        multipleTextInputValue[i.name] = [];
        multipleTextComponentType[i.name] = i.componentType;
        for (let j = 0; j < i.multipleTextMin; j++) {
          multipleTextInputValue[i.name].push({
            value: null,
          });
        }
        return i;
      }
    });

    const multipleKey = Object.keys(multipleTextInputValue);

    return {
      schemas,
      textInputValue,
      textComponent,
      textAreaInputValue,
      textAreaComponent,
      dropdownComponent,
      dropdownInputValue,
      dropdownDefault,
      textDropdownComponent,
      textDropdownInputValue,
      textDropdownDefault,
      uploadInputValue,
      uploadComponent,
      radioComponent,
      radioInputValue,
      radioDefault,
      checkboxComponent,
      checkboxInputValue,
      checkboxDefault,
      scheduleComponent,
      scheduleInputValue,
      scheduleMin,
      scheduleKey,
      scheduleComponentType,
      richTextComponent,
      richTextInputValue,
      multipleTextInputValue,
      multipleTextMin,
      multipleTextComponentType,
      multipleKey,
      path: params.slug,
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
    richText,
    multipleText,
  },
  data() {
    return {
      isLoading: false,
      isFullPage: false,
    };
  },
  computed: {
    checkboxInput: function () {
      const keys = Object.keys(this.checkboxInputValue);
      const result = {};
      keys.forEach((element) => {
        const filterArr = this.checkboxInputValue[element].filter(
          (i) => i != null && i != false
        );
        result[element] = { value: filterArr };
      });
      return result;
    },
  },
  methods: {
    addSchedule(index, name) {
      this.scheduleInputValue[name].push([
        {
          day: null,
        },
        {
          hour: null,
        },
      ]);
    },
    addMultipleText(index, name) {
      this.multipleTextInputValue[name].push({
        value: null,
      });
    },
    removeSchedule(index, name) {
      this.scheduleInputValue[name].splice(index, 1);
    },
    removeMultipleText(index, name) {
      this.multipleTextInputValue[name].splice(index, 1);
    },
    resetModel() {
      window.location.reload(true);
    },
    openLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    success() {
      setTimeout(() => {
        this.$buefy.notification.open({
          message: "Data Submitted Successfully",
          type: "is-info",
        });
      }, 1300);
    },
    danger() {
      const notif = this.$buefy.notification.open({
        duration: 5000,
        message: `Failed to Submit Data`,
        position: "is-bottom-right",
        type: "is-danger",
        hasIcon: true,
      });
      notif.$on("close", () => {
        this.$buefy.notification.open("notification closed!");
      });
    },
    async submit() {
      const inputValue = [
        this.textInputValue,
        this.textAreaInputValue,
        this.dropdownInputValue,
        this.radioInputValue,
        this.checkboxInput,
        this.richTextInputValue,
        this.uploadInputValue,
      ];

      const form = {};
      inputValue.forEach((inputValue) => {
        Object.keys(inputValue).forEach((key) => {
          form[key] = inputValue[key].value;
        });
      });

      // Schedule Data
      Object.keys(this.scheduleInputValue).forEach((key) => {
        form[key] = this.scheduleInputValue[key];
      });

      // Multiple Text Data
      Object.keys(this.multipleTextInputValue).forEach((key) => {
        let arrayText = this.multipleTextInputValue[key].map(
          (element) => element.value
        );
        form[key] = arrayText;
      });

      // Dropdown Text Data
      Object.keys(this.textDropdownInputValue).forEach((key) => {
        form[key] =
          this.textDropdownInputValue[key].dropdown.value &&
          this.textDropdownInputValue[key].text.value
            ? this.textDropdownInputValue[key].dropdown.value +
              " " +
              this.textDropdownInputValue[key].text.value
            : "";
      });

      console.log("ini form", form);

      try {
        const { data } = await axios.post(
          `http://localhost:8000/api/collections/${this.path}`,
          form
        );
        const route = `/section/${this.path.toLowerCase()}`;
        console.log("Data Result..", data.data);
        this.openLoading();
        this.success();
        this.$router.push(route);
      } catch (err) {
        console.log(err.response.data);
        this.danger();
      }
    },
  },
};
</script>

<style scoped>
.input-title {
  margin-bottom: 2%;
}
</style>