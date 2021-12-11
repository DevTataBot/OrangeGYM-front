<template>
<div class="general">
  <h3 class="title">Mis Inscripciones</h3>
  <div id="Historial">
    <div class="container">
      <h2>
        Titular Cuenta:
      </h2>
      <p>{{ username }}</p>
      <h2>
        Saldo:<br>
      </h2>
        <p>${{ accountByUsername.balance }} COP</p>
      <h2>
        Último Movimiento:
      </h2>
      <p>
          {{ accountByUsername.lastChange.substring(0, 10) }}
          {{ accountByUsername.lastChange.substring(11, 19) }}
      </p>
    </div>
    <div class="container-table">
      <table>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Origen</th>
          <th>Destino</th>
          <th>Valor</th>
        </tr>
        <tr v-for="transaction in transactionByUsername" :key="transaction.id">
          <td>{{ transaction.date.substring(0, 10) }}</td>
          <td>{{ transaction.date.substring(11, 19) }}</td>
          <td>{{ transaction.usernameOrigin }}</td>
          <td>{{ transaction.usernameDestiny }}</td>
          <td>${{ transaction.value }} COP</td>
        </tr>
      </table>
    </div>
  </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Account",
  data: function () {
    return {
      username: localStorage.getItem("username") || "none",
      transactionByUsername: [],
      accountByUsername: {
        balance: "",
        lastChange: "",
      },
    };
  },
  apollo: {
    transactionByUsername: {
      query: gql`
        query ($username: String!) {
          transactionByUsername(username: $username) {
            id
            usernameOrigin
            usernameDestiny
            value
            date
          }
        }
      `,
      variables() {
        return {
          username: this.username,
        };
      },
    },
    accountByUsername: {
      query: gql`
        query ($username: String!) {
          accountByUsername(username: $username) {
            balance
            lastChange
          }
        }
      `,
      variables() {
        return {
          username: this.username,
        };
      },
    },
  },
  created: function () {
    this.$apollo.queries.transactionByUsername.refetch();
    this.$apollo.queries.accountByUsername.refetch();
  },
};
</script>


<style>
.general{
  width: 100%;
  height: 100%;
  padding: 20px;
  background: url('../assets/cuenta-bg.jpg');
}
.title {
  width: 350px;
  font-size: 40px;
  background-color: #ffd4c0;
  border-radius: 5px;
  margin: auto ;
  box-shadow: 5px 5px 10px;
}
#Historial {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
#Historial .container-table {
  width: 50%;
  max-height: 250px;
  overflow-y: scroll;
  overflow-x: hidden;
}
#Historial table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #0000004d;
}
#Historial table td,
#Historial table th {
  border: 1px solid #ddd;
  padding: 8px;
}
#Historial table {
  background-color: #f2f2f2;
}
#Historial table tr:hover {
  background-color: #ddd;
}
#Historial table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #000;
  color: #ff5403;
}
#Historial > h3 {
  font-size: 25px;
}
#Historial .container {
  background-color: #fff;
  padding: 30px;
  box-shadow: 5px 5px 10px;
  border-radius: 20px;
  margin: 5% 0 1% 0;
}
#Historial .container h2 {
  font-size: 25px;
  background-color: #c0c0cc;
  border-radius: 5px;
}
#Historial .container p {
  border-radius: 5px;
  font-weight: bold;
  font-size: 18px;
  width: 200px;
  color: #000;
}
</style>