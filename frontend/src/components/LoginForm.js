import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    fetch("http://localhost:3001/api/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data, "userRegister");
        //console.log("Type of Data:", typeof data);
        if (data && data.status === "Login Successfull!!") {
          alert(data.status);
          window.localStorage.setItem("token", data.data.token);
          window.localStorage.setItem("loggedIn", true);
          window.localStorage.setItem("userid", data.data.userId);
          
          window.location.href = "/feed";
        } else {
          alert(data.error);
        }
      });
  };

  const rowstyle = {
    content: "",
    display: "table",
    clear: "both",
  };

  const colstyle = {
    float: "left",
    width: "50%",
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="contact_us@tales.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <br />
      <section style={rowstyle}>
        <aside style={colstyle}>
          <Button type="submit" className="primary">
            <a style={{ color: "white" }}>Login</a>
          </Button>
        </aside>
        <aside style={colstyle}>
          <Button type="submit" className="primary" style={{width: "102px"}}>
            <a style={{ color: "white", marginRight: "20px", textDecoration:"none" }} href="/sign-up">
              Sign Up
            </a>
          </Button>
        </aside>
      </section>
    </Form>
  );
};

export default LoginForm;