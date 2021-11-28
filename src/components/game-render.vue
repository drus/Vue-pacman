<template>
  <div class="game-view">
    <div
      v-bind:style="cssVars"
      v-bind:class="[
                'game-view__tile',
                {
                    'game-view__tile--pacman':isPacman(item),
                    'game-view__tile--disc':isDisc(item),
                    'game-view__tile--blank':isBlank(item),
                    'game-view__tile--wall':isWall(item)
                    }
            ]"
      v-for="(item, index) in matrix"
      v-bind:key="index"
    >
      <!-- {{item}} -->
    </div>
  </div>
</template>

<script>
import Settings from "@/settings";

export default {
  name: "game-render",
  computed: {
    cssVars() {
      return {
        "--tilesize": 100 / Settings.MATRIX_COLUMNS + "%"
      };
    }
  },
  props: {
    matrix: {
      type: Array
    }
  },
  methods: {
    isPacman(id) {
      return id === Settings.TILE_TYPES.PACMAN;
    },
    isBlank(id) {
      return id === Settings.TILE_TYPES.BLANK;
    },
    isDisc(id) {
      return id === Settings.TILE_TYPES.DISC;
    },
    isWall(id) {
      return id === Settings.TILE_TYPES.WALL;
    }
  }
};
</script>

<style lang="scss">
.game-view {
  background-color: black;

  //height: 400px;
  display: flex;
  flex-flow: row wrap;
  * {
    box-sizing: border-box;
  }
  &__tile {
    //$tilesize:100% / 11;
    display: inline-block;
    width: var(--tilesize);
    color: transparent;
    //background-color: red;
    position: relative;

    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }
    &:after {
      content: "";
      position: absolute;
      //z-index: -1;
      //left: 0;top: 0;bottom: 0;right: 0;
      background-color: rgba(0, 0, 0, 0.479);
    }

    &--disc {
      &:after {
        width: 10%;
        height: 10%;
        //width: var(--tilesize) / 1.05;
        //padding-top: var(--tilesize);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: orange;
        border-radius: 50%;
        overflow: hidden;
      }
    }

    &--pacman {
      &:after {
        width: 70%;
        height: 70%;
        //padding-top: var(--tilesize);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: orange;
        border-radius: 50%;
        overflow: hidden;
      }
    }

    &--wall {
      &:after {
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: dodgerblue;
      }
    }
  }
  /* 
    &__tile{
        $tilesize:100% / 11;
        display: inline-block;
        width: $tilesize;
        color:transparent;
        &:before{
            content:'';
            display: block;
            padding-top: 100%;
        }

        &--disc{
            $size:$tilesize/10;
            width: $size;
            margin: ($tilesize - $size) / 2;
            background-color: orange;
            border-radius: 50%;
            overflow: hidden;
        }
        
        &--blank{
            background-color: black;
        }
        &--pacman{
            $size:$tilesize/2;
            width: $size;
            margin: ($tilesize - $size) / 2;
            background-color: yellow;
            border-radius: 50%;
            overflow: hidden;
        }

        &--wall{
            background-color:dodgerblue;
        }

    }
     */
}
</style>
