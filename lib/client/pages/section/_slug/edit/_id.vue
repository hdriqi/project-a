<template>
  <div v-if="!isFetching" class="max-w-lg mr-auto">
    <section style="display: flex; flex-direction: column;">
      <textInput
        v-for="field in textComponent"
        :key="field.name"
        :title="field.name"
        :type="field.type"
        :placeholder="field.name"
        :obj="textInputValue[field.name]"
        :order="field.order"
      ></textInput>
      <textAreaInput
        v-for="field in textAreaComponent"
        :key="field.name"
        :title="field.name"
        :placeholder="field.name"
        :obj="textAreaInputValue[field.name]"
        :order="field.order"
      ></textAreaInput>
      <dropdown
        v-for="field in dropdownComponent"
        :key="field.name"
        :title="field.name"
        :placeholder="field.name"
        :obj="dropdownInputValue[field.name]"
        :data="dropdownDefault[field.name]"
        :order="field.order"
      ></dropdown>
      <textDropDown
        v-for="field in textDropdownComponent"
        :key="field.name"
        :title="field.name"
        :placeholder="field.name"
        :obj="textDropdownInputValue[field.name].text"
        :arr="textDropdownInputValue[field.name].dropdown"
        :data="textDropdownDefault[field.name]"
        :order="field.order"
      ></textDropDown>
      <uploadInput
        v-for="field in uploadComponent"
        :key="field.name"
        :title="field.name"
        :placeholder="field.name"
        :obj="uploadInputValue[field.name]"
        :loading="openLoading"
        :order="field.order"
        :isUpload="uploadInputValue[field.name]"
      ></uploadInput>
      <radio
        v-for="field in radioComponent"
        :key="field.name"
        :title="field.name"
        :order="field.order"
        :data="radioDefault[field.name]"
        :obj="radioInputValue[field.name]"
      ></radio>
      <checkbox
        v-for="field in checkboxComponent"
        :key="field.name"
        :title="field.name"
        :order="field.order"
        :data="checkboxDefault[field.name]"
        :arr="checkboxInputValue[field.name]"
      ></checkbox>
      <div
        v-for="key in scheduleKey"
        :key="key"
        :style="{
        order: scheduleComponentOrder[key]
      }"
      >
        <div class="input-title">
          <p class="subtitle" style="font-size:16px;">
            <b>{{key}}</b>
          </p>
        </div>
        <schedule
          v-for="(input,index) in scheduleInputValue[key]"
          :userType="scheduleComponentType[key]"
          :key="index+key"
          :isMin="index > scheduleMin[key] - 1"
          :add="addSchedule"
          :remove="removeSchedule"
          :index="index"
          :obj="scheduleInputValue[key][index]"
          :name="key"
          :order="scheduleComponentOrder[key]"
        ></schedule>
      </div>
      <div
        v-for="key in multipleKey"
        :key="key"
        :style="{
          order: multipleTextComponentOrder[key]
        }"
      >
        <div class="input-title flex justify-between">
          <p style="font-size:16px;">
            <b>{{key}}</b>
          </p>
          <div>
            <b-button
              type="is-primary"
              icon-right="plus"
              class="button-schedule"
              @click="addMultipleText(0,key)"
              label="Add"
              size="is-small"
            />
          </div>
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
        :order="field.order"
      ></richText>
    </section>
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
    <b-button type="is-primary" expanded @click="submit">Submit</b-button>
  </div>
</template>

<script>
import axios from "axios";
import allSchemas, { keys } from "../../../../generated/generated_schemas";
import checkbox from "../../../../components/CheckBox";
import dropdown from "../../../../components/Dropdown";
import radio from "../../../../components/Radio";
import textInput from "../../../../components/Text";
import textAreaInput from "../../../../components/TextArea";
import textDropDown from "../../../../components/TextDropdown";
import uploadInput from "../../../../components/UploadButton";
import richText from "../../../../components/RichText";
import multipleText from "../../../../components/MultipleText";

