import pool from "./db.js";

export const createIndent = async (user_id, indent_number, lead, transport) => {
  const result = await pool.query(
    `
    INSERT INTO indents (user_id, indent_number, lead_time_days, transportation_time_days)
    VALUES ($1, $2, $3, $4) RETURNING *`,
    [user_id, indent_number, lead, transport]
  );

  return result.rows[0];
};

export const addItemsToIndent = async (indent_id, items) => {
  const queries = items.map((item) =>
    pool.query(
      `
      INSERT INTO indent_items (indent_id, item_name, unit, quantity)
      VALUES ($1, $2, $3, $4)`,
      [indent_id, item.item_name, item.unit, item.quantity]
    )
  );
  await Promise.all(queries);
};

export const getIndentsByUser = async (user_id) => {
  const result = await pool.query(
    `
    SELECT * FROM indents WHERE user_id = $1 ORDER BY timestamp DESC`,
    [user_id]
  );
  return result.rows;
};
