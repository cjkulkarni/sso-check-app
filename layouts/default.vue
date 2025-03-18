<script setup>
import { useAuth } from '~/composables/useAuth';
const { authToken, authUser } = useAuth();

const { checkSSO } = useAuth();

onMounted(async () => {
  await checkSSO();
});

</script>

<template>
    <Header />
    <slot />
    <Footer /> 
</template>