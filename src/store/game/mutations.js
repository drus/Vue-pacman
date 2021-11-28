import Vue from 'vue';

import {SAVE_GAME_STATE} from './types';

export default {
    [SAVE_GAME_STATE](state, payload){
        Vue.set(state, 'currentGame', payload);
        // Lo mismo que state.currentGame=payload;
    }

};