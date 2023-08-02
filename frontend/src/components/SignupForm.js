import React, { Component } from "react";
import { Navbar } from 'react-bootstrap';


import Footer from "./footer";

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      role: "",
      mobile: "",
      location: "",
      pronouns: "",
      gender: "",
      bio: "",
      interests: "",

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { fname, lname, email, password, role, mobile, location, pronouns, gender, bio, interests } = this.state;
    console.log(fname, lname, email, password, role, mobile, location, pronouns, gender, bio, interests);

    fetch("http://localhost:3001/api/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        email,
        lname,
        password,
        role,
        mobile,
        location,
        pronouns,
        gender,
        bio,
        interests,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "OK") {
          alert("User successfully created. You may login using the registered email address and password");
          window.location.href = "/"
        }
        else {
          alert(data.error);
        }
      });

  }

  render() {
    const rowStyle = {
      display: "flex"
    };
    const colStyle = {
      flex: "50%",
      padding: "10px",
    };
    return (
      <>

        <Navbar bg="primary" variant="dark" className="justify-content-between px-4 py-2">
          <Navbar.Brand href="/">Tales</Navbar.Brand></Navbar>
        <section className="d-flex justify-content-center" style={{ marginTop: '50px' }}>
          <form onSubmit={this.handleSubmit} className="border border-primary rounded-4 border-2 mb-3" style={{ padding: "20px" }}>

          <h3>Sign Up</h3>

            <div style={rowStyle}>
              <div style={colStyle}>

                <aside className="mb-3">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    onChange={e => this.setState({ fname: e.target.value })}
                  />
                </aside>

                <aside className="mb-3">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    onChange={e => this.setState({ lname: e.target.value })}
                  />
                </aside>

                <aside className="mb-3">
                  <label>Mobile <i>&#40;Optional&#41;</i></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="123-456-7890"
                    onChange={e => this.setState({ mobile: e.target.value })}
                  />
                </aside>

                <aside className="mb-3">
                  <label>Location <i>&#40;Optional&#41;</i></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Vancouver, BC"
                    onChange={e => this.setState({ location: e.target.value })}
                  />
                </aside>

                <aside className="mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </aside>

                <aside className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </aside>

                
              </div>

              <div style={colStyle}>

                <aside className="mb-3">
                  <label>Gender <i>&#40;Optional&#41;</i></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Gender"
                    onChange={e => this.setState({ gender: e.target.value })}
                  />
                </aside>

                <aside className="mb-3">
                  <label>Pronouns <i>&#40;Optional&#41;</i></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pronouns"
                    onChange={e => this.setState({ pronouns: e.target.value })}
                  />
                </aside>

                <aside className="mb-3">
                  <label>Bio <i>&#40;Optional&#41;</i></label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Bio"
                    onChange={e => this.setState({ bio: e.target.value })}
                  />
                </aside>

                <aside className="mb-3">
                  <label>Interests <i>&#40;Optional&#41;</i></label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Interests"
                    onChange={e => this.setState({ interests: e.target.value })}
                  />
                </aside>

              </div>
            </div>
            <aside className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    <a style={{ color: "white" }}>Sign Up</a>
                  </button>
                </aside>
                <p className="forgot-password text-right">
                  Already registered <a href="/">sign in?</a>
                </p>
          </form>
        </section>
        <br />
        <br />
        <Footer />
      </>
    );
  }
}
