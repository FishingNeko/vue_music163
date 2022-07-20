export default [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Name',
    component: () => import(/* WebpackChunkName: "home_index" */ '@/views/home/Home'),
    redirect: '/home/personalization',
    children: [
      {
        path: '/home/personalization',
        component: () => import(/* WebpackChunkName: "home_index" */ '@/views/personalization/Personalization')
      },
      {
        path: '/home/songMenu',
        component: () => import(/* WebpackChunkName: "home_songMenu" */ '@/views/songMenu/SongMenu')
      },
      {
        path: '/home/newSong',
        component: () => import(/* WebpackChunkName: "home_newMv" */ '@/views/newSong/NewSong')
      },
      {
        path: '/home/newMv',
        component: () => import(/* WebpackChunkName: "home_newMv" */ '@/views/newMv/NewMv')
      },
      {
        path: '/home/ranking',
        component: () => import(/* WebpackChunkName: "home_ranking" */ '@/views/ranking/Ranking')
      },
      {
        path: '/home/singer',
        component: () => import(/* WebpackChunkName: "home_singer" */ '@/views/singer/Singer')
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* WebpackChunkName: "login" */ '@/views/login/Login')
  }
]
