import React from 'react'
import './Login.css'
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()
  const onFinish = (values) => {
   axios({
    url:'https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin',
    method: 'POST',
    data:values,
   })
   .then((res)=>{
    console.log(res,"ress")
    
    if(res.data.success=== true){
      localStorage.setItem("access_token", res.data.data.tokens.accessToken.token)
      message.success("salom")
      navigate('home')
    }
   })
   .catch((err)=>{
    console.log(err,"errorr")
    message.error("Nimadir Xato")
   })
  };

  //Login
  return (
    <div className='box'>
      <Form
    name="basic"
    onFinish={onFinish}
    autoComplete="off"
    layout='vertical'
  >
    <Form.Item
      label="Phone"
      name="phone_number"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}
