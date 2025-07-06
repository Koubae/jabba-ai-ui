
<script setup lang="ts">
import type {SessionConnection} from "~/common/interfaces";

interface Props {
  sessionConnection: SessionConnection
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

// Create a reactive copy of the sessionConnection
const sessionConnectionCopy = computed(() => {
  return { ...props.sessionConnection }
})

const closeChatSession = () => {
  emit('close')
}
</script>

<template>
  <div class="h-[calc(100vh-8rem)]">
    <ChatSession
        :session-connection="sessionConnectionCopy"
        @close="closeChatSession"
    />
  </div>
</template>