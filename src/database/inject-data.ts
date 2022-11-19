import {appDataSource} from "./data-source";
import {User} from "../users/users.entity";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function inject_data_to_database() {
    try {
        const conn = await appDataSource.initialize()
        let users = []

        const users_count = 200 // how many users will be created

        
        // Creating users
        for (let i = 0; i < users_count; i++) {
            let user = new User()
            user.first_name = 'user' + i.toString()
            user.gender = 'male'
            users.push(user)
        }
        await conn.manager.save(users)

        // Creating users-relations(following)
        for (let i = 0; i < users_count; i++) {
            let factor = getRandomInt(1, 10)
            const from = i - factor + users_count / 100
            const to = i + users_count / 100
            users[i].followers = users.slice(from, to)
                .filter(value => value.id !== users[i].id)

        }
        await conn.manager.save(users)
        console.log("Data Successfully injected to database")
    } catch (e) {
        throw e
    }
}

inject_data_to_database()
