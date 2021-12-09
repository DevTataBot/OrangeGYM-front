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
          <p>{{ userDetailById.username }}</p>
        </h2>
        <h2>
          Correo electrónico:
          <p>{{ userDetailById.email }}</p>
        </h2>
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
}
.img-user{
  margin-right:10px;
  border-radius:10px;
  display: flex;
  justify-content: center;
}
.img-user img {
  height: 100%;
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
  border: 2px solid #ff5403;
  border-radius:10px
}

.information h1 {
  font-size: 50px;
  background-color: #ffc0a1;
    box-shadow: 5px 5px 10px rgb(167, 167, 167);
  border-radius:8px;

}

.information h2 {
  font-size: 10px;
  font-weight: bold;
}
.details h3 {
  font-size: 40px;
  text-align: center;
}
.details h2 {
  font-size: 35px;
}
.details p{
  background-color: #c0c0cc;
  border-radius:8px;
}
.details {
  padding: 30px 80px;
  margin: 30px 0 0 0;
}
</style>