<template>
  <div class="logIn_user">
    <div class="container_logIn_user">
      <h2>Iniciar sesión</h2>

      <form v-on:submit.prevent="processLogInUser">
        <input type="text" v-model="user.username" placeholder="Username" />
        <br />
        <input type="password" v-model="user.password" placeholder="Password" />
        <br />
        <button type="submit">Iniciar Sesion</button>
      </form>
    </div>
  </div>
</template>




<script>
import gql from "graphql-tag";

export default {
  name: "LogIn",

  data: function () {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    processLogInUser: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($credentials: CredentialsInput!) {
              logIn(credentials: $credentials) {
                refresh
                access
              }
            }
          `,
          variables: {
            credentials: this.user,
          },
        })
        .then((result) => {
          let dataLogIn = {
            username: this.user.username,
            token_access: result.data.logIn.access,
            token_refresh: result.data.logIn.refresh,
          };
          this.$emit("completedLogIn", dataLogIn);
        })
        .catch((error) => {
          alert("ERROR 401: Credenciales Incorrectas.");
        });
    },
  },
};
</script>

<style>
.logIn_user {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  background: url("../assets/bg-gym-inicio.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
}

.container_logIn_user {
  background-color: #ff5403;
  border-radius: 10px;
  width: 25%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logIn_user h2 {
  color: #000;
}

.logIn_user form {
  width: 70%;
}

.logIn_user input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
}

.logIn_user button {
  width: 100%;
  height: 40px;
  color: #000;
  background: #ff5403;
  border: none;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0;
  border: 1px solid #000;
}

.logIn_user button:hover {
  color: #ff5403;
  background: #fdfefe;
  border: none;
}
</style>