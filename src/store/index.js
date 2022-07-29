import Vue from 'vue'
import Vuex from 'vuex'

import aPlayer from './mudules/aPlayer'
import user from './mudules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    aPlayer,
    user
  }
})
