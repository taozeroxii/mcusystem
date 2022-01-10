<template>
  <v-container>
    <h3>ตั้งค่า</h3>

    
    <v-row justify="space-around">
      <v-col v-for="elevation in elevations" :key="elevation" cols="12" md="4">
        <v-sheet class="pa-12" color="grey lighten-3">
          <v-sheet :elevation="elevation"  class="mx-auto" height="100"  width="100">{{elevation}}</v-sheet>
        </v-sheet>
      </v-col>
    </v-row>

    <v-btn color="warning" class="mt-3" @click="back"><v-icon>mdi-keyboard-backspace</v-icon>&nbsp; ย้อนกลับ</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "settingmenu",data() {
    return {
        elevations: [6, 12, 18],
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style></style>
