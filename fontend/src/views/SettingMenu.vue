<template>
  <v-container>
    <v-btn color="warning" @click="back"><v-icon>mdi-keyboard-backspace</v-icon>&nbsp; ย้อนกลับ</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "settingmenu",
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style></style>
