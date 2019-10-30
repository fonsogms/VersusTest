const express = require("express");
const router = express.Router();
const fdb = require("./fakedb");

router.get("/details/:id", (req, res) => {
  const search = req.params.id.split(",");

  fdb.findByName([...search], function(err, data) {
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "The item you are looking for doesnt not exist" });
    } else {
      res.json(data);
    }
  });
});

router.get("/home", (req, res) => {
  res.json(
    fdb.data.map(elem => {
      return elem.name;
    })
  );
});

module.exports = router;
