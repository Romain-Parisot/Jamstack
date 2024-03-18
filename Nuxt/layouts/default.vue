<script></script>

<template>
  <main role="main">
    <header>
      <nav>Header</nav>
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
}
footer {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgb(34, 255, 126);
}
</style>
