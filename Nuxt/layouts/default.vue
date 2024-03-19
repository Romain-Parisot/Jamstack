<script></script>

<template>
  <main role="main">
    <header>
      <nav>
        <nuxt-link to="/">Market</nuxt-link>
        <nuxt-link to="/createstock">Create Stock</nuxt-link>
        <nuxt-link to="/create-many">Create Many</nuxt-link>
      </nav>
    </header>
    <slot />
    <footer>Footer</footer>
  </main>
</template>

<style>
header {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: aqua;
  padding: 10px;
}
footer {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgb(34, 255, 126);
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
}
nav a {
  text-decoration: none;
  color: black;
  padding: 10px;
  border-radius: 5px;
}
nav a:hover {
  color: white;
}
</style>
