
exports.dbConn = (db, initial) => {
    db.sequelize.sync({ force: true })
    .then(() => {
        initial();
        console.log("Drop and Resync Db");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });
};