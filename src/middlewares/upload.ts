import * as multer from 'multer';
import * as fs from 'fs';

export default class Upload {
    private uploadPath: string = './src/uploads';
    private MIME_TYPE_MAP: object = {
        'image/png': 'png',
        'image/jpeg': 'jpeg',
        'image/jpg': 'jpg'
    };

    config() {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const validate = this.validateFile(file);
                cb(validate, this.uploadPath);
            },
            filename: (req, file, cb) => {
                const name = file.originalname.toLowerCase().split(' ').join('-');
                const ext = this.MIME_TYPE_MAP[file.mimetype];
                cb(null, name + '-' + Date.now() + '.' + ext);
            }
        });

        return storage;
    }

    validateFile(file) {
        const isValid = this.MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }

        return error;
    }

    extractFile() {
        return multer({ storage: this.config() }).array('images');
    }

}