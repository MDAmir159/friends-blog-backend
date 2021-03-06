const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
const formattedTime = require('../../Utilities/TimeAndDate')
const db = require('../../config/index');
const AllHomeQueries = require('../../Query/HomeQuery/Home');

const HTTPStatus = require('../../HttpsStatus/index')
router.post('/postNewElements',async (req,res) =>{

    try {
        const {
            postUserId,
            postDescription,
            postInsertedTime,
            postUpdatedTime,
            postUserName,
        } = req.body.tempNewPost;

        const addNewPost = await AllHomeQueries.postNewElements(postUserId,postDescription,postInsertedTime,postUpdatedTime,postUserName);
        // const addNewPost = AllHomeQueries.postNewElements(req.body.tempNewPost);
        // console.log(addNewPost , "line 21");
        if(addNewPost){
            res.status(HTTPStatus.CREATED).json({
                status : "created successfully",
                message : "success"
            })
        } else {
            res.status(HTTPStatus.BAD_REQUEST).json({
                status : "failure",
                message : "cannnot created successfully"
            })
        }

    } catch (error) {
        next(error)
    }

    // const userId = req.body.tempNewPost.postUserId;
    // const postDescription = req.body.tempNewPost.postDescription;
    // const postInsertedTime = req.body.tempNewPost.postInsertedTime || "Inserted Time";
    // const postUpdatedTime = req.body.tempNewPost.postUpdatedTime || "";
    // const postUserName = req.body.tempNewPost.postUserName;
    // const sqlInstert = "INSERT INTO posts (userId, postDescription, postInsertedTime, postUpdatedTime, postUserName) VALUES (?, ?, ?, ?, ?)";
    // const inputArray = [userId,postDescription,postInsertedTime,postUpdatedTime,postUserName];
    // //console.log(inputArray);
    // console.log(req.body);
    // if(!userId){
    //   return res.status(400).json({message : "userId undefined"});
    // }
    // try {
    //     db.query(sqlInstert, inputArray ,(error,result) =>{
    //         if(error){
    //             console.log(error);
    //             res.status(500).json({message : "internal server error....toh ai kittam"});
    //         } else {
    //             console.log(result,"line 19");
    //             res.status(201).json({message : result.insertId});
    //         }
    //     })    
    // } catch (error) {
    //     console.log(error);
    // }
    
})

router.get("/postListItems",(req,res) =>{
    const sqlQuery = `SELECT * FROM posts`;
    db.query( sqlQuery ,(error,rows) =>{
        if(error){
            console.log(error);
        } else {
            res.status(200).send(rows)
        }
    })
})



module.exports = router;