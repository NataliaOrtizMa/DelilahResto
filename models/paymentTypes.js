const paymentTypes = () => ({
    createTable: 
      `CREATE TABLE IF NOT EXISTS paymentTypes (
        id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        paymentType VARCHAR(10) NOT NULL
        )`,
    deleteTable: 
      `DROP TABLE IF EXISTS paymentTypes;`,
    setValues: 
      `INSERT INTO paymentTypes (paymentType) 
      VALUES ('Efectivo'), ('Tarjeta')`,
  });
  
  module.exports = { paymentTypes };
  