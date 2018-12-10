import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ImageInterface as IImage } from '../interfaces/imageInterface';
import { imageSchema } from '../schemas/imageSchema';

export interface ImageModel extends IImage, Document {}

export default mongoose.model<ImageModel>('Image', imageSchema);