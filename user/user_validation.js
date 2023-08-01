import Joi from "joi";

export const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  contactNumber: Joi.string().max(10).required(),
  userType: Joi.string().valid("Seeker", "Provider").required(),
  name: Joi.string().min(3).max(55).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
