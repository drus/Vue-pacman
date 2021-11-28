<template>
  <div class="game-designer">
    <div
      v-on:click="$emit('click', item, index)"
      v-bind:style="cssVars"
      v-bind:class="[
                'game-designer__tile',
                {
                    'game-designer__tile--disc':isDisc(item),
                    'game-designer__tile--pacman':isPacman(item),
                    'game-designer__tile--wall':isWall(item)
                    }
            ]"
      v-for="(item, index) in matrix"
      v-bind:key="index"
    ></div>
  </div>
</template>

<script>
import Settings from "@/settings";

export default {
  name: "game-designer",
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
.game-designer {
  background-color: black;

  //height: 400px;
  display: flex;
  flex-flow: row wrap;
  * {
    box-sizing: border-box;
  }
  &__tile {
    display: inline-block;
    width: var(--tilesize);
    color: transparent;
    position: relative;

    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }
    &:after {
      content: "";
      position: absolute;
      background-color: rgba(0, 0, 0, 0.479);
    }

    &--disc {
      &:after {
        width: 10%;
        height: 10%;
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
}
</style>
