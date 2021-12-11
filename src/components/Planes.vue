<template>
  <div class="planes-info">
    <h2>Planes del GYM</h2>
    <div class="planes-card">
      <div class="plan">
        <div class="info-plan">
          <h3>Plan Black</h3>
          <p>50000</p>
        </div>
        <ul>
          <li>Acceso a una sola sede en Colombia de OrangeGYM</li>
          <li>Todas las zonas de cardio, pesas y funcional</li>
          <li>Sin opción de transferir tu plan</li>
        </ul>
        <button v-on:click="loadTransaction">Comprar</button>
      </div>
      <div class="plan">
        <div class="info-plan">
          <h3>Plan Smart</h3>
          <p>70000</p>
        </div>
        <ul>
          <li>Acceso a mas sedes en Colombia de OrangeGYM</li>
          <li>Todas las zonas de cardio, pesas y funcional</li>
          <li>Con opción de transferir tu plan</li>
        </ul>
        <button v-on:click="loadTransaction">Comprar</button>
      </div>
      <div class="plan">
        <div class="info-plan">
          <h3>Plan White</h3>
          <p>80000</p>
        </div>
        <ul>
          <li>Acceso a mas sedes en Colombia de OrangeGYM</li>
          <li>Todas las zonas de cardio, pesas y funcional</li>
          <li>Con opción de transferir tu plan</li>
          <li>Entrenador personal</li>
        </ul>
        <button v-on:click="loadTransaction" class="button1">Comprar</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Planes",
  methods:{
    loadTransaction: function () {
      this.$router.push({ name: "transaction" });
    },
  }
};
</script>
<style>
.planes-info {
  padding: 20px;
  height: 100%;
  background: url('../assets/planes.jpg');
}
.planes-info h2 {
  font-size: 30px;
  background-color: #ffd4c0;
  box-shadow: 5px 5px 10px;
  margin: 20px auto;
  border-radius: 8px;
  width: 250px;
  padding: 8px;
}
.planes-card {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  height: 270px;
}
.planes-card .plan {
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  box-shadow: 5px 5px 10px;
}
.plan .info-plan {
  position: relative;
  background-color: #000;
  top: -20px;
  right: -40px;
  left: -20px;
  width: 250px;
  border-radius: 10px 10px 0 0;
  padding: 10px;
}
.plan .info-plan h3, p{
  color: #ff5403;
  text-align: center;
}
.plan button{
  margin-top: 30px;
  width: 100%;
  height: 30px;
  background-color: #ff5403;
  border: none;
  border-radius: 5px;
}
.plan .button1{
  margin-top: 16px;
  width: 100%;
  height: 30px;
}
.plan ul{
  padding: 0 10px;
}
.plan ul li{
  font-size: 12px;
}
</style>