import {appDataSource} from "./data-source";
import {User} from "../users/users.entity";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function inject_data_to_database() {
    try {
        let users = []

        const users_count = 200 // how many users will be created

        await appDataSource.initialize()

        await appDataSource.transaction(async entityManager => {
            for (let i = 0; i < users_count; i++) {
                let user = new User()
                user.first_name = i + getRandomInt(i, users_count).toString(16) + i + i.toString(16)
                user.gender = getRandomInt(-1, 1) === 0 ? 'male' : 'female'
                users.push(user)
            }
            await entityManager.save(users)

            for (let i = 0; i < users_count; i++) {
                let factor = getRandomInt(1, 10)
                const from = i - factor + users_count / 100
                const to = i + users_count / 100
                users[i].followers = users.slice(from, to)
                    .filter(value => value.id !== users[i].id)

            }
            await entityManager.save(users)
        })
        console.log("Data Successfully injected to database")
    } catch (e) {
        throw e
    }
}

inject_data_to_database()
