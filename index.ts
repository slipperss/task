import "reflect-metadata"

import app from './app';
import {appDataSource} from "./src/database/data-source";


async function start() {
    const port = process.env.PORT || 8000
    await appDataSource.initialize()
    app.listen(port, () => console.log(`Server running on ${port}`));
}

start()
