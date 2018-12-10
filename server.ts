import app from './src/app';
import * as normalizePort from 'normalize-port';

const PORT = '8080';

app.listen(normalizePort(PORT), () => {
    console.log(`Express server is running on port ${PORT}`);
});