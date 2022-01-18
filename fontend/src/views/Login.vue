<template>
  <v-container>
    <form @submit.prevent="onSubmit()">
      <v-text-field
        label="username"
        v-model="form.username"
        required
      ></v-text-field>
      <v-text-field
        :counter="6"
        v-model="form.password"
        label="password"
        type="password"
        required
      ></v-text-field>
      <v-btn type="submit" color="success" class="mr-4"> submit </v-btn>
      <v-btn @click="clearform()" class="mr-4" color="secondary"> clear </v-btn>
      <v-btn to="/Register" color="#018786" dark> register </v-btn>
    </form></v-container
  >
</template>

<script>
import axios from "axios";
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
      axios
        .post("api/managerUser/login", this.form)
        .then((response) => {
          const data = response.data;
          localStorage.setItem("token", data.token);
          localStorage.setItem("fname", data.fname);
          localStorage.setItem("lname", data.lname);
          localStorage.setItem("pname", data.pname);
          localStorage.setItem("username", data.username);
          this.$router.push("/");
        })
        .catch(() => {
          this.loading = false;
          this.ck_connect = true;
        });
    },
    clearform() {
      localStorage.clear();
      this.form.username = null;
      this.form.password = null;
    },
  },
};
</script>

<style></style>
