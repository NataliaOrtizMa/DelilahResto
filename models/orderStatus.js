const orderStatus = () => ({
    createTable: 
      `CREATE TABLE IF NOT EXISTS orderStatus (
        id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        status VARCHAR(10) NOT NULL
        )`,
    deleteTable: 
      `DROP TABLE IF EXISTS orderStatus;`,
    setValues: 
      `INSERT INTO orderStatus (status) 
      VALUES ('nuevo'), ('confirmado'), ('preparando'), ('enviando'), ('cancelado'), ('entregado')`,
  });
  
  module.exports = { orderStatus };