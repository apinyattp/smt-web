<template>
  <div
    class="flex flex-col p-10 bg-gradient-to-r from-gray-400 to-dark-800 h-full relative"
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
            <router-link
              class="flex items-center space-x-4"
              :to="to"
              :target="label == 'Contact' ? '_blank' : ''"
            >
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
        },
        {
          icon: 'map',
          label: 'Contact',
          to: { name: 'contact' }
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
  &::before {
    content: '';
    @apply absolute w-3 h-3 rounded-full bg-gold-300;
    left: -5px;
  }
  &::after {
    content: '';
    @apply absolute rounded-full bg-gold-300;
    width: 2.125rem;
    height: 2.125rem;
    left: -16px;
    background: radial-gradient(
      43.97% 43.97% at 50% 51.18%,
      rgba(147, 128, 99, 0.0001) 0%,
      rgba(217, 204, 187, 0.58) 35.94%,
      rgba(147, 128, 99, 0.0001) 100%
    );
  }
}
</style>
