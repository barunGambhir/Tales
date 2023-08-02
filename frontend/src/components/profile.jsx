import { React, Component, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer";
import CanvasAnimation from "./CanvasAnimation";


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: "",
      email: window.localStorage.getItem("userid"),
      posts: [],
    };
  }
  componentDidMount() {
    fetch("http://localhost:3001/api/profile", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token")
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "profile");
        this.setState({ profile: data.data })
        if (data.data === "token expired") {
          alert("Session expired. Please log in again");
          window.localStorage.clear();
          window.localStorage.href = "/";
        }
      });

    fetch("http://localhost:3001/user-posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Check the received data in the console
        if (data.error) {
          console.error(data.error);
        } else {
          this.setState({ posts: data });
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });

  }

  logOut = () => {
    window.localStorage.clear();
    window.localStorage.href = "/";
  }

  render() {
    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Container>
            <div className="justify-content-between px-4 py-2">
              <Navbar.Brand href="/feed">Tales</Navbar.Brand>
            </div>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <a style={{ textDecoration: "none" }} onClick={this.logOut} href="/">Log out</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <section style={{ backgroundColor: '#eee' }}>
          <MDBContainer className="py-5">
            <div>
              <p><FontAwesomeIcon icon={faAnglesLeft} /><a style={{ color: "black", textDecoration: "none" }} href="/feed">Back to Feed</a></p>
            </div>

            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: '150px' }}
                      fluid />

                  </MDBCardBody>
                </MDBCard>


                <MDBCard className="mb-4">
                  <MDBCardBody>

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{this.state.profile.fname} {this.state.profile.lname}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    {/* <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Role</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">Admin</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr /> */}

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{this.state.profile.email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Mobile</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{this.state.profile.mobile}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Location</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{this.state.profile.location}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Gender</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{this.state.profile.gender}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Pronouns</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{this.state.profile.pronouns}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Bio</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{this.state.profile.bio}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Interests</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{this.state.profile.interests}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText><a style={{ textDecoration: "none", color: "black" }} href="/profile/edit"><FontAwesomeIcon icon={faEdit} />Edit</a></MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="8">
              <MDBCard style={{backgroundColor:"eee"}} className="mb-4">
                  <MDBCardBody>
                    <h1><i>My Posts</i></h1>
                  </MDBCardBody>
                </MDBCard>
                {/* Map through the posts and render each post */}
                {this.state.posts.map((post) => (
                  <MDBCard className="mb-4" key={post.post_id}>
                    <MDBCardBody>
                      <h1>{post.title}</h1>
                      <div
                        style={{
                          position: "absolute",
                          top: 50,
                          left: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "5px",
                        }}
                      >
                      </div>
                      <CanvasAnimation
                        binaryFiles={post.generatedDataForVideo.map(
                          (data) => data.binaryFile
                        )}
                        // Assuming the audio binary data is in the 'binaryFiles' field
                        imageFiles={post.images.map((image) => image.image_url)}
                      />
                    </MDBCardBody>
                  </MDBCard>
                ))}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
        <Footer />

      </>
    )
  }
}
























