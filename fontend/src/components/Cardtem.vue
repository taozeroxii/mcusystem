<template>
  <v-card color="white" class="mx-auto loading rounded-xl" max-width="100%">
    <v-card-title :class="this.overload ? 'red darken-4' : ''">
      <h3 :class="this.overload ? 'white--text' : ''">
        {{ this.$props.dataforcard.mcu_addr }}
      </h3>
      <v-spacer></v-spacer>
      <div v-if="this.$props.dataforcard.status">
        <v-icon
          class="form-control"
          :class="this.overload ? 'white--text' : 'green--text'"
        >
          mdi-checkbox-marked-circle-outline</v-icon
        >
        <sub
          class="font-italic text-decoration-overline"
          :class="this.overload ? 'white--text' : 'green--text'"
          style="font-size: 10px"
        >
          Connect</sub
        >
      </div>
      <div v-else>
        <v-icon class="form-control white--text">
          mdi-filter-remove-outline</v-icon
        >
        <sub
          class="font-italic text-decoration-overline white--text"
          style="font-size: 10px"
        >
          Disconnect</sub
        >
      </div>
      <!-- <h3 :class="this.$props.dataforcard.status == 'เชื่อมต่อ'  ? 'green--text form-control'  : 'red--text form-control' "> {{ "&nbsp;" + this.$props.dataforcard.status }}</h3> -->
    </v-card-title>

    <hr />
    <v-card-subtitle class="justify-center">
      <v-card-text>
        <v-row align="center">
          <v-col
            :class="this.$props.dataforcard.temnow < 27 ? '' : 'red--text'"
            class="text-h6"
            cols="4"
            ><sup class="font-italic">อุณหภูมิ</sup><br />
            {{ this.$props.dataforcard.temnow }}&deg;C</v-col
          >
          <v-col
            :class="
              this.$props.dataforcard.moisture_now < 60 ? '' : 'red--text'
            "
            class="text-h6"
            cols="4"
          >
            <sup class="font-italic">ความชื้น</sup> <br />
            {{ this.$props.dataforcard.moisture_now }} %
          </v-col>
          <v-col
            :class="this.$props.dataforcard.elect > 200 ? '' : 'red--text'"
            class="text-h6"
            cols="4"
            ><sup class="font-italic">กำลังไฟ</sup><br />
            {{ this.$props.dataforcard.elect }}
            V
          </v-col>
        </v-row>
      </v-card-text>
    </v-card-subtitle>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }} </v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text v-if="this.$props.dataforcard.temnow">
          <b
            >ข้อมูลอัพเดทล่าสุด ณ {{ this.$props.dataforcard.updatetime }} น.
          </b>
          <br />
          <b>Mcu Id : {{ this.$props.dataforcard.id }} </b> | ค่าอุณหภูมิตั้งไว้
          26 &deg;C <br />
          ข้อมูลอุณหภูมิจะถูกอัพเดทในทุกๆ 30 วินาที <br />
          หากไม่มีการอัพเดทข้อมูล >= 3 นาที = ขาดการเชื่อมต่อ
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "cardtem",
  data() {
    return {
      show: false,
      overload: false,
    };
  },
  props: {
    dataforcard: {
      required: true,
    },
  },
  mounted() {
    if (
      this.$props.dataforcard.temnow >= 27 ||
      this.$props.dataforcard.moisture_now >= 60 ||
      this.$props.dataforcard.elect < 200 ||
      !this.$props.dataforcard.status
    )
      this.overload = true;
  },
};
</script>

<style>
</style>
