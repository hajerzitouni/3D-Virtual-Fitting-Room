import Review from '../models/Review.js';
import mongoose from 'mongoose';

export const getReviews = async(req, res) => {
    try {
        const reviewModels = await Review.find();
        console.log('getting Reviews');
        res.status(200).json(reviewModels);
    } catch (error) {
        res.status(404).send({message: error.message}); 
    }
}

export const getReviewById = async (req, res) => { 
    const { id } = req.params;

    try {
        const review = await Review.findById(id);
        
        res.status(200).json(review);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

export const createReview = async(req, res) => {
    console.log(`create review in server ${req}`);
    
    const { userId, message} = req.body;
    const newreview = await new Review({userId, message });
    try {
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(409).send({message: error.message});
    }
}
              

export const updateReview = async (req, res) => {
    const { id } = req.params;
    const { userId, message} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Review with id: ${id}`);


    const updatedReview ={ userId, message};

    await Review.findByIdAndUpdate(id, updatedReview, { new: true });

    res.status(200).json(updatedReview);
}

export const deleteReview = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Review with id: ${id}`);

    await Review.findByIdAndRemove(id);

    res.status(200).json({ message: "Review deleted successfully." });
}