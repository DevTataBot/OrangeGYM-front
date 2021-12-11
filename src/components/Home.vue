<template>
  <div class="info-general">
    <div class="img-user">
      <img src='../assets/fitness.png'/>
    </div>
    <div class="information">
      <h1>
        ¡Bienvenid@
        <span>{{ userDetailById.name }}</span
        >!
      </h1>
      <div class="details">
        <h2>
          Nombre de usuario:
        </h2>
        <p>{{ userDetailById.username }}</p>
        <h2>
          Correo electrónico:
        </h2>
        <p>{{ userDetailById.email }}</p>
      </div>
    </div>
  </div>
  
</template>


<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
  name: "Home",

  data: function () {
    return {
      userId: jwt_decode(localStorage.getItem("token_refresh")).user_id,
      userDetailById: {
        username: "",
        name: "",
        email: "",
      }, // username: localStorage.getItem('username') || "none"
    };
  },
  apollo: {
    userDetailById: {
      query: gql`
        query ($userId: Int!) {
          userDetailById(userId: $userId) {
            username
            name
            email
          }
        }
      `,
      variables() {
        return {
          userId: this.userId,
        };
      },
    },
  },
};
</script>


<style>
.info-general {
  padding: 40px 40px 40px 5px;
  display: flex;
  height: 100%;
  background: url('../assets/home-bg.jpg');
}
.img-user{
  margin-left: 70px;
  border-radius:10px 0 0 10px;
  display: flex;
  justify-content: center;
  width: 50%;
  background-color: rgba(41, 41, 41, 0.486);
}
.img-user img {
  height: 300px;
  margin: auto;
}

.information {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(41, 41, 41, 0.486);
  border-radius:0 10px 10px 0;
}

.information h1 {
  font-size: 50px;
  background-color: #ffc0a1;
  box-shadow: 5px 5px 10px;
  border-radius:8px;
}

.information h2 {
  font-size: 10px;
  font-weight: bold;
}
.details h3 {
  font-size: 30px;
  text-align: center;
}
.details h2 {
  font-size: 35px;
  background-color: #c0c0cc;
  border-radius: 5px;
}
.details p{
  font-size: 25px;
  border-radius:8px;
  color: #fff;
}
.details {
  padding: 30px 80px;
  margin: 30px 0 0 0;
}
</style>