function validateRequest(req, next, schema){
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknow: true
    }
    const { error, value } = schema.validate(req.body, options);
    if (error){
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`)
    } else {
        req.body = value;
        console.log(req.body)
        next();
    }
}


module.exports = validateRequest