import {appDataSource} from "../database/data-source";
import {User} from "./users.entity";

class UserService {
  constructor(
      public usersRepository = appDataSource.getRepository(User)) {
  }

  async create(data) {
    const user = await this.usersRepository.create({
      first_name: data.first_name,
      gender: data.gender
    })
    return await this.usersRepository.save(user)
  }

  async getAll() {
    return await this.usersRepository.find({relations: {followers: true}})
  }

  async getOne(id: number, order_by: string = 'id', order_type: string = 'ASC') {
      // get required users
      const user = await this.usersRepository.findOne({where: {id: id}, order: {}})
      
      // get user friends (mutual following)
      const friends = await this.usersRepository.query(`
           (SELECT "user_followers"."id" as "id",
                  "user_followers"."first_name" as "first_name",
                  "user_followers"."gender" as "gender"
            FROM users "user"
            INNER JOIN "user-relations" "u-r"
            ON "u-r"."usersId_1" = "user"."id"
            INNER JOIN "users" "user_followers"
            ON "user_followers"."id" = "u-r"."usersId_2"
            WHERE "user"."id" = ${id}
            INTERSECT
            SELECT "user_followers"."id" as "id",
                   "user_followers"."first_name" as "first_name",
                   "user_followers"."gender" as "gender"
            FROM users "user"
            INNER JOIN "user-relations" "u-r"
            ON "u-r"."usersId_2" = "user"."id"
            INNER JOIN "users" "user_followers"
            ON "user_followers"."id" = "u-r"."usersId_1"
            WHERE "user"."id" = ${id}
            ORDER BY ${order_by} ${order_type})`
      )
      // data aggregation
      const info = {
          id: user.id,
          first_name: user.first_name,
          gender: user.gender,
          friends: friends
      }
      return info
  }
  async getMaxFollowingUsers() {
    // get the five users with the most followings
    const users = this.usersRepository.query(`
        (SELECT "user"."id" AS "id",
                "user"."first_name" AS "first_name",
                "user"."gender" AS "gender",
                COUNT("u_r"."usersId_2") AS "followings_count"
        FROM "users" "user"
        LEFT JOIN "user-relations" "u_r"
        ON "u_r"."usersId_2"="user"."id"
        GROUP BY "user"."id"
        ORDER BY followings_count DESC
        LIMIT 5)`
    )
    return users
  }

  async getNoFollowingUsers() {
    // get the users with nop followings
    const users = this.usersRepository.query(`
        (SELECT "user"."id" AS "id",
               "user"."first_name" AS "first_name",
               "user"."gender" AS "gender",
               COUNT("u_r"."usersId_2") AS "followings_count"
        FROM "users" "user"
        LEFT JOIN "user-relations" "u_r"
        ON "u_r"."usersId_2"="user"."id"
        GROUP BY "user"."id"
        HAVING COUNT("u_r"."usersId_2") = 0
        ORDER BY followings_count DESC)`
    )
    return users
  }
}

export default new UserService();
