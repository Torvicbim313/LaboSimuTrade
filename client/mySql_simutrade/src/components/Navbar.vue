<template>
    <nav class="pb-8 flex flex-row justify-between items-center">
      <router-link to="/">
        <h1 class="text-indigo-600 text-6xl font-bold animate-pulse hover:animate-spin">Simutrade</h1>
      </router-link>

        <ul class="bg-slate-100/80 p-4 rounded-lg">
          <li class="pb-4">
            <RouterLink to="/table" class="text-emerald-500 font-bold text-2xl hover:text-indigo-600">Tabla</RouterLink>
          </li>
          <li class="pt-4">
            <RouterLink to="/chart" class="text-emerald-500 font-bold text-2xl hover:text-indigo-600">Gráfica</RouterLink>
          </li>
          <li class="pb-4">
            <RouterLink to="/tableAfternoons" class="text-emerald-500 font-bold text-2xl hover:text-indigo-600">Tabla tardes</RouterLink>
          </li>
          <li class="pt-4">
            <RouterLink to="/afternoons2_2" class="text-emerald-500 font-bold text-2xl hover:text-indigo-600">afternoons2_2</RouterLink>
          </li>
        </ul>
      </nav>
</template>
<script>
export default {
name: "Navbar"
}
</script>
