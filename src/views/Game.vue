<template>
  <div class="game">
    <header class="page-header">
      <h1>Game {{gameId}} by {{author}}</h1>
    </header>


    <p>{{numOfDiscs}}</p>
    <game-render class="game-render" v-bind:matrix="matrix"></game-render>
		<p>{{levelPoints}}</p>

  </div>
</template>


<script>
import Settings from "@/settings";
import GameRender from "@/components/game-render";
import DBProxy from "@/dbproxy";
import { SAVE_GAME_STATE } from "@/store/game/types";
import { countElements } from '@/scripts/utils';
import { updateElement } from '@/scripts/utils';

export default {
  name: "game",
  components: {
    "game-render": GameRender
  },

  props:{
    id:{
      type: String,
      default: '0'
    }
  }, 

  data() {
    return {
      //: [0, 1, 2, 3],
      matrix: [], //this.$store.state.game.currentGame || [],
      author:'',
      level: this.id,
      totalDiscs:undefined,
      tickInterval: 200,
      bufferedMovement:undefined,
      tick: 0
    };
  },

  mounted() {
    this.loadGame();
  },

  created() {
    //this.generateMaze();
    //window.addEventListener("keydown", this.tryMovement);
    //window.addEventListener('keyup', this.stopMovement);
    //if(this.$store.state.game.currentGame){
    //this.$set(this, 'matrix', this.$store.state.game.currentGame);
    //}
  },

  computed: {
    gameId(){
      return parseInt(this.level);
    },
    index() {
      return this.matrix ? this.matrix.indexOf(Settings.TILE_TYPES.PACMAN) : 0;
    },
    levelPoints(){
      return Math.floor((this.totalDiscs-this.numOfDiscs)/this.totalDiscs*Settings.LEVEL_POINTS);
    },
    numOfDiscs() {
      return countElements(this.matrix, Settings.TILE_TYPES.DISC);
    }
  },

  methods: {
    loadGame() {
      let query = this.gameId ? DBProxy.getGameScreenById : DBProxy.getGameScreen;
      query(this.gameId)
        .then(screendata => {
          //console.log("screendata", screendata);
          this.startGame(screendata);
        })
        .catch(error => {
          console.log("error", error);
        });
    },


    startGame(data) {
      //console.log("data", data);

      this.level=data.id;
      this.author=data.author;
          
      this.$set(this, "matrix", data.matrix);
      this.totalDiscs = countElements(this.matrix, Settings.TILE_TYPES.DISC);
      window.addEventListener("keydown", this.onKeydown);
    },

    goNextLevel(){
      
      DBProxy.getNextScreen(this.gameId)
      .then(screendata => {
          //console.log("screendata", screendata);
          this.startGame(screendata);
        })
        .catch(error => {
          console.log("error", error);
        });
    },

    onKeydown(e) {
      this.bufferedMovement=null;
      const movements = {
        ArrowUp: -Settings.MATRIX_COLUMNS,
        ArrowDown: Settings.MATRIX_COLUMNS,
        ArrowLeft: -1,
        ArrowRight: 1
      };

      let movement=movements[e.key];
      if (!movement) return false;
      this.tryMovement(movement);
    },

    tryMovement(movement) {
      
      // Si hay un movimiento anterior y lo puedes hacer, haz ese
      if(this.bufferedMovement && this.canDo(this.bufferedMovement)){
        this.doMovement(this.bufferedMovement);
      }else{
        // Si no, haz el movimiento actual, si es posible
        if(this.canDo(movement)){
          this.doMovement(movement);
        }else{
          // Si no es posible hacer el movimiento actual, guardalo en el buffer
          this.bufferedMovement=movement;
          return false;
        }
      }

      
    },

    doMovement(movement) {
      let dx = this.checkLimits(movement);
      this.goto(this.matrix, this.index, dx);
      this.stopMovement();
      this.keyLoop(movement);
    },

    stopMovement() {
      if(this.tick){
        window.clearTimeout(this.tick);
        delete this.tick;
      }
    },

    canDo(movement){
      let dx = this.checkLimits(movement);
      return !this.isWall(this.matrix,this.index,dx);
    },

    keyLoop(movement){
      this.tick = window.setTimeout(this.tryMovement, this.tickInterval, movement);
    },

    goto(matrix, index, dx) {
      let newarr=updateElement(matrix, index, Settings.TILE_TYPES.BLANK);
      newarr=updateElement(newarr, index+dx, Settings.TILE_TYPES.PACMAN);//this.recalculate(this.matrix, this.index, dx);
      this.$set(this, "matrix", newarr);
    },

    isWall(matrix, index, dx) {
      return matrix[index + dx] === Settings.TILE_TYPES.WALL;
    },

    checkLimits(dx) {
      return this.checkTop(
        this.checkBottom(this.checkLeft(this.checkRight(dx)))
      );
    },

    checkBottom(dx) {
      //console.log(Math.floor(this.index%Settings.MATRIX_COLUMNS));
      return dx === Settings.MATRIX_COLUMNS && this.index + dx > this.matrix.length
        ? (dx -= this.matrix.length)
        : dx;
    },

    checkTop(dx) {
      return dx === -Settings.MATRIX_COLUMNS && this.index + dx < 0
        ? (dx += this.matrix.length)
        : dx;
    },

    checkRight(dx) {
      return dx === 1 &&
        this.index % Settings.MATRIX_COLUMNS == Settings.MATRIX_COLUMNS - 1
        ? (dx -= Settings.MATRIX_COLUMNS)
        : dx;
    },

    checkLeft(dx) {
      //console.log("(this.index+dx)%Settings.MATRIX_COLUMNS", (this.index+dx)%Settings.MATRIX_COLUMNS);
      return dx === -1 && this.index % Settings.MATRIX_COLUMNS == 0
        ? (dx += Settings.MATRIX_COLUMNS)
        : dx;
    }

  },

  watch: {
    numOfDiscs() {
      if (!isNaN(this.numOfDiscs) && this.numOfDiscs < 1) {
        setTimeout(()=>{
          this.stopMovement();
          let confirm=window.confirm("enhorabuena, pasamos de nivel?");
          if(!confirm) return false;
          this.goNextLevel();
        }, 1000);
        
      }
    }
  },

  beforeDestroy() {
    window.removeEventListener("keydown", this.tryMovement);
    window.clearTimeout(this.tick);
    this.$store.commit(SAVE_GAME_STATE, this.matrix);
  }
};
</script>

<style lang="scss">
.game {

  display: block;
  .game-render {
	width: 500px;
    margin: 20px auto;
  }
}
</style>
