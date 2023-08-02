
import React, { useState } from "react";
import Footer from "./footer";
import { Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";

function CreatePost() {
  const [title, setStoryTitle] = useState("");
  const [story, setStory] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userid = window.localStorage.getItem("userid");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Story:", story);
    if (title.trim() === "" || story.trim() === "") {
      alert("Please fill in all the fields.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("Creating your post, please wait... it will take few seconds");

    // Reset the form fields
    setStoryTitle("");
    setStory("");

    
    fetch("http://localhost:3001/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        story,
        userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setStatusMessage("Post created successfully! go to feed or your profile");
        //console.log(data.message); // You can modify this to update the UI with the message
      })
      .catch((error) => {
        setIsLoading(false);
        setStatusMessage("Error creating post. Please try again later.");
        console.error("Error:", error);
      });
    
  };

  const handleCancel = () => {
    window.location.href = "/feed"; // Navigate to the feed page when Cancel is clicked
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <div className="justify-content-between px-4 py-2">
            <Navbar.Brand href="/feed">Tales</Navbar.Brand>
          </div>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a style={{textDecoration:"none"}} href="/profile"><FontAwesomeIcon icon={faUser} />&nbsp;{userid}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <section
        className="container border border-primary rounded-3 border-2 p-3"
        style={{ marginTop: "20px", marginBottom: "90px" }}
      >
        <form onSubmit={handleSubmit}>
          {/* Show status message */}
          {isLoading && <div className="alert alert-info">{statusMessage}</div>}
          {!isLoading && statusMessage && (
            <div className="alert alert-success">
              {statusMessage}
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-link"
                style={{ marginLeft: "10px" }}
              >
                Go to Feed
              </button>
            </div>
          )}

          <aside className="form-group mb-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter story title"
              value={title}
              onChange={(e) => setStoryTitle(e.target.value)}
            />
          </aside>
          <aside className="form-group">
            <label htmlFor="story">Story</label>
            <textarea
              className="form-control"
              id="story"
              rows="7"
              placeholder="Something amazing...."
              value={story}
              onChange={(e) => setStory(e.target.value)}
            ></textarea>
          </aside>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "20px" }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-primary"
            style={{ marginTop: "20px", marginLeft: "10px" }}
          >
            Cancel
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default CreatePost;