export default {
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
  async asyncData({ params }) {
    return {
      isFetching: true,
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

      try {
        const { data } = await axios.put(
          `${process.env.BASE_URL}/api/collections/${this.path}/${this.id}`,
          form
        );
        const route = `/section/${this.path.toLowerCase()}`;
        this.openLoading();
        this.success();
        if (!this.isMultiple) {
          this.$router.push(`/`);
        } else {
          this.$router.push(route);
        }
      } catch (err) {
        this.danger();
      }
    },
  },
  async mounted() {
    
    const params = this.$route.params;
    
    const schemas = allSchemas.filter(
      (i) => i.name.toLowerCase() === params.slug
    )[0];

    const fields = schemas.fields.map((field, idx) => {
      field.order = idx;
      return field;
    });
    schemas.fields = fields;

    const url = `${process.env.BASE_URL}/api/collections/${params.slug}?_id=${params.id}`;
    let oneData;
    let listKeysData;
    try {
      axios.defaults.headers.common['x-api-key'] = window.localStorage.getItem("token");
      const { data } = await axios.get(url);
      oneData = data.data[0];
      listKeysData = oneData;
    } catch (error) {
      throw error;
    }

    //Rich Component
    const richTextInputValue = {};
    const richTextComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "rich-text") {
        if (listKeysData[i.name]) {
          richTextInputValue[i.name] = {
            value: listKeysData[i.name],
          };
        } else {
          richTextInputValue[i.name] = {
            value: "",
          };
        }
        return i;
      }
    });

    //Text Component
    const textInputValue = {};
    const textComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "text") {
        if (listKeysData[i.name]) {
          textInputValue[i.name] = {
            value: listKeysData[i.name],
          };
        } else {
          textInputValue[i.name] = {
            value: null,
          };
        }
        return i;
      }
    });

    //TextArea Component
    const textAreaInputValue = {};
    const textAreaComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "textarea") {
        if (listKeysData[i.name]) {
          textAreaInputValue[i.name] = {
            value: listKeysData[i.name],
          };
        } else {
          textAreaInputValue[i.name] = {
            value: null,
          };
        }
        return i;
      }
    });

    //Dropdown Component
    const dropdownInputValue = {};
    const dropdownDefault = {};
    const dropdownComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "dropdown") {
        if (listKeysData[i.name]) {
          dropdownInputValue[i.name] = {
            value: listKeysData[i.name],
          };
        } else {
          dropdownInputValue[i.name] = {
            value: null,
          };
        }
        dropdownDefault[i.name] = i.default;
        return i;
      }
    });

    //Text Dropdown Component
    const textDropdownInputValue = {};
    const textDropdownDefault = {};
    const textDropdownComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "text-dropdown") {
        if (listKeysData[i.name]) {
          const splitData = listKeysData[i.name].split(" ");
          textDropdownInputValue[i.name] = {
            text: { value: splitData[1] },
            dropdown: { value: splitData[0] },
          };
        } else {
          textDropdownInputValue[i.name] = {
            text: { value: null },
            dropdown: { value: null },
          };
        }
        textDropdownDefault[i.name] = i.default;
        return i;
      }
    });

    //Upload Component
    const uploadInputValue = {};
    const uploadComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "upload") {
        if (listKeysData[i.name]) {
          uploadInputValue[i.name] = {
            value: listKeysData[i.name],
          };
        } else {
          uploadInputValue[i.name] = {
            value: null,
          };
        }
        return i;
      }
    });

    //Radio Component
    const radioInputValue = {};
    const radioDefault = {};
    const radioComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "radio") {
        if (listKeysData[i.name]) {
          radioInputValue[i.name] = {
            value: listKeysData[i.name],
          };
        } else {
          radioInputValue[i.name] = {
            value: null,
          };
        }
        radioDefault[i.name] = i.default;
        return i;
      }
    });

    //Checkbox Component
    const checkboxInputValue = {};
    const checkboxDefault = {};
    const checkboxComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "checkbox") {
        if (listKeysData[i.name]) {
          checkboxInputValue[i.name] = listKeysData[i.name];
        } else {
          checkboxInputValue[i.name] = [];
        }
        checkboxDefault[i.name] = i.default;
        return i;
      }
    });

    //Schedule Component
    const scheduleInputValue = {};
    const scheduleMin = {};
    const scheduleComponentType = {};
    const scheduleComponentOrder = {};

    const scheduleComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "schedule") {
        scheduleMin[i.name] = i.scheduleMin;
        scheduleInputValue[i.name] = [];
        scheduleComponentType[i.name] = i.componentType;
        scheduleComponentOrder[i.name] = i.order;
        if (listKeysData[i.name]) {
          for (let j = 0; j < listKeysData[i.name].length; j++) {
            scheduleInputValue[i.name].push(listKeysData[i.name][j]);
          }
        } else {
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
        }

        return i;
      }
    });
    const scheduleKey = Object.keys(scheduleInputValue);

    //MultipleText Component
    const multipleTextInputValue = {};
    const multipleTextMin = {};
    const multipleTextComponentType = {};
    const multipleTextComponentOrder = {};

    const multipleTextComponent = schemas.fields.filter((i) => {
      if (i.component.toLowerCase() === "multiple_text") {
        multipleTextMin[i.name] = i.multipleTextMin;
        multipleTextInputValue[i.name] = [];
        multipleTextComponentType[i.name] = i.componentType;
        multipleTextComponentOrder[i.name] = i.order;
        if (listKeysData[i.name]) {
          for (let j = 0; j < listKeysData[i.name].length; j++) {
            multipleTextInputValue[i.name].push({
              value: listKeysData[i.name][j],
            });
          }
        } else {
          for (let j = 0; j < i.multipleTextMin; j++) {
            multipleTextInputValue[i.name].push({
              value: null,
            });
          }
        }
        return i;
      }
    });

    const multipleKey = Object.keys(multipleTextInputValue);

    this.schemas = schemas;
    this.textInputValue = textInputValue;
    this.textComponent = textComponent;
    this.textAreaInputValue = textAreaInputValue;
    this.textAreaComponent = textAreaComponent;
    this.dropdownComponent = dropdownComponent;
    this.dropdownInputValue = dropdownInputValue;
    this.dropdownDefault = dropdownDefault;
    this.textDropdownComponent = textDropdownComponent;
    this.textDropdownInputValue = textDropdownInputValue;
    this.textDropdownDefault = textDropdownDefault;
    this.uploadInputValue = uploadInputValue;
    this.uploadComponent = uploadComponent;
    this.radioComponent = radioComponent;
    this.radioInputValue = radioInputValue;
    this.radioDefault = radioDefault;
    this.checkboxComponent = checkboxComponent;
    this.checkboxInputValue = checkboxInputValue;
    this.checkboxDefault = checkboxDefault;
    this.scheduleComponent = scheduleComponent;
    this.scheduleInputValue = scheduleInputValue;
    this.scheduleMin = scheduleMin;
    this.scheduleKey = scheduleKey;
    this.scheduleComponentOrder = scheduleComponentOrder;
    this.scheduleComponentType = scheduleComponentType;
    this.richTextComponent = richTextComponent;
    this.richTextInputValue = richTextInputValue;
    this.multipleTextInputValue = multipleTextInputValue;
    this.multipleTextMin = multipleTextMin;
    this.multipleTextComponentType = multipleTextComponentType;
    this.multipleTextComponentOrder = multipleTextComponentOrder;
    this.multipleKey = multipleKey;
    this.path = params.slug
    this.id = params.id
    this.data = oneData
    this.isMultiple = schemas.isMultiple
    this.isFetching = false;
  },
};
</script>

<style scoped>
.input-title {
  margin-bottom: 2%;
}
</style>