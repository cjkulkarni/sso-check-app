export default defineNuxtRouteMiddleware((to, from) => {
  const { authToken } = useAuth();
  console.log(authToken);
  if (!authToken.value) {
    return  navigateTo('http://localhost/crmlabs/wp-admin', {
  external: true
}) // Redirect if not logged in
  }
});
