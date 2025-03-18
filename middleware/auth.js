export default defineNuxtRouteMiddleware((to, from) => {
  const { authToken } = useAuth();

  if (!authToken.value) {
    return navigateTo('/login'); // Redirect if not logged in
  }
});
