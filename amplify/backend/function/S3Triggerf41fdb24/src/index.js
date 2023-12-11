const sharp = require('sharp');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async function (event, context) {
  if (event.Records[0].eventName === 'ObjectCreated:Delete')
    return

  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;

  try {
    const params = {
      Bucket: bucket,
      Key: key
    };

    const image = await s3.getObject(params).promise();
    const imageMetadata = await sharp(image.Body).metadata();
    if (imageMetadata.width <= 100 && imageMetadata.height <= 100)
      return

    const resizedImage = await sharp(image.Body).resize(100, 100).toBuffer();
    const paramsThumb = {
      Bucket: bucket,
      Key: `thumb/${key}`,
      Body: resizedImage
    };
    await s3.putObject(paramsThumb).promise();
  } catch (error) {
    console.log(error);
    context.fail(`error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`)
  }
};
