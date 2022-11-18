import usersService from "./users.services";

class UserController {
    async getAll(req, res, next) {
        try {
            const users = await usersService.getAll()
            return res.status(200).json(users)
        } catch (e) {
            return res.status(400).json(e)
        }
    }


    async create(req, res, next) {
        try {
            const user = await usersService.create(req.body)
            return res.status(201).json(user)
        } catch (e) {
            return res.status(400).json(e)
        }

    }

    async getOne(req, res, next) {
        try {
            const user = await usersService.getOne(req.params.id, req.query.order_by, req.query.order_type)
            return res.status(200).json(user)
        } catch (e) {
            return res.status(400).json(e)
        }
    }

    async getMaxFollowingUsers(req, res, next) {
        try {
            const users = await usersService.getMaxFollowingUsers()
            return res.status(200).json(users)
         } catch (e) {
            return res.status(400).json(e)
        }
    }

    async getNoFollowingUsers(req, res, next) {
        try {
            const users = await usersService.getNoFollowingUsers()
            return res.status(200).json(users)
        } catch (e) {
            return res.status(400).json(e)
        }
    }
}

export default new UserController()