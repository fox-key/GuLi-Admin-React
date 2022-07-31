// import React, {createRef} from 'react'
//
// import PubSub from 'pubsub-js'
//
// import PropsTypes from 'prop-types'
// import {Button, Checkbox, Form, Select, Input} from 'antd'
//
// const {Option} = Select;
// const Item = Form.Item;
//
// function AddForm(props) {
//
//
//
//     const onFinish = (values)=>{
//         console.log('publish',values)
//         PubSub.publish('sendForm',formRef)
//     }
//
//     const onFinishFailed = (errorInfo) => {
//         console.log('Failed:', errorInfo);
//     };
//
//
//
//     const {categorys, parentId, getAddFormValues} = props
//     console.log(categorys, parentId)
//
//
//     return (
// <></>
//     )
// }
//
// AddForm.propTypes = {
//     categorys: PropsTypes.array.isRequired,
//     parentId: PropsTypes.string.isRequired,
//     // setForm: PropsTypes.func.isRequired,
// }
//
// export default AddForm
