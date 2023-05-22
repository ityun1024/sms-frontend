import Vue from 'vue'
import Vuex from 'vuex'
import { RouteConfig } from 'vue-router'
import { mainMenu } from '@/router/menu'
import router from '@/router'
import Cookies from 'js-cookie'
import { formatMenus, getRouters, layzLoading } from '@/router/layzLoading'
import { menuList } from '@/api/menuList'
Vue.use(Vuex)

interface RootState {
  loading: boolean;
  windowSize: { width: number; height: number } | null;
  token: string | undefined;
  isCollapse: boolean;
  menuList: any[];
  mainMenu: Array<RouteConfig>;
  initRoute: null | any;
  systemInfo: {
    systemId: string;
    sysName: string;
    layzLoading: Function;
  } | null;
  VersionSwitch?: any;
  route?: any;
  // userInfo: any;
  userInfo: {} | any;
  toggleLogout: boolean;
}

export default new Vuex.Store<RootState>({
  state: {
    loading: false,
    windowSize: null,
    token: Cookies.get('st-creditech.com.session'),
    isCollapse: false,
    menuList: [],
    mainMenu: mainMenu,
    initRoute: sessionStorage.initRoute ? JSON.parse(sessionStorage.initRoute) : null,
    systemInfo: null,
    userInfo: {
      avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F13%2F20210613235426_7a793.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682512575&t=2997540c7217fd31c916c516945bbe61',
      userName: '郭赟湖'
    },
    toggleLogout: false
  },
  mutations: {
    updateMainMenu (state, mainMenu) {
      state.mainMenu = mainMenu
    },
    updateMenuList (state, menuList) {
      state.menuList = menuList
    },
    updateLoading (state, loading) {
      state.loading = loading
    },
    updateToken (state, token) {
      state.token = token
      if (!token) {
        Cookies.remove('sessionToken')
      }
    },
    updateIsCollapse (state, isCollapse) {
      state.isCollapse = isCollapse
    },
    updateSize (state, size) {
      if (size && size.width) {
        state.isCollapse = size.width < 768
      }
      size.windowSize = size
    },
    updateIntRoute (state, initRoute = null) {
      if (initRoute) sessionStorage.setItem('initRoute', JSON.stringify(initRoute))
      else sessionStorage.removeItem('initRoute')
      state.initRoute = initRoute
    },
    updateLogout (state, toggleLogout) {
      state.toggleLogout = toggleLogout
    },
    // updateLogout (state, logout) {
    //   state.logout = logout
    // }
  },
  actions: {
    menuListForMessage ({ commit, state: { mainMenu, initRoute } }) {
      return menuList().then((res: any) => {
        if (res && res.length) {
          const arr: any[] = formatMenus(res)
          commit('updateMenuList', arr)
          const routes = getRouters(arr, layzLoading)
          if (mainMenu[0].children) {
            mainMenu[0].children.push(...routes)
          }
          router.addRoutes(mainMenu)
          if (initRoute) {
            router.push(initRoute)
          } else {
            router.push('/')
          }
          commit('updateIntRoute')
        } else {
          throw new Error('没有权限访问')
        }
      })
    },
    async login ({ commit, dispatch }) {
      // const res = await api.login({
      //   ...params
      // })
      Cookies.set('sessionToken', 'abcdefghigklm')
      commit('updateToken', 'abcdefghigklm')
      await dispatch('menuListForMessage')
      // return res
    },
    logout ({ commit }) {
      commit('updateLogout')
    }
  },
  getters: {
    breadcrumbList({ menuList, route }) {
      const arr: any[] = []
      menuList.some(function isHas(obj: any) {
        if (obj.id === route.meta.id) {
          arr.unshift(obj)
          return true
        } else if (obj.children && obj.children.length && obj.children.some(isHas)) {
          arr.unshift(obj)
          return true
        } else {
          return false
        }
      })
      return arr
    }
  }
})
