const router = require('express').Router();
const _ = require('lodash');
const responseHandler = require('../services/responseHandler');
const validations = require('../services/validations');

router.post('/', validations, async (req, res, next) => {
  try {
    // Destructure information from request body
    const { body: { rule: { field, condition, condition_value } }, fieldValue } = req;

    let validateRule = condition === 'contains' ? _.includes :
      condition === 'neq' ? _.eq : _[condition];
    let validateResult = condition === 'neq' ? 
      !validateRule(fieldValue, condition_value) : 
      validateRule(fieldValue, condition_value);

    let message = validateResult === true ? 'successfully validated.' : 'failed validation.';
    let status = validateResult === true ? 'success' : 'error';

    res.status(validateResult ? 200 : 400).json({
      data: {
        message: `field ${field} ${message}`,
        status,
        validation: {
          error: !validateResult,
          field,
          field_value: fieldValue,
          condition,
          condition_value
        }
      }
    });
  } catch (err) {
    res.status(400).json(responseHandler(false, err.message));
  }
})

module.exports = router;
