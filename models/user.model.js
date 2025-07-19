import pool from "./db.js";

export const createUser = async (data) => {
  const {
    employee_name,
    vertical,
    department,
    level,
    state_country,
    site,
    reporting_authority,
    designation,
    contact_no,
    email,
    password,
  } = data;

  const result = await pool.query(
    `
    INSERT INTO users (
      employee_name, vertical, department, level,
      state_country, site, reporting_authority,
      designation, contact_no, email, password
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *`,
    [
      employee_name,
      vertical,
      department,
      level,
      state_country,
      site,
      reporting_authority,
      designation,
      contact_no,
      email,
      password,
    ]
  );

  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return result.rows[0];
};
