<template>
  <div class="container">
    <section class="header">
      <div class="content has-text-centered">
        <h3 class="subtitle">Project-a</h3>
      </div>
    </section>
    <section class="main">
      <div class="columns is-mobile">
        <div class="column">
          <section class="sidebar-layout">
            <b-sidebar position="static" type="is-light" open>
              <div class="p-1">
                <b-menu class="is-custom-mobile">
                  <b-menu-list label="Menu">
                    <b-menu-item label="Content">
                      <b-menu-item
                        v-for="(menu, index) in contentMenu"
                        :key="index"
                        :label="menu.name"
                        @click="move(menu.name)"
                      ></b-menu-item>
                    </b-menu-item>
                    <b-menu-item label="Form">
                      <b-menu-item
                        v-for="(menu, index) in formMenu"
                        :key="index"
                        :label="menu.name"
                        @click="move(menu.name)"
                      ></b-menu-item>
                    </b-menu-item>
                    <b-menu-item label="Static">
                      <b-menu-item label="Media" @click="move('media')"></b-menu-item>
                    </b-menu-item>
                  </b-menu-list>
                  <b-menu-list label="Actions">
                    <b-menu-item icon="logout" label="Logout"></b-menu-item>
                  </b-menu-list>
                </b-menu>
              </div>
            </b-sidebar>
          </section>
        </div>
        <div class="column is-three-quarters">
          <nuxt />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import schemas from "../generated/generated_schemas";

export default {
  name: "MyLayout",
  data() {
    return {
      menus: schemas,
    };
  },
  methods: {
    move(path) {
      const route = `/section/${path.toLowerCase()}`;
      this.$router.push(route);
    },
  },
  computed: {
    contentMenu: function () {
      return this.menus.filter((i) => i.type.toLowerCase() === "content");
    },
    formMenu: function () {
      return this.menus.filter((i) => i.type.toLowerCase() === "form");
    },
  },
};
</script>

<style scoped>
.header {
  margin-top: 2%;
  margin-bottom: 4%;
}
</style>