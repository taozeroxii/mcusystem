<template>
  <v-container>
    <form @submit.prevent="onSubmit()">
      <v-text-field label="username"  v-model="form.username" required></v-text-field>
      <v-text-field
        :counter="6"
         v-model="form.password"
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
      console.log(this.form);
      // this.$router.push("./settingmenu");
    },
    clearform() {
      this.form.username = null;
      this.form.password = null;
    },
  },
};
</script>

<style></style>
