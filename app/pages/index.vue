<script setup lang="ts">
import {redirectToHomePage, redirectToLoginPage} from "~/common/redirects";

const { isAuthenticated,  } = useAuth()

onMounted(() => {
  if (isAuthenticated.value) {
    redirectToHomePage()
  } else {
    redirectToLoginPage()
  }
})
</script>
