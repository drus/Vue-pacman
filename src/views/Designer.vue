<template>
  <div class="designer">
    <header class="page-header">
      <h1>Screen game {{gameId}} designer</h1>
      <p v-if="author">by {{author}}</p>
    </header>

    <game-designer
      class="game-designer"
      v-bind:matrix="matrix"
      v-on:click="onTileClick"
    ></game-designer>

    <p>
      <input v-if="!gameId" v-model:value="author" type="text" name="author" placeholder="Your name" />
      <button class="button-cta" v-on:click="finish()">SAVE</button>
    </p>
  </div>
</template>

<script>
import Settings from "@/settings";
import DBProxy from "@/dbproxy";
import { updateElement } from '@/scripts/utils';
import GameDesigner from "@/components/game-designer";

export default {
  name: "designer",
  components: {
    "game-designer": GameDesigner
  },
  mounted() {
    if(this.gameId){
      this.loadScreen(this.gameId);
    }else{
      let maze=this.generateMaze(Settings.MATRIX_COLUMNS,Settings.MATRIX_ROWS);
      this.init(maze);
    }
  },
  data() {
    return {
      // 1 disc
      // 2 wall
      //casting: [1, 2, 3],
      matrix:[],/* [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
      ],*/
      author: "drus"
    };
  },

  methods: {
    loadScreen(gameId) {
      DBProxy.getGameScreenById(gameId)
        .then(screendata => {
          this.$set(this, 'author', screendata.author)
          this.init(screendata.matrix);
        })
        .catch(error => {
          console.log("error", error);
        });
    },

    generateMaze(columns,rows) {
      const maze = [];
      const mazelength = columns*rows;
      for (let i = 0; i < mazelength; i++) {
        const cast =
          i < columns ||
          i > mazelength - columns - 1 ||
          i % columns == 0 ||
          (i - columns + 1) % columns == 0
            ? 2
            : 1;
        maze.push(cast);
      }
      return maze;
    },

    init(maze){
      this.$set(this, "matrix", maze);
    },

    /* updateTileType(matrix, index, type) {
      let newarr = [...matrix];
      newarr[index] = type;
      return newarr;
    }, */

    onTileClick(item, index) {
      const nextCast=item===1 ? 2 : 1;
      const newarr = updateElement(this.matrix, index, nextCast);
      this.$set(this, "matrix", newarr);
    },

    finish(n = ~~(this.matrix.length / 2)) {
      if (this.matrix[n] === 1) {
        let newarr = [...this.matrix];
        newarr[n] = 3;
        this.$set(this, "matrix", newarr);
        this.save({ matrix: newarr, author: this.author });
      } else {
        this.finish(n + 1);
      }
    },

    save(data) {
      DBProxy.saveGameScreen(data);
    }
  },

  computed:{
    gameId(){
      return this.$route.params.id || null;
    }
  },

  beforeDestroy() {
  }
};
</script>


<style lang="scss">
.designer {
  display: block;
  .game-designer {
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
  }
  
}
</style>
