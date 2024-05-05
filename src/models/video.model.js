// model for video

import mongoose, { Schema } from 'mongoose';
// this is the plugin we installed using this npm i mongoose-aggregate-paginate-v2
// this allows us to write aggregate query
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const videoSchema = new Schema(
  {
    videoFile: {
      type: String, // cloudniary url
      required: true,
    },
    thumbNails: {
      type: String, // Cloudniary Url
      required: true,
    },
    thumbNails: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String, // Cloudniary Url
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// we are installing this as a plugin to use or you can say
// it works something like a middleware
videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model('Video', videoSchema);
