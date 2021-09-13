<template>
  <section class="cns-main-menu">
    <a-menu mode="inline" theme="dark" :selectedKeys="[selectKey]">
      <a-menu-item
        v-for="item in menus"
        :key="item.key"
        @click="changeMenu(item)"
      >
        <router-link :to="{ path: item.path }">
          <a-icon v-if="item.icon" :type="item.icon" />
          <span>{{ item.title }}</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </section>
</template>
<script>
// import { defineComponent } from '@vue/composition-api';
import { defineComponent, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  props: {
    menus: { type: Array, default: () => [] },
  },
  setup(props) {
    const state = reactive({ selectKey: '' });
    const route = useRoute();
    watch(route, () => {
      _initMenus();
    });
    const _initMenus = function() {
      const currentMenu = _findCurrentMenu(props.menus, route.path);
      if (!currentMenu) return;
      const { key } = currentMenu;
      state.selectKey = key;
    };
    const _findCurrentMenu = function(menus, currentPath) {
      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        const { path } = menu;
        if (path === currentPath) return menu;

        const currentMenu = _findCurrentMenu(menu.children || [], currentPath);
        if (currentMenu) return currentMenu;
      }
      return null;
    };
    const changeMenu = function(item) {
      const { key } = item;
      state.selectKey = key;
    };
    return {
      ...state,
      changeMenu,
    };
  },
});
</script>

<style lang="less" scoped>
.cns-main-menu {
  width: 100%;
  height: 100%;
  background: #001529;
  .cns-menu {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    a {
      color: #fff;
      text-decoration: none;
    }
  }
  .cns-parent-title {
    font-size: 13px;
    color: rgba(233, 241, 255, 0.75);
  }
  .cns-child-title {
    font-size: 13px;
    color: #fff;
  }
  .cns-child-title:hover {
    color: #408fff;
  }
  /deep/ .cns-menu-sub {
    background: rgb(12, 28, 53);
  }
}
</style>
