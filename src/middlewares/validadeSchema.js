export function validateSchema(schema) {

    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
     // console.log(error)
      if (error) {
        return res.sendStatus(400)
          // .send(error.details.map((detail) => detail.message));
      }
  
      next();
    };
    
  }