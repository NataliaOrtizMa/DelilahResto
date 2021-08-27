const orderHistory = (userId, statusId, paymentId, orderId) => ({
  deleteTable: 
    `DROP TABLE IF EXISTS orderHistory;`,
  createTable: 
    `CREATE TABLE IF NOT EXISTS orderHistory (
      id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      orderDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      userId INT(10) UNSIGNED NOT NULL,
      statusId INT(10) UNSIGNED NOT NULL DEFAULT 1,
      paymentId INT(10) UNSIGNED NOT NULL DEFAULT 1,
      FOREIGN KEY (userId) REFERENCES users (id),
      FOREIGN KEY (statusId) REFERENCES users (id),
      FOREIGN KEY (paymentId) REFERENCES paymentTypes (id)
    )`,
  setHistory: 
    `INSERT INTO orderHistory (
      userId) 
    VALUES (
      '${userId}'
    )`,
  updateHistory:
    `UPDATE orderHistory
    SET userId = '${userId}', 
      statusId = '${statusId}', 
      paymentId = '${paymentId}' 
    WHERE id = '${orderId}'`,
  getOne: 
  `SELECT orderHistory.orderDate as date,
          orderHistory.id as id,
          paymentTypes.paymentType as paymentType,
          orderStatus.status as status,
          users.fullName as fullName,
          users.userNick as userNick,
          users.email as email,
          users.phone as phone,
          users.address as address
    FROM orderHistory
      JOIN paymentTypes 
        ON orderHistory.paymentId = paymentTypes.id
      JOIN orderStatus 
        ON orderHistory.statusId = orderStatus.id
      JOIN users
        ON orderHistory.userId = users.id
    WHERE orderHistory.id = '${orderId}'`,
  getAll: 
    `SELECT orderHistory.orderDate as date,
            orderHistory.id as id,
            paymentTypes.paymentType as paymentType,
            orderStatus.status as status,
            users.fullName as fullName,
            users.address as address
      FROM orderHistory
        JOIN paymentTypes 
          ON orderHistory.paymentId = paymentTypes.id
        JOIN orderStatus 
          ON orderHistory.statusId = orderStatus.id
        JOIN users
          ON orderHistory.userId = users.id`,
  deleteHistory: 
    `DELETE FROM orderHistory
    WHERE id = '${orderId}'`,
});

module.exports = { orderHistory };
