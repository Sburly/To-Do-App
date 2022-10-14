const BaseJoi = require("joi");
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.entrySchema = Joi.object({
    title: Joi.string().required().escapeHTML(),
    exDate: Joi.date().required(),
    importance: Joi.string().required().escapeHTML(),
    description: Joi.string().required().escapeHTML(),
    tags: Joi.array().optional().max(5).items(Joi.string().escapeHTML()),
    status: Joi.string().required().valid("to-do", "doing", "done").escapeHTML(),
});