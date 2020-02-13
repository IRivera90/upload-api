require('dotenv').config()

const AWS = require("aws-sdk");
const mime = require('mime-types')

AWS.config.update({region: 'us-east-1'})

// Create S3 service object
s3 = new AWS.S3();

// call S3 to retrieve upload file to specified bucket

const file = process.argv[2];


const uploadParams = {Bucket: process.env.BUCKET,
  Key: '',
  Body: '',
  ACL: 'public-read',
  ContentType: mime.lookup(file)
}
// Configure the file stream and obtain the upload parameters
const fs = require('fs');
const fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;
const path = require('path');
uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});
