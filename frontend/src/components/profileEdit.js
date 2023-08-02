import React, { useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import Footer from './footer';

const ProfileEdit = () => {


  const [profile, setProfile] = useState({
    fname: '',
    lname: '',
    mobile: '',
    location: '',
    pronouns: '',
    gender: '',
    bio: '',
    interests: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Update the overall profile state with modified fields only
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  useEffect(() => {
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
        // this.setState({ profile: data.data })
        setProfile(data.data);
        if (data.data === "token expired") {
          alert("Session expired. Please log in again");
          window.localStorage.clear();
          window.localStorage.href = "/";
        }
      });
  }, []);


  const rowStyle = {
    display: "flex"
  };
  const colStyle = {
    flex: "50%",
    padding: "10px",
  };
  const block = {
    width: "100%",
    border: "none",
    padding: "20px 35px",
    color: "white",
    textDecoration: "none"
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the user profile on the backend
      const token = window.localStorage.getItem("token");

      const response = await fetch("http://localhost:3001/api/profileEdit", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...profile, // Send the entire profile state
          token, // Make sure the token is included in the request body
        }),
      });

      const data = await response.json();

      // Handle success or error response from the backend
      if (response.ok) {
        console.log('Profile updated successfully:', data);
        alert("Profile Updated Successfully");
        window.location.href = "/profile"
      } else {
        console.error('Error updating profile:', data.error);
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" className="justify-content-between px-4 py-2">
        <Navbar.Brand href="/">Tales</Navbar.Brand></Navbar>
      <section className="d-flex justify-content-center" style={{ marginTop: '50px' }}>
        <form className="border border-primary rounded-4 border-2 mb-3" style={{ padding: "20px" }}>

          <h3>Update Profile</h3>

          <div style={rowStyle}>
            <div style={colStyle}>

              <aside className="mb-3">
                <label>First name</label>
                <input
                  type="text"
                  name='fname'
                  className="form-control"
                  value={profile.fname || ''}
                  onChange={handleChange}
                />
              </aside>

              <aside className="mb-3">
                <label>Last name <i>&#40;Optional&#41;</i></label>
                <input
                  type="text"
                  name='lname'
                  className="form-control"
                  value={profile.lname || ''}
                  onChange={handleChange}
                />
              </aside>

              <aside className="mb-3">
                <label>Mobile <i>&#40;Optional&#41;</i></label>
                <input
                  type="text"
                  name='mobile'
                  className="form-control"
                  value={profile.mobile || ''}
                  onChange={handleChange}
                />
              </aside>

              <aside className="mb-3">
                <label>Location <i>&#40;Optional&#41;</i></label>
                <input
                  type="text"
                  name='location'
                  className="form-control"
                  value={profile.location || ''}
                  onChange={handleChange}
                />
              </aside>

            </div>

            <div style={colStyle}>

              <aside className="mb-3">
                <label>Gender <i>&#40;Optional&#41;</i></label>
                <input
                  type="text"
                  name='gender'
                  className="form-control"
                  value={profile.gender || ''}
                  onChange={handleChange}
                />
              </aside>

              <aside className="mb-3">
                <label>Pronouns <i>&#40;Optional&#41;</i></label>
                <input
                  type="text"
                  name='pronouns'
                  className="form-control"
                  value={profile.pronouns || ''}
                  onChange={handleChange}
                />
              </aside>

              <aside className="mb-3">
                <label>Bio <i>&#40;Optional&#41;</i></label>
                <textarea
                  type="text"
                  name='bio'
                  className="form-control"
                  value={profile.bio || ''}
                  onChange={handleChange}
                />
              </aside>

              <aside className="mb-3">
                <label>Interests <i>&#40;Optional&#41;</i></label>
                <textarea
                  type="text"
                  name='interests'
                  className="form-control"
                  value={profile.interests || ''}
                  onChange={handleChange}
                />
              </aside>

            </div>
          </div>
          <aside className="d-grid">
            <div style={rowStyle}>
              <div style={colStyle}>
                <button className="btn btn-danger">
                  <a style={block} href='/profile'>Cancel Changes</a>
                </button>
              </div>
              <div style={colStyle}>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                  <a style={block}>Save Changes</a>
                </button>
              </div>
            </div>
          </aside>
        </form>
      </section>
      <br />
      <br />
      <br />

      <Footer />
    </>
  );
};

export default ProfileEdit;
