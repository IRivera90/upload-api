require('dotenv').config()

const fs = require('fs')
const AWS = require('aws-sdk')
const mime = require('mime-types')

AWS.config.update({
  region: 'us-east-1'
})
// Create S3 service object
const s3 = new AWS.S3();

// call S3 to retrieve upload file to specified bucket
const s3Upload = function (file) {
  const uploadParams = {
    Bucket: process.env.BUCKET,
    Key: '',
    Body: '',
    ACL: 'public-read',
    ContentType: mime.lookup(file)
  }
}
// Configure the file stream and obtain the upload parameters
const fileStream = fs.createReadStream(file)
fileStream.on('error', function (err) {
  console.log('File Error', err)
});
uploadParams.Body = fileStream
const path = require('path')
uploadParams.Key = path.basename(file)

return new Promise((resolve, reject) => {
  s3.upload(uploadParams, function(err, data) {
    if (err) {
      reject(err)
    }
    if (data) {
      resolve(data)
    }
  })
})

// call S3 to retrieve upload file to specified bucket


module.exports = s3Upload
