import { Router } from 'express';

import usersController from "../users/users.controller";

const router = Router();

router.get('/users', usersController.getAll)
router.get('/users/:id/friends', usersController.getOne)
router.get('/max-following', usersController.getMaxFollowingUsers)
router.get('/no-following', usersController.getNoFollowingUsers)
router.post('/users', usersController.create)

export default router;
