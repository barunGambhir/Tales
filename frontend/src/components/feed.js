import React, { useEffect, useState } from "react";
import Footer from "./footer";
import axios from "axios";
import { Container, Navbar, Card } from "react-bootstrap";
import CanvasAnimation from "./CanvasAnimation";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

function Feed() {
  const user_id = window.localStorage.getItem("userid");
  console.log(user_id);
  const [randomPosts, setRandomPosts] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: "hkgjh" }),
    };

    fetch("http://localhost:3001/random-posts", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setRandomPosts(data);

        console.log("randomPosts", data);

        /// print the likes
        const initialLikesState = data.reduce((acc, post) => {
          acc[post.post_id] = post.likes;
          return acc;
        }, {});
        setLikes(initialLikesState);

        console.log("initialLikesState", initialLikesState);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleLike = (post_id, currentLikes) => {
    const updatedLikes = currentLikes + 1;
    setLikes((prevLikes) => {
      return {
        ...prevLikes,
        [post_id]: updatedLikes,
      };
    });

    // Send the request to the server
    axios
      .post("http://localhost:3001/updateLikes", {
        post_id,
        likes: updatedLikes,
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleDelete = (post_id) => {
    // Send the request to the server
    axios
      .post("http://localhost:3001/deletePost", {
        post_id,
        user_id
      })
      .then((response) => {
        const data = response.data; // Get the response data
  
        if (data.success) {
          window.location.reload();
          // Post deleted successfully, show success message
          alert("Post deleted successfully. You can check it in the feed or profile page.");
          // You may also want to navigate to the feed or profile page here

        } else {
          // Failed to delete post, show error message
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to delete post.");
      });
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
              <a style={{ textDecoration: "none" }} href="/profile"><FontAwesomeIcon icon={faUser} />&nbsp;{user_id}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar><br />

      <div className="container mt-4 text-center">
        <button type="button" className="btn btn-primary btn-lg btn-block mb-3">
          <a href="/create-post" style={{ color: "white", textDecoration: "none" }}>
            Create a new post
          </a>
        </button>
        {/* <p>User id of the user is {user_id} </p> */}

        {randomPosts.map((post) => (
          <Card
            key={post.post_id}
            className="mb-4"
            style={{
              backgroundColor: "#e1e8ed",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <Card.Body>
              <h3>{post.title}</h3>
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
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleLike(post.post_id, likes[post.post_id])}
                >
                  <FontAwesomeIcon icon={faThumbsUp} /> Like (
                  {likes[post.post_id]})
                </button>

                <button className="btn btn-outline-danger mt-2" onClick={() => handleDelete(post.post_id)}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
                <br></br>
                <h5>Click on the image to play the video</h5>
                <h5>Click again to pause it</h5>
              </div>
              <CanvasAnimation
                binaryFiles={post.generatedDataForVideo.map(
                  (data) => data.binaryFile
                )}
                // Assuming the audio binary data is in the 'binaryFiles' field
                imageFiles={post.images.map((image) => image.image_url)}
              />
            </Card.Body>
          </Card>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Feed;
