<template>
    <h2 class="title">Transacciones</h2>
  <div id="Historial">
    <div class="container">
      <h2>
        Titular Cuenta:
        <p>{{ username }}</p>
      </h2>
      <h2>
        Saldo:
        <p>${{ accountByUsername.balance }} COP</p>
      </h2>
      <h2>
        Último Movimiento:
        <p>
          {{ accountByUsername.lastChange.substring(0, 10) }}
          {{ accountByUsername.lastChange.substring(11, 19) }}
        </p>
      </h2>
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
.title{
    width: 300px;
    font-size: 40px;
    background-color: #ffd4c0;
    border-radius: 5px;
    margin: 25px auto 0;
    box-shadow: 5px 5px 10px rgb(167, 167, 167);
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

  border: 1px solid rgba (0, 0, 0, 0.3);
}
#Historial table td,
#Historial table th {
  border: 1px solid #ddd;

  padding: 8px;
}
#Historial table tr:nth-child(even) {
  background-color: #f2f2f2;
}
#Historial table tr:hover {
  background-color: #ddd;
}
#Historial table th {
  padding-top: 12px;
  padding-bottom: 12px;

  text-align: left;
  background-color: #ff5403;

  color: white;
}
#Historial > h2 {
  font-size: 25px;
}
#Historial .container {
  padding: 30px;
  border: 3px solid rgba (0, 0, 0, 0.3);

  border-radius: 20px;

  margin: 5% 0 1% 0;
}
#Historial .container h2 {
  font-size: 25px;

}
#Historial .container p {
    background-color: #c0c0cc;
    border-radius: 5px;
  font-weight: bold;
}
</style>