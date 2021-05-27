<template>
  <transition appear name="fade">
    <div
      v-if="isLoading"
      class="w-screen h-screen fixed flex top-0 left-0 bg-gray-700 bg-opacity-50 z-50 items-center justify-center"
    >
      <div class="square-spinner">
        <div class="spinner-inner"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: [String, Boolean],
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.square-spinner,
.square-spinner * {
  box-sizing: border-box;
}

.square-spinner {
  height: 80px;
  width: 80px;
  position: relative;
  border-radius: 4px;
  border: 4px solid #b6a68f;
  animation: square-spinner-animation 4s infinite ease;
}

.square-spinner .spinner-inner {
  vertical-align: top;
  display: inline-block;
  background-color: #b6a68f;
  width: 100%;
  opacity: 1;
  animation: square-spinner-inner-animation 4s infinite ease-in;
}

@keyframes square-spinner-animation {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes square-spinner-inner-animation {
  0% {
    height: 0%;
  }

  25% {
    height: 0%;
  }

  50% {
    height: 100%;
  }

  75% {
    height: 100%;
  }

  100% {
    height: 0%;
  }
}
</style>
