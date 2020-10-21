const { validationResult } = require("express-validator");

const logger = require("../util/logger");

module.exports = {
  getLedger: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.error("Validation Error", errors);
        return res.status(400).send("Missing required parameters");
      }

      logger.debug("Fetched ledger details", {});

      return res.json({});
    } catch (error) {
      logger.error("Error occurred while fetching product details", error);
      return res.status(500).send("Error occurred while processing");
    }
  },
};
