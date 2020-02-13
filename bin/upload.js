const s3Upload = require('./../lib/s3_upload')
const file = process.argv[2]

s3Upload(file)
  .then((data) => {
    console.log(data)
  })
  .catch(console.error)
