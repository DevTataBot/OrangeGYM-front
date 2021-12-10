<template>
  <div id="Transaction" class="transaction">
    <div class="container_transaction">
      <h2>Realizar Incripción</h2>
      <form v-on:submit.prevent="processTransaction">
        <label for="">Planes:</label>
        <select class="form-control" v-model="selectedId">
          <option v-for="item in items" v-bind:value="item" :key="item.id"  >
            {{ item.val }} --> {{item.id}} 
          </option>
        </select>

        <br />
        <label for="">Costo:</label>
        <input
          disabled
          :value="'$ '+selectedId.id + ' COP'"
        />
        <br />
        <button type="submit">Realizar Inscripción</button>
      </form>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";
export default {
  name: "Transaction",
  data: function () {
    return {
      items: [
        { id: 50000, val: "PlanBlack" },
        { id: 70000, val: "PlanSmart" },
        { id: 80000, val: "PlanWhite" },
      ],
      selectedId:0,
      createTransaction: {
        usernameOrigin: localStorage.getItem("username"),
        usernameDestiny: "",
        value: "",
      },
    };
  },
  methods: {
    processTransaction: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      localStorage.setItem("token_access", "");
      this.createTransaction["usernameDestiny"] = this.selectedId.val
      this.createTransaction["value"] = this.selectedId.id
     
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($refresh: String!) {
              refreshToken(refresh: $refresh) {
                access
              }
            }
          `,
          variables: {
            refresh: localStorage.getItem("token_refresh"),
          },
        })
        .then((result) => {
          localStorage.setItem("token_access", result.data.refreshToken.access);
        })
        .catch((error) => {
          this.$emit("logOut");
          return;
        });
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($transaction: TransactionInput!) {
              createTransaction(transaction: $transaction) {
                date
                id
                usernameDestiny
                usernameOrigin
                value
              }
            }
          `,
          variables: {
            transaction: this.createTransaction,
          },
        })
        .then((result) => {
          alert("Transacción Realizada de Manera Correcta, Revise Historial");
        })
        .catch((error) => {
          alert("Saldo Insuficiente o Destino Incorrecto");
        });
    },
  },
};
</script>
<style>
.transaction {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/transaction-img.jpg");
}
.container_transaction {
  background-color: #ff5403;
  border-radius: 10px;
  width: 25%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.transaction h2 {
  color: #000;
}
.transaction form {
  width: 50%;
}
.transaction input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
}
.transaction button {
  width: 100%;
  background-color: #ff5403;
  color: #000;
  border: none;
  padding: 10px 25px;
  margin: 5px 0;
}
.transaction button:hover {
  color: #000;
  background: #fff;
  border-radius: 5px;
}
</style>