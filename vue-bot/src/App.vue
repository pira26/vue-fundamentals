<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li class="nav-item">
            <router-link :to="{name: 'Home'}"
                         excat
                         class="nav-link">
              <img src="./assets/build-a-bot-logo.png" alt="logo" class="logo">Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'Build'}"
                          exact
                          class="nav-link">Build a bot</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'Browse'}"
                          exact
                          class="nav-link">Browse</router-link>
          </li>
          <li class="nav-item cart">
            <router-link to="/cart"
                          exact
                          class="nav-link">Cart</router-link>
            <div v-show="cart.length" class="cart-items">{{ cart.length }}</div>
          </li>
        </ul>
      </nav>
    </header>
    <div class="container">
      <aside class="aside">
        <router-view name="sidebar"></router-view>
      </aside>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    cart() {
      return this.$store.state.robots.cart;
    },
  },
};
</script>

<style lang="scss">
body {
  background: linear-gradient(to bottom, #555, #999);
  background-attachment: fixed;
}
</style>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
header {
  background-color: #999;
  width: 1184px;
  margin: 0 auto;
  ul {
    padding: 3px;
    display: flex;
    .nav-item {
      display: inline-block;
      padding: 5px 10px;
      font-size: 22px;
      border-right: 1px solid #bbb;
      .nav-link {
        text-decoration: none;
        color: inherit;
        .logo {
          vertical-align: middle;
          height: 30px;
        }
      }
    }
  }
}
.nav-item.cart {
  position: relative;
  margin-left: auto;
  border-right: none;
  .cart-items {
    position: absolute;
    top: -5px;
    right: -9px;
    font-size: 18px;
    width: 20px;
    text-align: center;
    display: inline-block;
    border-radius: 100px;
    background-color: mediumseagreen;
    color: white;
  }
}
.container {
  display: flex;
  margin: 10px auto 0 auto;
  justify-content: center;
  .aside {
    width: 100px;
    min-height: 300px;
    background-color: #aaa;
    padding: 30px;
  }
  main {
    padding: 30px;
    background-color: white;
    width: 964px;
    min-height: 300px;
  }
}
.router-link-active {
  color: white;
}
</style>
