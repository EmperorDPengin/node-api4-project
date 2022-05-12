const moment = require('moment');
const yup = require('yup');

function logger(req, res, next) {
    // DO YOUR MAGIC
    const timeStamp = moment().format('HH:mm:ss');
    console.log(`${req.method} ${req.baseUrl} ${timeStamp}`);
    next();
}

const userSchema = yup.object().shape({
    username: yup
      .string()
      .typeError('Name needs to be a string')
      .trim()
      .required('A username/password is required'),
    password: yup
        .string()
        .trim()
        .required('A username/password is required')
});

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  userSchema.validate(req.body,
    {strict: true,
    stripUnknown: true}
    )
      .then(validated => {
        req.body = validated;
        next();
      })
      .catch(err => {
        next({status: err.status|| 400, message: "missing required name field"})
      });
}

function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    prodMessage: "something went wrong"
  });
}

module.exports = {
    logger,
    handleError,
    validateUser
}
