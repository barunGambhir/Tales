const express = require("../frontend/node_modules/express");
const morgan = require("../frontend/node_modules/morgan");
const dotenv = require("../frontend/node_modules/dotenv");
const bodyparser = require("../frontend/node_modules/body-parser");
const connectDB = require("./connection");
const mongoose = require("../frontend/node_modules/mongoose");
const cors = require("cors");
const bcrypt = require("../frontend/node_modules/bcrypt");
const path = require("path");
const fs = require("fs");
const util = require("util");

const jwt = require("../frontend/node_modules/jsonwebtoken");
const JWT_SECRET = "erjvbjrnjrnjrnvjnjrnejknkeker";

const { Configuration, OpenAIApi } = require("../frontend/node_modules/openai");

const app = express();

// // Load environment variables
dotenv.config();

// // Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

//Database for authentication
//
//
//

app.use(cors());

connectDB();

const App = require("./models/app");
const User = require("./models/user");
const Post = require("./models/post");
const Image = require("./models/image");


//for registeration

app.post("/api/register", async (req, res) => {
  const { fname, lname, email, password, role, mobile, location, pronouns, gender, bio, interests } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await App.findOne({ email });
    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    const newAppUser = await App.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      role,
      mobile,
      location,
      pronouns,
      gender,
      bio,
      interests,
    });

    const newUser = await User.create({
      fname,
      lname,
      email: newAppUser.email,
    });
    res.send({ status: "OK" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

//for login

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await App.findOne({ email });
  if (!user) {
    return res.json({ error: "Please enter valid email address" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user.email }, JWT_SECRET);

    if (res.status(201)) {
      //console.log(user._id);
      return res.json({
        status: "Login Successfull!!",
        data: { token, userId: user.email },
      });
    } else {
      return res.json({ status: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/api/profile", async (req, res) => {
  const { token } = req.body;
  try {
    const user = await jwt.verify(token, JWT_SECRET);
    console.log(user);
    const useremail = user.userId;
    const data = await App.findOne({ email: useremail });
    if (!data) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    res.json({ status: 'Ok', data: data });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.json({ status: 'error', data: 'token expired' });
    }
    res.status(500).json({ error: 'Error fetching user profile: ' + error.message });
  }
});

// Profile update route
app.put("/api/profileEdit", async (req, res) => {
  const { fname, lname, email, password, role, mobile, location, pronouns, gender, bio, interests, token } = req.body;
  try {
    const user = await jwt.verify(token, JWT_SECRET);
    console.log(user);
    const useremail = user.userId;

    const updatedProfile = await App.findOneAndUpdate(
      { email: useremail },
      { fname, lname, email, password, role, mobile, location, pronouns, gender, bio, interests },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    res.json(updatedProfile);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.json({ status: 'error', data: 'token expired' });
    }
    res.status(500).json({ error: 'Error updating user profile: ' + error.message });
  }
});

//
//
//
//Database for authentication

//build
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
//build

const textToSpeech = require("../frontend/node_modules/@google-cloud/text-to-speech");
//const { default: mongoose } = require('mongoose');

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: "gurkiratsingh301566100-c00be2548a69.json",
});

const configuration = new Configuration({
  organization: "org-qWb5TjrbGzijhFn338vypkqW",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const prompt =
  "Assume i have to create image which would show only one main character from this line or paragraph and some context of backgroud if neccessary. In one sentence of no more than 15 words tell what would you would see in the picture. keep tha language and words simple. The line is --";

const sdk = require("../frontend/node_modules/api")(
  "@leonardoai/v1.0#28807z41owlgnis8jg"
);

sdk.auth("91c616c9-a7bf-4c8b-98fb-7893e4a97601"); //user name for leonardo

async function convertTextToMp3(para) {
  const request = {
    audioConfig: {
      audioEncoding: "LINEAR16",
      effectsProfileId: ["small-bluetooth-speaker-class-device"],
      pitch: 0,
      speakingRate: 1,
    },
    input: {
      text: para,
    },
    voice: {
      languageCode: "en-US",
      name: "en-US-Neural2-J",
    },
  };

  const [response] = await client.synthesizeSpeech(request);
  const audioContent = response.audioContent;
  return audioContent;
}

const createChatCompletion = async (paragraph) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: paragraph + " " + prompt }],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate chat completion");
  }
};

