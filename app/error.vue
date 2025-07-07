<script setup>
const props = defineProps(['error'])

const handleError = async () => {
  await navigateTo('/')
}

const refresh = () => {
  window.location.reload()
}

const getErrorTitle = () => {
  const code = props.error?.statusCode || 404
  const titles = {
    404: "Page Not Found",
    500: "Server Error",
    403: "Access Forbidden",
    401: "Unauthorized",
    400: "Bad Request"
  }
  return titles[code] || "Something Went Wrong"
}

const getErrorMessage = () => {
  const code = props.error?.statusCode || 404
  const messages = {
    404: "The page you're looking for seems to have wandered off into the digital cosmos. Let's get you back on track!",
    500: "Our servers are having a moment. Don't worry, our team of digital wizards is on it!",
    403: "Looks like you've stumbled into a restricted area. Time to turn around!",
    401: "You'll need the right credentials to access this treasure.",
    400: "Something's not quite right with that request. Let's try again!"
  }
  return messages[code] || "An unexpected error occurred, but don't worry - we'll get through this together!"
}

const getErrorEmoji = () => {
  const code = props.error?.statusCode || 404
  const emojis = {
    404: "🔍",
    500: "🛠️",
    403: "🚫",
    401: "🔐",
    400: "❓"
  }
  return emojis[code] || "🌟"
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Background animated elements -->
    <div class="absolute inset-0 opacity-10 dark:opacity-20">
      <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 dark:bg-blue-400 rounded-full animate-bounce" style="animation-duration: 3s;"></div>
      <div class="absolute top-3/4 right-1/4 w-24 h-24 bg-indigo-200 dark:bg-indigo-400 rounded-full animate-bounce" style="animation-duration: 3s; animation-delay: 1s;"></div>
      <div class="absolute bottom-1/4 left-1/3 w-16 h-16 bg-purple-200 dark:bg-purple-400 rounded-full animate-bounce" style="animation-duration: 3s; animation-delay: 2s;"></div>
    </div>

    <!-- Main error content -->
    <div class="text-center z-10 max-w-md mx-auto">
      <!-- Error code -->
      <h1 class="text-8xl font-black text-gray-800 dark:text-white mb-6 animate-pulse">
        {{ error?.statusCode || '404' }}
      </h1>

      <!-- Error message card -->
      <UCard class="mb-8 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
        <template #header>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white text-center">
            {{ getErrorTitle() }}
          </h2>
        </template>

        <div class="text-center">
          <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            {{ getErrorMessage() }}
          </p>
        </div>
      </UCard>

      <!-- Action buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton
            @click="handleError"
            variant="outline"
            size="lg"
            class="transform hover:scale-105 transition-transform duration-200"
            icon="i-heroicons-home"
        >
          Go Home
        </UButton>

        <UButton
            @click="refresh"
            color="primary"
            size="lg"
            class="transform hover:scale-105 transition-transform duration-200"
            icon="i-heroicons-arrow-path"
        >
          Try Again
        </UButton>
      </div>

      <!-- Fun animation -->
      <div class="mt-8 text-6xl animate-bounce" style="animation-duration: 2s;">
        {{ getErrorEmoji() }}
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div class="absolute top-8 left-8 w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full opacity-60 animate-ping"></div>
      <div class="absolute top-16 right-16 w-3 h-3 bg-indigo-400 dark:bg-indigo-300 rounded-full opacity-40 animate-ping" style="animation-delay: 0.5s;"></div>
      <div class="absolute bottom-16 left-16 w-2 h-2 bg-purple-400 dark:bg-purple-300 rounded-full opacity-60 animate-ping" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-8 right-8 w-1 h-1 bg-pink-400 dark:bg-pink-300 rounded-full opacity-80 animate-ping" style="animation-delay: 1.5s;"></div>
    </div>
  </div>
</template>