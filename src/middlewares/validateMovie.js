// in middlewares/validateMovie.js

const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;
    const errors = [];
  
    if (title === undefined) {
        errors.push({ field: "title", message: "This field is required" });
      } else if (title.length >= 255) {
        errors.push({ field: "title", message: "Should contain less than 255 characters" });
      }
    if (director === undefined) {
      errors.push({ field: "director", message: "This field is required" });
    }
    if (year === undefined) {
      errors.push({ field: "year", message: "This field is required" });
    }
    if (color === undefined) {
      errors.push({ field: "color", message: "This field is required" });
    }
    if (duration === undefined) {
      errors.push({ field: "duration", message: "This field is required" });
    }
   
    if (errors.length) {
      res.status(422).json({ validationErrors: errors });
    } else {
      next();
    }
  };
  
  
  module.exports = validateMovie;
  
  
