const express = require("express");
const router = express.Router();
const fdb = require("./fakedb");

router.get("/details/:id", (req, res) => {
  const search = req.params.id.split(",");

  //THERE WAS ONLY NEED TO USE ONE OF THE FUNCTIONS AS THE USER CAN ONLY SELECT NAMES AND NOT NAME_URLS.

  fdb.findByName([...search], function(err, data) {
    //I ADDED CONDITION TO SEND A MESSAGE IN CASE THERE IS NOTHING FOUND WITH A STATUS 404
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "The item you are looking for doesnt not exist" });
    } else {
      res.json(data);
    }
  });
});

//THIS ROUTE IS TO GET ALL THE DATA FROM THE DB AND SEND SUGGESTIONS TO THE USER WHILE HE IS SEARCHING
router.get("/home", (req, res) => {
  res.json(
    fdb.data.map(elem => {
      return elem.name;
    })
  );
});

module.exports = router;
