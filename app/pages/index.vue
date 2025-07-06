<script setup lang="ts">
import {redirectToHomePage, redirectToWelcomePage} from "~/common/redirects";

const { isAuthenticated,  } = useAuth()

onMounted(() => {
  if (isAuthenticated.value) {
    redirectToHomePage()
  } else {
    redirectToWelcomePage()
  }
})
</script>
