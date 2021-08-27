const favoriteDish = (userId, dishId) => ({
    createTable: 
      `CREATE TABLE IF NOT EXISTS favoriteDish (
        id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userId INT(10) UNSIGNED NOT NULL,
        dishId INT(10) UNSIGNED NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id),
        FOREIGN KEY (dishId) REFERENCES dishes (id)
        )`,
    deleteTable: 
      `DROP TABLE IF EXISTS favoriteDish;`,
    setValues: 
      `INSERT INTO favoriteDish (
        userId, 
        dishId) 
      VALUES (
        '${userId}',
        '${dishId}'
      )`,
    getOne: 
      `SELECT * FROM favoriteDish 
      WHERE userId = '${userId}'
      AND dishId = '${dishId}'`,
    getAll: 
    `SELECT favoriteDish.dishId as id,
            dishes.dishName as dishName, 
            dishes.unitPrice as unitPrice, 
            dishes.urlImage as urlImage
    FROM favoriteDish 
      JOIN dishes 
        ON favoriteDish.dishId = dishes.id 
    WHERE userId = '${userId}'`,
    deleteDish: 
      `DELETE FROM favoriteDish
      WHERE id = '${dishId}'`,
  });
  
  module.exports = { favoriteDish };
  