const createGeneration = async (generatedPrompt) => {
  try {
    const generationResponse = await sdk.createGeneration({
      prompt: generatedPrompt,
      modelId: 'ac614f96-1082-45bf-be9d-757f2d31c174',
      width: 768,
      height: 768,
      //sd_version: 'v2',
      num_images: 1,
      num_inference_steps: 46,
      guidance_scale: 15,
      public: false,
      promptMagic: true,
      negative_prompt: 'deformed faces, multiple and deformed limbs, deformed body',
    });

    return generationResponse.data.sdGenerationJob.generationId;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create generation");
  }
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const getGenerationById = async (generationId) => {
  try {
    let imageUrl = null;
    let retryCount = 0;

    while (!imageUrl && retryCount < 20) {
      const imageResponse = await sdk.getGenerationById({ id: generationId });
      imageUrl = imageResponse.data.generations_by_pk.generated_images[0]?.url;
      retryCount++;
      console.log("this si running ", retryCount);
      if (!imageUrl) {
        await sleep(2000); // Wait for 1 second before retrying
      }
    }

    if (!imageUrl) {
      throw new Error("Failed to retrieve generation by ID");
    }

    return imageUrl;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve generation by ID");
  }
};

app.post("/generate", async (req, res) => {
  try {
    const { title, story, userid } = req.body;
    const paragraphs = story.split("\n"); // Split text into paragraphs
    const generatedDataForVideo = [];

    for (let i = 0; i < paragraphs.length; i++) {
      let generatedPrompt = await createChatCompletion(paragraphs[i]);
      generatedPrompt = generatedPrompt + " Octane render, detailed, high quality, full body"
      const generationId = await createGeneration(generatedPrompt);

      const audioContent = await convertTextToMp3(paragraphs[i]);

      const imageUrl = await getGenerationById(generationId);

      const newImagePromise = await Image.create({
        // Create a new Image document
        image_id: generationId,
        image_url: imageUrl,
      });

      generatedDataForVideo.push({
        prompt: generatedPrompt,
        paragraph: paragraphs[i],
        image_id: newImagePromise._id,
        binaryFile: audioContent,
      });
    }

    const newPost = await Post.create({
      // Create a new Post document
      email: userid,
      title: title,
      generatedDataForVideo: generatedDataForVideo,
    });

    // Update the User document with the new Post
    await User.findOneAndUpdate(
      { email: userid },
      {
        $push: { posts: newPost._id },
      }
    );
    console.log("created dtat");
    res.json({
      success: true,
      message: "Data generated and stored successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to generate prompts and paragraphs" });
  }
});

// update number of likes
app.post("/updateLikes", async (req, res) => {
  try {
    const { post_id, likes } = req.body;
    console.log(req.body);
    await Post.findOneAndUpdate(
      { _id: post_id },
      {
        $set: { likes: likes },
      }
    );
    console.log("updated likes");
    res.json({ success: true, message: "Likes updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update likes" });
  }
});

// delete post
app.post("/deletePost", async (req, res) => {
  try {
    const { post_id, user_id} = req.body;
    console.log(req.body);

    const usertocheck = await User.findOne({email: user_id});
    const usertocheckwithpost = await Post.findById(post_id);

    // Check if the user exists and has the type "moderator"
    if (usertocheck.type === "moderator" || usertocheckwithpost.email === user_id){

      const user = await User.findOne({ posts: post_id });

      const indexToDelete = user.posts.indexOf(post_id);
      user.posts.splice(indexToDelete, 1);

      // Save the updated user
      await user.save();

      await Post.findOneAndDelete({ _id: post_id });

      res.json({ success: true, message: "Post deleted successfully" });
      }
      else{
        res.json({ message: "Cannot delete other users' posts" });

        }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});


app.post("/user-posts", async (req, res) => {
  try {

    const userEmail = req.body.email;

    const posts = await Post.aggregate([
      { $match: { email: userEmail } }, // Match posts with the user's email
      {
        $lookup: {
          from: "images", // Collection name for the Image model
          localField: "generatedDataForVideo.image_id",
          foreignField: "_id",
          as: "images",
        },
      },
    ]);

    const formattedPosts = posts.map((post) => {
      const formattedImages = post.images.map((image) => ({
        image_url: image.image_url,
      }));

      const formattedDataForVideo = post.generatedDataForVideo.map((data) => ({
        prompt: data.prompt,
        paragraph: data.paragraph,
        image_id: data.image_id,
        binaryFile: data.binaryFile,
      }));

      return {
        post_id: post._id,
        title: post.title,
        likes: post.likes,
        images: formattedImages,
        generatedDataForVideo: formattedDataForVideo,
      };
    });
    console.log(formattedPosts);
    res.json(formattedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve random posts" });
  }
});


app.post("/random-posts", async (req, res) => {
  try {
    const posts = await Post.aggregate([
      { $sample: { size: 3 } }, // Retrieve 2 random posts
      {
        $lookup: {
          from: "images", // Collection name for the Image model
          localField: "generatedDataForVideo.image_id", // Use 'image_id' instead of 'image'
          foreignField: "_id",
          as: "images",
        },
      },
    ]);

    const formattedPosts = posts.map((post) => {
      const formattedImages = post.images.map((image) => ({
        image_url: image.image_url,
      }));

      const formattedDataForVideo = post.generatedDataForVideo.map((data) => ({
        prompt: data.prompt,
        paragraph: data.paragraph,
        image_id: data.image_id,
        binaryFile: data.binaryFile,
      }));

      return {
        post_id: post._id,
        title: post.title,
        likes: post.likes,
        images: formattedImages,
        generatedDataForVideo: formattedDataForVideo,
      };
    });
    console.log(formattedPosts);
    res.json(formattedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve random posts" });
  }
});

app.use(express.static(path.join(__dirname, "public")));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

