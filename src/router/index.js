import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'listing' }
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'blank'
    },
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    meta: {
      layout: 'blank'
    },
    component: () =>
      import(/* webpackChunkName: "contact" */ '../views/Contact.vue')
  },
  {
    path: '/listing',
    name: 'listing',
    component: () =>
      import(/* webpackChunkName: "listing" */ '../views/Listing/Index.vue')
  },
  {
    path: '/listing/create',
    name: 'listing-create',
    meta: {
      layout: 'blank'
    },
    component: () =>
      import(
        /* webpackChunkName: "listing-create" */ '../views/Listing/CreateEdit.vue'
      )
  },
  {
    path: '/listing/:id/edit',
    name: 'listing-edit',
    meta: {
      layout: 'blank'
    },
    props: {
      isEdit: true
    },
    component: () =>
      import(
        /* webpackChunkName: "listing-create" */ '../views/Listing/CreateEdit.vue'
      )
  },
  {
    path: '/listing/:id/detail',
    name: 'listing-detail',
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

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  if(to.path == '/login' && loggedIn) {
    return next('/listing')
  }
  
  next()
})

export default router
