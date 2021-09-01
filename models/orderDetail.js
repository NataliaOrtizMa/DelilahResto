const orderDetail = (orderId, dishId, detailId) => ({
  deleteTable: 
    `DROP TABLE IF EXISTS orderDetail;`,
  createTable:
    `CREATE TABLE IF NOT EXISTS orderDetail (
      id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      orderId INT(10) UNSIGNED NOT NULL,
      dishId INT(10) UNSIGNED NOT NULL,
      FOREIGN KEY (orderId) REFERENCES orderHistory (id),
      FOREIGN KEY (dishId) REFERENCES dishes (id)
    )`,
  setDetail:
    `INSERT INTO orderDetail (
      orderId, 
      dishId) 
    VALUES (
      '${orderId}',
      '${dishId}'
    )`,
  getOne: 
    `SELECT * FROM orderDetail
    WHERE id = '${detailId}'`,
  // getAll: "SELECT * FROM orderDetail",
  getAll: 
    `SELECT orderDetail.id as id,
            dishes.dishName as dishName,
            dishes.unitPrice as unitPrice,
            dishes.urlImage as urlImage
    FROM orderDetail
      JOIN dishes
        ON orderDetail.dishId = dishes.id 
    WHERE orderId = '${orderId}'`,
  deleteDetail: 
    `DELETE FROM orderDetail
    WHERE id = '${detailId}'`,
  deleteFromHistory:
    `DELETE FROM orderDetail
    WHERE id = '${orderId}'`,
  });
  
  module.exports = { orderDetail };
  