import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';


const HomePage = () => {
 return (
   <section style={{ display: 'flex', minHeight: '70vh'}}>
     <Container className="py-3">
         <Row md={8} className="justify-content-center text-center" >
             <h1>Welcome to <span style={{ color: '#0d6efd' }}>Tales</span></h1>
             <p>Bring your stories to life with captivating visuals and videos.</p>
         </Row>
     <aside
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src="https://cdn.leonardo.ai/users/ad1fa781-4f92-4642-a3d3-a5bf85eec6e3/generations/de8a4752-63d7-44d4-8090-1ad1532314b6/Leonardo_Diffusion_A_detailed_realistic_rendering_of_the_iconi_0.jpg"
        alt="AI generated image"
        style={{ maxWidth: '30%', height: 'auto', marginBottom: '20px'}}
      />
    </aside>
         <Row className="justify-content-center text-center">
           <Col md={5}>
             <p class="text-justify">Tales is a platform that empowers users to transform their stories into visually captivating experiences. Whether you're a writer, blogger, or storyteller, Tales provides a user-friendly web app to share your narratives and bring them to life.</p>
           </Col>
         </Row>
       </Container>
   </section>
 );
};


export default HomePage;