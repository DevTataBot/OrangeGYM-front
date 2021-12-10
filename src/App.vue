<template>
  <div id="app" class="app">
    <div class="header">
      <h1>Orange GYM</h1>
      <nav>
        <button v-if="is_auth" v-on:click="loadPlanes">Comprar Planes</button>
        <button v-if="is_auth" v-on:click="loadPlanes">Rutinas</button>
        <button v-if="is_auth" v-on:click="loadAccount">Mi Cuenta</button>
        <button v-if="is_auth" v-on:click="loadTransaction">Inscripciones</button>
        <button v-if="is_auth" v-on:click="logOut">Cerrar Sesión</button>
        <button v-if="!is_auth" v-on:click="loadLogIn">Iniciar Sesión</button>
        <button v-if="!is_auth" v-on:click="loadSignUp">Registrarse</button>
      </nav>
    </div>

    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
      >
      </router-view>
    </div>

    <div class="footer">
      <h2>Misión TIC 2022</h2>
    </div>
  </div>
</template>




<script>
export default {
  name: "App",

  data: function () {
    return {
      is_auth: false,
    };
  },

  components: {},

  methods: {
    verifyAuth: function () {
      this.is_auth = localStorage.getItem("isAuth") || false;

      if (this.is_auth == false) this.$router.push({ name: "logIn" });
      else this.$router.push({ name: "home" });
    },

    loadLogIn: function () {
      this.$router.push({ name: "logIn" });
    },

    loadSignUp: function () {
      this.$router.push({ name: "signUp" });
    },
    loadPlanes: function () {
      this.$router.push({ name: "planes" });
    },
    completedLogIn: function (data) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      alert("Autenticación Exitosa");
      this.verifyAuth();
    },

    completedSignUp: function (data) {
      alert("Registro Exitoso");
      this.completedLogIn(data);
    },

    loadHome: function () {
      this.$router.push({ name: "home" });
    },

    loadAccount: function () {
      this.$router.push({ name: "account" });
    },

    logOut: function () {
      localStorage.clear();
      alert("Sesión Cerrada");
      this.verifyAuth();
    },
    loadTransaction: function () {
      this.$router.push({ name: "transaction" });
    },
  },

  created: function () {
    this.verifyAuth();
  },
};
</script>






<style>
@import url("https://fonts.googleapis.com/css2?family=Fuzzy+Bubbles:wght@400;700&display=swap");

* {
  font-family: "Fuzzy Bubbles", cursive;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  margin: 0 0 0 0;
}

.header {
  margin: 0%;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 100px;
  background-color: #ff5403;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  width: 20%;
  text-align: center;
}

.header nav {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
}

.header nav button {
  color: #000;
  background: #ff5403;
  border-radius: 5px;
  padding: 10px 10px;
  border: none;
  font-size: 16px;
}

.header nav button:hover {
  color: #ff5403;
  background: #fdfefe;
}

.main-component {
  height: 68.9vh;
  margin: 0%;
  padding: 0%;
  background: #fdfefe;
}

.footer {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 100px;

  background-color: #ff5403;
  color: #000;
}

.footer h2 {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
