const users = (userNick, fullName, email, phone, address, password,role) => (
  querys = {
  createTable: 
    `CREATE TABLE IF NOT EXISTS users (
      id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      userNick VARCHAR(20) NOT NULL UNIQUE,
      fullName VARCHAR(80) NOT NULL,
      email VARCHAR(60) NOT NULL,
      phone VARCHAR(15) NOT NULL,
      address VARCHAR(80) NOT NULL,
      password CHAR(100) NOT NULL,
      role VARCHAR(10) NULL DEFAULT 'user'
    )`,
  deleteTable: 
    `DROP TABLE IF EXISTS users;`,
  setUser: 
    `INSERT INTO users (
      userNick, 
      fullName, 
      email, 
      phone, 
      address, 
      password,
      role) 
    VALUES (
      '${userNick}',
      '${fullName}',
      '${email}',
      '${phone}',
      '${address}',
      '${password}',
      '${role}'
    )`,
  getOne: 
    `SELECT * FROM users 
    WHERE email = '${email}'
    OR userNick = '${userNick}'`
});

module.exports = { users };