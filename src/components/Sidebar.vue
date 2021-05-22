<template>
  <div
    class="flex flex-col p-10 bg-gradient-to-r from-gray-400 to-dark-800 h-full"
  >
    <div class="space-y-14">
      <div class="flex-shrink-0">
        <img
          class="m-auto"
          src="/img/sherman-tree.svg"
          alt="Sherman Tree Logos"
        />
      </div>
      <div class="text-gold-500 font-medium">
        <ul class="space-y-10">
          <li v-for="{ icon, label, to } in sidebarMenus" :key="icon">
            <router-link class="flex items-center space-x-4" :to="to">
              <vue-feather size="22" :type="icon" />
              <span>{{ label }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarMenus: [
        {
          icon: 'list',
          label: 'Listing',
          to: { name: 'listing' }
        },
        {
          icon: 'inbox',
          label: 'My Listing',
          to: { name: 'saved-list' }
        },
        {
          icon: 'users',
          label: 'My Team',
          to: { name: 'my-team' }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.router-link-active {
  @apply text-gold-300;
  transition: 0.2s all;
}
</style>
