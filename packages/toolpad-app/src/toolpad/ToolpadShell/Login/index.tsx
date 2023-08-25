import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { Button, Form, Input, Checkbox, Space, Row, Col } from "antd"
import "./index.css"
import { display } from "@mui/system";

function Login() {

    const [loginType, setLoginType] = useState(1)

    const navigate = useNavigate();
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (!token) {
            console.log(token, 'token', navigate)
            // navigate({
            //     pathname: `/app/pages/login`
            // });
        }
    }, [])

    const login = () => {
        localStorage.setItem('token', '12345678908765478909876789')
        setTimeout(() => {
            navigate({
                pathname: `/pages/`
            });
        }, 500)
    }


    const onFinish = (values: any) => {
        console.log('Success:', values);
        login()
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    const changeLoginType = () => {
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
            zIndex: "999999999",
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
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="请输入用户名" />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="请输入密码" />
                        </Form.Item>

                        <Row style={{
                            marginBottom: "20px"
                        }}>
                            <Col offset={5}>
                                <a style={{
                                    userSelect: "none"
                                }} onClick={changeLoginType}>{loginType === 1 ? "验证码登录" : "密码登录"}</a>
                            </Col>
                        </Row>


                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Space size={50}>
                                <Button type="default" htmlType="reset">
                                    重置
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    登录
                                </Button>
                            </Space>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login