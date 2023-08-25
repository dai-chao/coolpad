import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { Button, Form, Input, Checkbox, Space, Row, Col, message, notification } from "antd"
import "./index.css"


function Login() {

    const [form] = Form.useForm()
    const [loginType, setLoginType] = useState<number>(2)
    const [time, setTime] = useState<number>(60)
    const [submitLoading, changeSubmitLoading] = useState<boolean>(false)

    const sendCode = () => {
        let timer: any = null
        if (timer) clearInterval(timer)
        let s = 60
        timer = setInterval(() => {
            s--
            setTime(s)
            if (s === 0) {
                setTime(60)
                clearInterval(timer)
            }
        }, 1000)
    }

    const navigate = useNavigate();
    // useEffect(() => {
    //     let token = localStorage.getItem('token')
    //     if (!token) {
    //         // console.log(token, 'token', navigate)
    //         // navigate({
    //         //     pathname: `/app/pages/login`
    //         // });
    //     }
    // }, [])

    const login = () => {
        localStorage.setItem('token', '12345678908765478909876789')
        setTimeout(() => {
            navigate({
                pathname: `/pages/`
            });
        }, 500)
    }


    const onFinish = (values: any) => {
        // changeSubmitLoading(true)
        console.log('Success:', values);
        // login()
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    const changeLoginType = () => {
        form.setFieldsValue({
            code: undefined
        })
        setLoginType(loginType === 1 ? 2 : 1)
    }

    return (
        <div className="login_wrap" style={{
            width: "100vw",
            height: "100vh",
            background: "#6F64F8",
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: "1202",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                width: "500px",
                height: "400px",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                overflow: "hidden"
            }}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <div style={{
                        width: "100%",
                        height: "100%",
                        paddingTop: "50px",
                    }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                            fontWeight: 700,
                            lineHeight: "26px",
                            color: " #565656",
                            opacity: 1,
                            letterSpacing: "5.46px",
                            marginBottom: "20px"
                        }}>
                            <img style={{
                                marginRight: "20px"
                            }} src="https://cdn1.jijyun.cn/p/cache/winDeal/images/logo-jjy.svg" alt="" />
                            登录集简云系统
                        </div>
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input placeholder="请输入用户名" />
                        </Form.Item>

                        {
                            loginType === 1 &&
                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[{ required: true, message: '请输入密码!' }]}
                            >
                                <Input.Password placeholder="请输入密码" />
                            </Form.Item>
                        }

                        {
                            loginType === 2 &&
                            <Form.Item label="验证码">
                                <Space>
                                    <Form.Item
                                        name="code"
                                        noStyle
                                        rules={[{ required: true, message: '请输入验证码' }]}
                                    >
                                        <Input style={{ width: 192 }} placeholder="请输入验证码" />
                                    </Form.Item>
                                    <div>
                                        <Button style={{
                                            width: "132px"
                                        }} type="primary" onClick={sendCode} disabled={time !== 60} >{
                                                time === 60 ? "获取验证码" : `${time}秒后重新获取`
                                            }</Button>
                                    </div>
                                </Space>
                            </Form.Item>
                        }

                        <Row style={{
                            paddingTop: "5px",
                            marginBottom: "20px"
                        }}>
                            <Col offset={5}>
                                <a style={{
                                    userSelect: "none"
                                }} onClick={changeLoginType}>{loginType === 1 ? "验证码登录" : "密码登录"}</a>
                            </Col>
                        </Row>
                        <Form.Item wrapperCol={{ offset: 7 }}>
                            <Space size={50}>
                                <Button style={{
                                    width: "80px"
                                }} type="default" htmlType="reset">
                                    重置
                                </Button>
                                <Button style={{
                                    width: "80px"
                                }} type="primary" htmlType="submit" loading={submitLoading} >
                                    登录
                                </Button>
                            </Space>
                        </Form.Item>
                    </div>
                </Form>
            </div >
        </div >
    )
}

export default Login