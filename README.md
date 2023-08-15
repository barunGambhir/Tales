# Tales

General Architecture of the system
Frontend: The frontend is built using React.js, responsible for presenting the user interface to the users. It allows users to add a title and a story text entry, which are then sent to the backend for processing.

Backend: The backend is built using Node.js and Express.js. It serves as the intermediary between the front end and various external services and databases. It receives the user inputs from the front end and communicates with the MongoDB database hosted on the cloud (Atlas) using Mongoose to save the title and story text.

MongoDB (Atlas): The cloud-based MongoDB serves as the database for the web application. It stores the user-submitted titles, story text, generated images, and other relevant data.

Internal Service: JSON Web Tokens (JWT): The JSON Web Tokens are used as an internal service for handling user authentication and authorization. There are two types of users (as mentioned earlier): A moderator user and a Regular user. The key difference between the two users is that a moderator will have access to delete any post created by any user (regular or moderator). Whereas, regular users will only be able to delete their posts and will be restricted from deleting other users’ posts.

External Services:
a. OpenAI API: The backend forwards the user's story text to the OpenAI API, which generates prompts based on the input.
b. Leonardo API: The prompts generated by the OpenAI API are then forwarded to the Leonardo API, which generates corresponding images based on those prompts.
c. Google Cloud's Text-to-Speech API: The story text is sent to Google Cloud's Text-to-Speech API, which generates an audio file with a voice-over of the story text.
Image Slideshow Generation: Once the images and audio files are generated by the external services, the backend combines these assets to create an image slideshow. The slideshow data is then stored in the MongoDB database.

User Post Creation: The web application combines the slideshow with the voice-over generated by the Text-to-Speech API to create a user post. This post contains the user's submitted title, story text, and the generated image slideshow with a voice-over.

Subsystem Communication:
Frontend communicates with Backend: The frontend sends user inputs (title and story text) to the backend for processing.
Backend communicates with MongoDB: The backend communicates with the MongoDB database (hosted on Atlas) to save the user-submitted title and story text.
Backend communicates with OpenAI API: The backend forwards the story text to the OpenAI API to generate prompts.
Backend communicates with Leonardo API: The prompts generated by the OpenAI API are sent to the Leonardo API to generate images.
Backend communicates with Google Cloud's Text-to-Speech API: The story text is sent to the Text-to-Speech API to generate an audio file.
Backend combines the generated assets: Once the images and audio files are generated by the external services, the backend combines them to create an image slideshow, which is then stored in the MongoDB database.
Frontend displays the User Post: The web application combines the slideshow with the voice-over generated by the Text-to-Speech API to create a user post, displaying the title, story text, images, and voice-over to the users.

Overall, the system architecture follows a client-server model, where the front end communicates with the backend, which then interacts with various external services and the database to process user inputs and generate user posts with the slideshow and voice-over.
