

import store from 'store'

const USER_KEY = 'user_key'

/*
*   包含n个操作localstorage工具函数的模块
* */

export default {
    saveUser(user){
        store.set(USER_KEY,user)
    },
    getUser(){
        return store.get(USER_KEY)||{}
    },
    removeUser(){
        store.remove(USER_KEY)
    }
}
