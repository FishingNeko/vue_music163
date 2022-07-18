export default [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Name',
    component: () =>
      import(/* WebpackChunkName: "home_index" */ '@/views/home/Home'),
    redirect: '/home/personalization',
    children: [{
      path: '/home/personalization',
      component: () => import(/* WebpackChunkName: "home_index" */ '@/views/personalization/Personalization')
    }]
  },
  {
    path: '/login',
    component: () => import(/* WebpackChunkName: "login" */ '@/views/login/Login')
  }
]
