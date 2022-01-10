<template>
  <v-container>
    <form @submit.prevent="onSubmit()">
      <v-text-field label="username" name="username" required></v-text-field>
      <v-text-field
        :counter="6"
        name="password"
        label="password"
        type="password"
        required
      ></v-text-field>
      <v-btn type="submit" color="success" class="mr-4"> submit </v-btn>
      <v-btn @click="clearform" color="secondary" > clear </v-btn>
    </form></v-container
  >
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("test");
      this.$router.push("./settingmenu");
    },
    clearform() {
      this.form.username = null;
      this.form.password = null;
    },
  },
};
</script>

<style></style>
