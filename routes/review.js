const express=require("express")
const router=express.Router({mergeParams:true})
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const{listingSchema,reviewSchema}=require("../schema.js")
const Review=require("../models/review.js")
const { isLoggedIn, isReviewAuthor } = require("../middleware.js")
const reviewController=require("../controllers/reviews.js")

const validateReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body)
    if(error){
        const errMsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg)
    }else{
        next()
    }
}


//Post Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview))
  
  //Delete Route
  router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview))

  module.exports=router