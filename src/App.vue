<template>
  <div id="app">
    <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/game">Game</router-link> |
      <router-link to="/screengamelist">Screen games list</router-link> |
      <router-link to="/designer">Screen designer</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import Settings from "@/settings";
import DBProxy from "@/dbproxy";
DBProxy.init(Settings.DB_URL);
export default {

}
</script>
<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
}
body {
  background-color: black;
  color: white;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  padding-top: 80px;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  .button-cta,
  input[type="text"] {
    border: none;
    background-color: white;
    //background-color: dodgerblue;
    //color:white;
    padding: 10px 20px;
    border-radius: 4px;
    margin: 0 5px;
    //padding: 4px 10px;
  }
}
.page-header {
  position: absolute;
  left: 10px;
  top: 10px;
  text-align: left;
  h1 {
    font-size: 1.7em;
    font-weight: normal;
    margin: 0;
  }
  p {
    margin: 0;
  }
}

.nav {
  position: absolute;
  right: 10px;
  top: 10px;
  color: gray;
  padding: 10px;

  a {
    padding: 5px;
    color: inherit;
    text-decoration: none;
    &:visited {
      color: inherit;
    }

    &:hover {
      color: white;
    }
  }
  a.router-link-exact-active {
    color: white;
  }
}
</style>
