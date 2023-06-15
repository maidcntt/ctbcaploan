const Joi = require('joi');

const createTaskSchedule = {
  body: Joi.object().keys({
    task_name: Joi.string().required(),
    cron_expression: Joi.string().required(),
    params: Joi.object().keys({
      daysAgo: Joi.number().integer()
    })
  })
};

const getTaskSchedules = {
  query: Joi.object().keys({
    task_name: Joi.string(),
    sort_by: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getTaskSchedule = {
  params: Joi.object().keys({
    task_schedule_id: Joi.number().integer()
  })
};

const updateTaskSchedule = {
  params: Joi.object().keys({
    task_schedule_id: Joi.number().integer().required()
  }),
  body: Joi.object()
    .keys({
      task_name: Joi.string(),
      cron_expression: Joi.string(),
      params: Joi.object().keys({
        daysAgo: Joi.number().integer()
      })
    })
    .min(1)
};

const deleteTaskSchedule = {
  params: Joi.object().keys({
    task_schedule_id: Joi.number().integer()
  })
};

const getTaskScheduleExecutions = {
  query: Joi.object().keys({
    task_name: Joi.string(),
    sort_by: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

module.exports = {
  createTaskSchedule,
  getTaskSchedules,
  getTaskSchedule,
  updateTaskSchedule,
  deleteTaskSchedule
};
