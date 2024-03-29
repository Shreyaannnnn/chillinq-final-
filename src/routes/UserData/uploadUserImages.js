router.put(
    "/:userId/profile-image", 
    uploadImage.single("image"), // our uploadImage middleware
    (req, res, next) => {
        /* 
           req.file = { 
             fieldname, originalname, 
             mimetype, size, bucket, key, location
           }
        */

        // location key in req.file holds the s3 url for the image
        let data = {}
        if(req.file) {
            data.image = req.file.location
        }
    }
)