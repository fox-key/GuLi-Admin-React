

/*
*   入口文件
* */

import React from 'react'
import ReactDom from 'react-dom'

import App from './App'

import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

const user = storageUtils.getUser()
if(user&&user._id){
    memoryUtils.user = user
}


console.log('gitHub Edit')



ReactDom.render(<App/>,document.getElementById('root'))
