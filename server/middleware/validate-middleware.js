const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body); // Validate schema asynchronously
    req.body = parseBody; // Attach parsed body to req
    return next(); // Proceed to the next middleware if validation is successful
  } catch (err) {
    const status = 422;
    const message = "Fill the input properly"; // General message
    const extraDetails = err.errors[0].message; // Extract issue messages
    
    const error = {
      status,
      message,
      extraDetails,
    };

    next(error); // Pass the error object to the next error-handling middleware
  }
};

module.exports = validate;
