const express = require("express");
const path = require("path");
const uniqid = require("uniqid");
const { readDB, writeDB } = require("../library/utilities.js");

const { validationResult } = require("express-validator");

const router = express.Router();

const reviewsFilePath = path.join(__dirname, "reviews.json");

router.get("/:id", async (req, res, next) => {
  try {
    const reviewDB = await readDB(reviewsFilePath);
    const product = reviewDB.filter((product) => product.ID === req.params.id);
    if (product.length > 0) {
      res.send(product);
    } else {
      const err = new Error();
      err.httpStatusCode = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const reviewDB = await readDB(reviewsFilePath);
    //console.log(reviewDB)
    if (req.query && req.query.name) {
      const filteredproducts = reviewDB.filter(
        (product) =>
          product.hasOwnProperty("name") &&
          product.name.toLowerCase() === req.query.name.toLowerCase()
      );
      res.send(filteredproducts);
    } else {
      res.send(reviewDB);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error();
      err.message = errors;
      err.httpStatusCode = 400;
      next(err);
    } else {
      const reviewDB = await readDB(reviewsFilePath);
      const newReview = {
        ...req.body,
        elementId: uniqid(),
        modifiedAt: new Date(),
      };

      reviewDB.push(newReview);

      await writeDB(reviewsFilePath, reviewDB);

      res.status(201).send({ elementId: newReview.elementId });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const reviewDB = await readDB(reviewsFilePath);
    const newDb = reviewDB.filter((review) => review.ID !== req.params.id);
    await writeDB(reviewsFilePath, newDb);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const reviewDB = await readDB(reviewsFilePath);
    const newDb = reviewDB.filter((product) => product.ID !== req.params.id);

    const modifiedproduct = {
      ...req.body,
      elementId: req.params.id,
      modifiedAt: new Date(),
    };

    newDb.push(modifiedproduct);
    await writeDB(reviewsFilePath, newDb);

    res.send({ elementId: modifiedproduct.elementId });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
