<script setup lang="ts">
import type {SessionConnection} from "~/common/interfaces";

interface Props {
  sessionConnections: SessionConnection[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  removeConnection: [connectionId: string]
}>()

const closeChatSession = () => {
  emit('close')
}

const removeConnection = (connectionId: string) => {
  emit('removeConnection', connectionId)
}

const gridClass = computed(() => {
  const count = props.sessionConnections.length
  if (count === 1) return 'grid-cols-1'
  if (count === 2) return 'grid-cols-1 xl:grid-cols-2'
  if (count === 3) return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
  if (count === 4) return 'grid-cols-1 lg:grid-cols-2'
  return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
})

const sessionHeight = computed(() => {
  const count = props.sessionConnections.length
  if (count === 1) return 'h-[calc(100vh-8rem)]'
  if (count === 2) return 'h-[calc(50vh-4rem)]'
  if (count <= 4) return 'h-[calc(50vh-4rem)]'
  return 'h-[calc(33vh-3rem)]'
})
</script>

<template>
  <div class="h-[calc(100vh-8rem)]">
    <!-- Single session - full height -->
    <div v-if="sessionConnections.length === 1" class="h-full">
      <div class="relative h-full">
        <div class="absolute top-2 right-2 z-10">
        </div>
        <ChatSession
            :session-connection="sessionConnections[0]"
            @close="closeChatSession"
        />
      </div>
    </div>

    <!-- Multiple sessions - grid layout -->
    <div v-else class="h-full overflow-auto">
      <div :class="['grid gap-4 p-4', gridClass]">
        <div
            v-for="connection in sessionConnections"
            :key="connection.id"
            :class="['relative border border-white/20 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm', sessionHeight]"
        >
          <!-- Session header with member info and remove button -->
          <div class="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm px-4 py-2 flex justify-between items-center">
            <div class="text-white text-sm font-medium">
              {{ connection.owner.member_id }}
            </div>

          </div>

          <div class="h-full pt-10">
            <ChatSession
                :session-connection="connection"
                @close="() => removeConnection(connection.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>