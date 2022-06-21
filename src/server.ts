import {app} from './app';

const port = app.get('port');

export const server = app.listen(port, () => console.log('app listening', port));

