
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (local or Atlas)
mongoose.connect('mongodb://127.0.0.1:27017/indiaExplorer', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema for cultural stories
const storySchema = new mongoose.Schema({
    name: String,
    state: String,
    category: String,
    story: String,
    date: { type: Date, default: Date.now }
});

// Model
const Story = mongoose.model('Story', storySchema);

// POST route to save form data
app.post('/submit-story', async (req, res) => {
    try {
        const { name, state, category, story } = req.body;
        const newStory = new Story({ name, state, category, story });
        await newStory.save();
        res.send({ success: true, message: "Story saved successfully!" });
    } catch (err) {
        res.status(500).send({ success: false, message: "Error saving story", err });
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
