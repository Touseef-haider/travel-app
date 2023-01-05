// for handling multipart form data, multer adds file object in req.It is a middleware
const multer = require("multer");
const AWS = require("aws-sdk");
const fs = require("fs");

// init aws sdk

// init the keys
AWS.config.update({
  accessKeyId: process.env.I_AM_ACCESS_ID,
  secretAccessKey: process.env.I_AM_SECRET,
  region: "ap-northeast-1",
});

// creating an instance of aws s3 bucket
const s3 = new AWS.S3();

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({
  storage,
}).array("files");
const upload = multer({
  storage,
}).single("file");

// for single file
const uploadFilesToS3 = (file, cb) =>
  // eslint-disable-next-line
  fs.readFile(file.path, (err, filedata) => {
    if (!err) {
      const putParams = {
        // the name of the bucket goes here
        Bucket: process.env.BUCKET_NAME,
        // the name of the subfolder in bucket
        Key: `${Date.now()}-${file.filename}`,
        ContentType: file.mimetype,
        Body: filedata,
        ACL: "public-read",
      };
      s3.upload(putParams, (s3err, data) => {
        if (s3err) {
          // eslint-disable-next-line
          console.log("Could not upload the file. Error :", s3err);
          cb({
            success: false,
            data,
          });
          return;
        }
        // eslint-disable-next-line
        console.log("Successfully uploaded the file");
        cb({
          success: true,
          data,
        });
      });
    } else {
      // eslint-disable-next-line
      console.log({ err: err });
    }
  });

// for multiple files
const uploadMultipleFilesToS3 = (req, res) => {
  const response = [];
  req.files.map(
    (file) =>
      // eslint-disable-next-line
      fs.readFile(file.path, (err, filedata) => {
        if (!err) {
          const putParams = {
            // the name of the bucket goes here
            Bucket: process.env.BUCKET_NAME,
            // the name of the subfolder in bucket
            Key: `${Date.now()}-${file.filename}`,
            Body: filedata,
            ACL: "public-read",
            contentType: file.mimetype,
          };
          // eslint-disable-next-line
          s3.upload(putParams, (s3err, data) => {
            if (s3err) {
              // eslint-disable-next-line
              console.log("Could not upload the file. Error :", s3err);
              return res.status(403).json({
                success: false,
                data,
              });
            }
            // eslint-disable-next-line
            console.log("Successfully uploaded the file");
            response.push(data);
            if (response.length === req.files.length) {
              return res.status(200).json({
                error: false,
                Message: "File Uploaded SuceesFully",
                Data: response,
              });
            }
          });
        }
        // eslint-disable-next-line
        console.log({ err: err });
      })
    // eslint-disable-next-line
  );
};
const deleteFromS3 = (req, res) => {
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: req.params.key,
    };
    return s3.deleteObject(params, (err) => {
      // eslint-disable-next-line
      if (err) {
        // eslint-disable-next-line
        console.log(err, err.stack);
      } else {
        // eslint-disable-next-line
        Temporary.deleteOne({
          key: req.params.key,
        })
          .then(
            (resp) =>
              // eslint-disable-next-line
              res.status(200).json({
                message: "deleted",
                resp,
              })
            // eslint-disable-next-line
          )
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
          });
      }
    });
  } catch (error) {
    return res.status(403).json({
      mesage: error.message,
    });
  }
};

const deleteManyFromS3 = (arrayOfKeys) => {
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Delete: {
        Objects: [...arrayOfKeys],
      },
    };
    s3.deleteObjects(params, (err) => {
      // eslint-disable-next-line
      if (err) {
        // eslint-disable-next-line
        console.log(err, err.stack);
        return;
      }
      // eslint-disable-next-line
      console.log("Deleted");
    });
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
};

const getFilesFromS3 = (req, res, next) => {
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Delimiter: "/",
    };

    return s3.listObjects(params, (err, data) => {
      if (err) {
        return `There was an error viewing your album: ${err.message}`;
      }
      return res.status(200).json(data.Contents);
    });
  } catch (err) {
    return next(err);
  }
};

const getFileFromS3 = (key) => {
  const downloadParams = {
    Key: key,
    Bucket: process.env.CSV_BUCKET_NAME,
  };
  return s3.getObject(downloadParams).createReadStream();
};

module.exports = {
  uploads,
  upload,
  uploadMultipleFilesToS3,
  uploadFilesToS3,
  deleteFromS3,
  deleteManyFromS3,
  getFileFromS3,
  getFilesFromS3,
};
