import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'listing' }
  },
  {
    path: '/listing',
    name: 'listing',
    component: () =>
      import(/* webpackChunkName: "listing" */ '../views/Listing.vue')
  },
  {
    path: '/listing/:id/detail',
    name: 'listing-id-detail',
    meta: {
      layout: 'blank'
    },
    component: () =>
      import(/* webpackChunkName: "detail" */ '../views/Detail.vue')
  },
  {
    path: '/saved-list',
    name: 'saved-list',
    component: () =>
      import(/* webpackChunkName: "saved-list" */ '../views/SavedList.vue')
  },
  {
    path: '/saved-list/create',
    name: 'saved-list-create',
    meta: {
      layout: 'blank'
    },
    component: () =>
      import(/* webpackChunkName: "saved-list" */ '../views/Create.vue')
  },
  {
    path: '/my-team',
    name: 'my-team',
    component: () =>
      import(/* webpackChunkName: "my-team" */ '../views/MyTeam.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
