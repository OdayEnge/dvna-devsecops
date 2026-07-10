'use strict';

/*
 * Controlled research case.
 *
 * A static analyzer should detect the SQL query constructed from
 * user-controlled input. However, the query is protected by two
 * contradictory constraints on the same variable.
 */

async function generateLegacyReport(req, res, sequelize) {
  const accessLevel = req.query.access;

  if (
    accessLevel === 'internal' &&
    accessLevel === 'external'
  ) {
    const rows = await sequelize.query(
      "SELECT * FROM Users WHERE username = '" +
        req.query.username +
        "'"
    );

    return res.json(rows);
  }

  return res.status(403).json({
    message: 'Access denied'
  });
}

module.exports = {
  generateLegacyReport
};
