<template>
  <div class="signUp_user">
    <div class="container_signUp_user">
      <h2>Registrarse</h2>

      <form v-on:submit.prevent="processSignUp">
        <input type="text" v-model="user.username" placeholder="Username" />
        <br />

        <input type="password" v-model="user.password" placeholder="Password" />
        <br />

        <input type="text" v-model="user.name" placeholder="Name" />
        <br />

        <input type="email" v-model="user.email" placeholder="Email" />
        <br />

        <input
          type="number"
          v-model="user.balance"
          placeholder="Initial Balance"
        />
        <br />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  </div>
</template>




<script>
import gql from "graphql-tag";

export default {
  name: "SignUp",

  data: function () {
    return {
      user: {
        username: "",
        password: "",
        name: "",
        email: "",
        balance: 0,
      },
    };
  },

  methods: {
    processSignUp: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($userInput: SignUpInput!) {
              signUpUser(userInput: $userInput) {
                refresh
                access
              }
            }
          `,
          variables: {
            userInput: this.user,
          },
        })
        .then((result) => {
          let dataLogIn = {
            username: this.user.username,
            token_access: result.data.signUpUser.access,
            token_refresh: result.data.signUpUser.refresh,
          };
          this.$emit("completedSignUp", dataLogIn);
        })
        .catch((error) => {
          alert("ERROR: Fallo en el registro.");
        });
    },
  },
};
</script>






<style>
.signUp_user {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  background: url("../assets/bg-gym-inicio.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
}

.container_signUp_user {
  background-color: #ff5403;
  border-radius: 10px;
  width: 25%;
  height: auto;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.signUp_user h2 {
  color: #000;
}

.signUp_user form {
  width: 70%;
}

.signUp_user input {
  height: 40px;
  width: 100%;

  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
}

.signUp_user button {
  width: 100%;
  height: 40px;

  color: #000;
  background: #ff5403;

  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
  border: 1px solid #000;
}

.signUp_user button:hover {
  color: #ff5403;
  background: #fdfefe;
  border: none;
}
</style>