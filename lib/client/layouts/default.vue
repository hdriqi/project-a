<template>
  <div class="container">
    <div v-if="isLoading" class="w-full h-screen flex items-center">
      <div class="m-auto max-w-md w-full">
        <h3 class="text-4xl font-bold text-center">Loading...</h3>
      </div>
    </div>
    <div v-else>
      <div v-if="!isLoggedIn" class="w-full h-screen flex items-center">
        <div class="m-auto max-w-md w-full">
          <h3 class="text-4xl font-bold text-center">Electrum Login</h3>
          <b-field class="mt-8" label="Password">
            <b-input type="password" v-model="password" password-reveal></b-input>
          </b-field>
          <b-button class="mt-2 w-full" @click="login">Login</b-button>
        </div>
      </div>
      <div v-else>
        <section class="header">
          <div class="content has-text-centered">
            <h3 class="subtitle">Electrum Dashboard</h3>
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
                            @click="_ => {
                          if (!menu.child) {
                            if(menu.isMultiple){
                              move(menu.name)
                            }
                            else{
                              findRoute(menu.name)
                            }
                          }
                        }"
                          >
                            <b-menu-item
                              v-for="(menuChild, index) in menu.child"
                              :key="index"
                              :label="menuChild.name"
                              @click="_ => {
                                if(menuChild.isMultiple){
                                  move(menuChild.name)
                                }
                                else{
                                  findRoute(menuChild.name)
                                }
                              }"
                            ></b-menu-item>
                          </b-menu-item>
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
    </div>
  </div>
</template>

<script>
import schemas from "../generated/generated_schemas";
import axios from "axios";

export default {
  name: "MyLayout",
  data() {
    return {
      menus: schemas,
      isLoading: true,
      isLoggedIn: false,
      password: "",
    };
  },
  methods: {
    async findRoute(menuName) {
      const url = `http://localhost:8000/api/collections/${menuName}`;
      try {
        const { data } = await axios.get(url);
        if (data.data.length) {
          const id = data.data[0]._id;
          this.$router.push(`/section/${menuName.toLowerCase()}/edit/${id}`);
        } else {
          this.$router.push(`/section/${menuName.toLowerCase()}/add`);
        }
      } catch (error) {
        throw error;
      }
    },
    async move(path) {
      console.log("move path..", path);
      const route = `/section/${path.toLowerCase()}`;
      this.$router.push(route);
    },
    async login() {
      try {
        await axios.post(`/api/login`, {
          password: this.password,
        });
        window.localStorage.setItem("token", this.password);
        this.isLoggedIn = true;
      } catch (err) {
        this.isLoggedIn = false;
        this.$buefy.notification.open({
          duration: 5000,
          message: `Invalid Password`,
          position: "is-top-right",
          type: "is-danger",
          hasIcon: true,
        });
      }
    },
  },
  computed: {
    contentMenu: function () {
      const newMenus = [];
      this.menus.forEach((menu) => {
        if (menu.type.toLowerCase() === "content" && !menu.parent) {
          newMenus.push(menu);
        } else if (menu.parent) {
          const idx = newMenus.findIndex(
            (newMenu) => newMenu.name === menu.parent
          );
          if (idx > -1) {
            newMenus[idx].child.push(menu);
          } else {
            newMenus.push({
              name: menu.parent,
              child: [menu],
            });
          }
        }
      });
      console.log(newMenus);
      return newMenus;
    },
    formMenu: function () {
      return this.menus.filter((i) => i.type.toLowerCase() === "form");
    },
  },
  async mounted() {
    const token = window.localStorage.getItem("token");
    if (token) {
      try {
        await axios.post(`/api/login`, {
          password: token,
        });
        this.isLoggedIn = true;
      } catch (err) {
        this.isLoggedIn = false;
      }
    }
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  },
};
</script>

<style scoped>
.header {
  margin-top: 2%;
  margin-bottom: 4%;
}
</style>