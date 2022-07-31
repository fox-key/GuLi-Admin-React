import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'


import  './index.less'
import ProductHome from './home'
import ProductAddUpdate from './addUpdate'
import Detail from './detail'

export  default  function Product  (){
    return (
       <section>
           <Routes>
               <Route path='/' exact  element={<ProductHome/>}></Route>
               <Route path='/addupdate' element={<ProductAddUpdate/>}/>
               <Route path='/detail' element={<Detail/>}/>
               <Route path='/*' element={<Navigate to='/product'/>}/>
           </Routes>
       </section>
    )
}
