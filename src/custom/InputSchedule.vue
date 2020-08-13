<template>
  <div class="schedule-dropdown" :style="{
    order: order
  }">
    <div v-if="index == 0">
      <div class="columns">
        <div class="column">
          <div class="input-title">
            <p class="subtitle" style="font-size:12px;">
              <b>{{title}} {{index + 1}}</b>
            </p>
          </div>
        </div>
        <div class="column">
          <b-button
            v-if="index == 0"
            type="is-primary"
            icon-right="plus"
            class="button-schedule"
            @click="add(index,name)"
            label="schedule"
            size="is-small"
          />
        </div>
      </div>
    </div>
    <div v-else class="input-title">
      <p class="subtitle" style="font-size:12px;">
        <b>{{title}} {{index + 1}}</b>
      </p>
    </div>
    <div class="columns">
      <div class="column">
        <b-field>
          <b-select placeholder="Pilih Hari" v-model="inputDay" size="is-small">
            <option
              v-for="option in day_data"
              :value="option.id"
              :key="option.id"
            >{{ option.value }}</option>
          </b-select>
        </b-field>
      </div>
      <div class="column">
        <b-field>
          <b-select placeholder="Pilih Waktu" v-model="inputHour" size="is-small">
            <option
              v-for="option in timeData"
              :value="option.id"
              :key="option.id"
            >{{ option.value }}</option>
          </b-select>
          <b-button
            type="is-danger"
            icon-right="minus"
            class="button-schedule"
            v-if="isMin"
            @click="remove(index,name)"
            size="is-small"
          />
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "userType",
    "obj",
    "isPlus",
    "add",
    "remove",
    "index",
    "isMin",
    "name",
    "order",
    "isSchedule",
  ],
  computed: {
    title: function () {
      return this.userType
        ? this.userType == "student"
          ? "Jadwal Belajar"
          : "Jadwal Mengajar"
        : "";
    },
  },
  watch: {
    inputDay: function (val) {
      this.obj[0].day = val;
      if (!this.isSchedule) {
        this.inputHour = null;
      } else {
        this.isSchedule = !this.isSchedule;
      }
      this.timeData = this.userType
        ? this.userType == "student"
          ? this.student_time_data[val]
          : this.teacher_time_data[val]
        : [];
    },
    inputHour: function (val) {
      this.obj[1].hour = val;
    },
  },
  data() {
    return {
      inputDay: null,
      inputHour: null,
      timeData: [],
      day_data: [
        {
          value: "Senin",
          id: "senin",
        },
        {
          value: "Selasa",
          id: "selasa",
        },
        {
          value: "Rabu",
          id: "rabu",
        },
        {
          value: "Kamis",
          id: "kamis",
        },
        {
          value: "Jumat",
          id: "jumat",
        },
        {
          value: "Sabtu",
          id: "sabtu",
        },
        {
          value: "Minggu",
          id: "minggu",
        },
      ],
      student_time_data: {
        senin: [
          {
            value: "15.00",
            id: "15.00",
          },
          {
            value: "16.30",
            id: "16.30",
          },
          {
            value: "18.30",
            id: "18.30",
          },
          {
            value: "19.30",
            id: "19.30",
          },
        ],
        selasa: [
          {
            value: "15.00",
            id: "15.00",
          },
          {
            value: "16.30",
            id: "16.30",
          },
          {
            value: "18.30",
            id: "18.30",
          },
          {
            value: "19.30",
            id: "19.30",
          },
        ],
        rabu: [
          {
            value: "15.00",
            id: "15.00",
          },
          {
            value: "16.30",
            id: "16.30",
          },
          {
            value: "18.30",
            id: "18.30",
          },
          {
            value: "19.30",
            id: "19.30",
          },
        ],
        kamis: [
          {
            value: "15.00",
            id: "15.00",
          },
          {
            value: "16.30",
            id: "16.30",
          },
          {
            value: "18.30",
            id: "18.30",
          },
          {
            value: "19.30",
            id: "19.30",
          },
        ],
        jumat: [
          {
            value: "15.00",
            id: "15.00",
          },
          {
            value: "16.30",
            id: "16.30",
          },
          {
            value: "18.30",
            id: "18.30",
          },
          {
            value: "19.30",
            id: "19.30",
          },
        ],
        sabtu: [
          {
            value: "09.00",
            id: "09.00",
          },
          {
            value: "10.00",
            id: "10.00",
          },
          {
            value: "11.00",
            id: "11.00",
          },
          {
            value: "13.00",
            id: "13.00",
          },
          {
            value: "15.00",
            id: "15.00",
          },
          {
            value: "16.30",
            id: "16.30",
          },
          {
            value: "18.30",
            id: "18.30",
          },
          {
            value: "19.30",
            id: "19.30",
          },
        ],
        minggu: [
          {
            value: "09.00",
            id: "09.00",
          },
          {
            value: "10.00",
            id: "10.00",
          },
          {
            value: "11.00",
            id: "11.00",
          },
          {
            value: "13.00",
            id: "13.00",
          },
          {
            value: "15.00",
            id: "15.00",
          },
          {
            value: "16.30",
            id: "16.30",
          },
          {
            value: "18.30",
            id: "18.30",
          },
          {
            value: "19.30",
            id: "19.30",
          },
        ],
      },
      teacher_time_data: {
        senin: [
          {
            value: "09.00",
            id: "09.00",
          },
          {
            value: "10.00",
            id: "10.00",
          },
          {
            value: "11.00",
            id: "11.00",
          },
          {
            value: "13.00",
            id: "13.00",
          },
          {
            value: "15.00",
            id: "15.00",
          },
          {
            value: "16.30",
            id: "16.30",
          },
          {
            value: "18.30",
            id: "18.30",
          },
          {
            value: "19.30",
            id: "19.30",
          },
        ],
        selasa: [
          {
            value: "09.00",
            id: "09.00",
          },
          {
            value: "10.00",
            id: "10.00",
          },
          {
            value: "11.00",
            id: "11.00",
          },
          {
            value: "13.00",
            id: "13.00",
          },
          {
            value: "15.00",
            id: "15.00",
          },
          {
            value: "16.30",
            id: "16.30",
          },
          {
            value: "18.30",
            id: "18.30",
          },
          {
            value: "19.30",
            id: "19.30",
          },
        ],
        rabu: [
          {
            value: "09.00",
            id: "09.00",
          },
          {
            value: "10.00",
            id: "10.00",
          },
          {
            value: "11.00",
            id: "11.00",
          },
          {
            value: "13.00",
            id: "13.00",
          },
          {
            value: "15.00",
            id: "15.00",
          },
          {
            value: "16.30",
            id: "16.30",
          },
          {
            value: "18.30",
            id: "18.30",
          },
          {
            value: "19.30",
            id: "19.30",
          },
        ],
        kamis: [
          {
            value: "09.00",
            id: "09.00",
          },
          {
            value: "10.00",
            id: "10.00",
          },
          {
            value: "11.00",
            id: "11.00",
          },
          {
            value: "13.00",
            id: "13.00",
          },
          {
            value: "15.00",
            id: "15.00",
          },
          {
            value: "16.30",
            id: "16.30",
          },
          {
            value: "18.30",
            id: "18.30",
          },
          {
            value: "19.30",
            id: "19.30",
          },
        ],
        jumat: [
          {
            value: "09.00",
            id: "09.00",
          },
          {
            value: "13.00",
            id: "13.00",
          },
          {
            value: "15.00",
            id: "15.00",
          },
          {
            value: "16.30",
            id: "16.30",
          },
          {
            value: "18.30",
            id: "18.30",
          },
          {
            value: "19.30",
            id: "19.30",
          },
        ],
        sabtu: [
          {
            value: "09.00",
            id: "09.00",
          },
          {
            value: "10.00",
            id: "10.00",
          },
          {
            value: "11.00",
            id: "11.00",
          },
          {
            value: "13.00",
            id: "13.00",
          },
          {
            value: "15.00",
            id: "15.00",
          },
          {
            value: "16.30",
            id: "16.30",
          },
          {
            value: "18.30",
            id: "18.30",
          },
          {
            value: "19.30",
            id: "19.30",
          },
        ],
        minggu: [
          {
            value: "09.00",
            id: "09.00",
          },
          {
            value: "10.00",
            id: "10.00",
          },
          {
            value: "11.00",
            id: "11.00",
          },
          {
            value: "13.00",
            id: "13.00",
          },
          {
            value: "15.00",
            id: "15.00",
          },
          {
            value: "16.30",
            id: "16.30",
          },
          {
            value: "18.30",
            id: "18.30",
          },
          {
            value: "19.30",
            id: "19.30",
          },
        ],
      },
    };
  },
  mounted() {
    if (this.isSchedule) {
      this.inputDay = this.obj[0].day;
      this.inputHour = this.obj[1].hour;
    }
  },
};
</script>

<style scoped>
.input-title {
  margin-bottom: 1%;
}

.button-schedule {
  margin-left: 1%;
}

.schedule-dropdown {
  margin-bottom: 1.5%;
}
</style>