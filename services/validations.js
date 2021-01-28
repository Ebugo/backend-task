const Joi = require('joi');
const _ = require('lodash');
const responseHandler = require('../services/responseHandler');

const validate = (data, conditions) => {
  const schema = Joi.object(conditions);

  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    return { 
      isValidForRule: false, 
      message: error.details[0].message.replace(/\"/g,'')
    }
  }
}

const bodyConditions = {
  rule: Joi.required().custom((value, helpers) => {
    if (!_.isPlainObject(value)) {
      return helpers.message('rule should be an object.')
    };
  }),
  data: Joi.required().custom((value, helpers) => {
    if (!_.isPlainObject(value) && !_.isString(value) && !_.isArray(value)) {
      return helpers.message('data should be an object, array or a string.')
    };
  })
};

const ruleConditions = {
  field: Joi.required(),
  condition: Joi.required(),
  condition_value: Joi.required()
};

const validations = (req, res, next) => {
  const { body } = req;
  const bodyValidationResult = validate(body, bodyConditions);

  if (bodyValidationResult) {
    let { isValidForRule, message } = bodyValidationResult;
    return res.status(400).json(responseHandler(isValidForRule, message));
  }

  const { rule, data } = body;
  const ruleValidationResult = validate(rule, ruleConditions);

  if (ruleValidationResult) {
    let { isValidForRule, message } = ruleValidationResult;
    return res.status(400).json(responseHandler(isValidForRule, message));
  }

  let { field, condition } = rule;
  let fields = field.split('.')

  if (fields.length > 3) {
    return res.status(400)
    .json(responseHandler(false, 'rule field nesting should not be more than two levels.'));
  }

  let path = fields.join('.');
  const query = _.get(data, path);
  if (!query) {
    return res.status(400).json(responseHandler(false, `field ${path} is missing from data.`));
  }
  req.fieldValue = query;

  let validConditions = ['eq', 'neq', 'gt', 'gte', 'contains'];
  if (!_.includes(validConditions, condition)) {
    return res.status(400).json(responseHandler(false, 'invalid condition specified.'));
  }

  next();
};

module.exports = validations;
