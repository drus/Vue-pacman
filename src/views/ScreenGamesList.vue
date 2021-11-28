<template>
  <div>
	  <header class="page-header">
    	<h1>Screen Games list</h1>
	  </header>

    <ul class="games-list">
      <li class="games-list__item"
		v-for="(item, index) in gamescreens"
		v-bind:key="item.id"
		v-bind:data-id="item.id"
		>

	  	<!-- MINI MAP -->
        <game-render
          v-bind:style="cssVars"
          class="games-list__mini-render"
          v-bind:matrix="item.matrix"
        ></game-render>
        <div class="games-list__info">{{item.id}} {{item.author}}</div>
		
		<!-- DELETE -->
        <button
          v-on:click="deleteGame(item, index)"
          class="games-list__action-button"
        >❌</button>

		<!-- EDIT -->
        <router-link
          v-bind:to="`/designer/${item.id}`"
          class="games-list__action-button"
        >✏️️</router-link>
		
		<!-- PLAY -->
        <router-link
          v-bind:to="`/game/${item.id}`"
          class="games-list__action-button"
        >🕹️</router-link>

		

      </li>
    </ul>
  </div>
</template>

<script>
import Settings from "@/settings";
import GameRender from "@/components/game-render";
import DBProxy from "@/dbproxy";

export default {
  name: "screengamelist",
  components: {
    "game-render": GameRender
  },
  data() {
    return {
      gamescreens: []
    };
  },
  mounted() {
    this.loadGameScreens();
  },
  computed: {
    cssVars() {
      return {
        "--tilesize": 100 / Settings.MATRIX_COLUMNS + "%"
      };
    }
  },

  methods: {
    loadGameScreens() {
      DBProxy.getGameScreens('force')
        .then(gamescreens => {
          //console.log("screendata", screendata);
          this.$set(this, "gamescreens", gamescreens);
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    deleteGame(game, index) {
	  let query=DBProxy.deleteGameScreen(game.id);
	  if(!query) return false;
	  
	  query.then(deleted=>{
		  	console.log("deleted", deleted);
			if (!deleted) return false;

			let newarr = [...this.gamescreens];
			newarr.splice(index, 1);
			console.log("newarr", newarr);
			this.$set(this, "gamescreens", newarr);
	  });


    }
  }
};
</script>


<style lang="scss">
.games-list {
  &__item {
    display: flex;
    //align-items: center;
    //align-content: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgb(58, 58, 58);
  }
  &__info {
    padding: 10px;
    margin: 0 10px;
  }
  &__action-button {
    padding: 10px;
    border: none;
    background-color: transparent;
  }
  &__mini-render {
    width: 50px;
    //display: inline-block;
  }
}
</style>
