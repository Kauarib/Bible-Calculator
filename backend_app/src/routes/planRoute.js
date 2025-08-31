// backend_app/src/routes/planRoutes.js

const express = require('express');
const router = express.Router();
const { createPlan, getPlans } = require('../controllers/planController');
const { protect } = require('../middleware/authMiddleware');


// Apenas usuários logados poderão criar ou ver planos.
router.use(protect);

router.route('/')
  .post(createPlan)   // POST /api/plans
  .get(getPlans);     // GET /api/plans

module.exports = router;