import { Router } from "express";
import pollManager from '../utils/index.js';

const router = Router();

router.get('/poll-history', (req, res) => {
  res.json(pollManager.getHistory());
});

export default router;
