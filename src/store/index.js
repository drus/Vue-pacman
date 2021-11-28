import Vue from 'vue'
import Vuex from 'vuex'
import gameMutations from './game/mutations';

Vue.use(Vuex)



export default new Vuex.Store({
  modules:{
    game:{
      //namespaced:true,
      state: {},
      mutations: gameMutations
    },
    other:{
      state: {

      },
      mutations: {

      },
      actions: {

      }
    }
  }
})

