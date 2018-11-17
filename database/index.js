const models = require("express-cassandra");
const path = require("path");

models.setDirectory(path.join(__dirname, "/models")).bind(
  {
    clientOptions: {
      contactPoints: ["34.219.82.131"],
      protocolOptions: { port: 9042 },
      keyspace: "products",
      queryOptions: { consistency: models.consistencies.one }
    },
    ormOptions: {
      defaultReplicationStrategy: {
        class: "SimpleStrategy",
        replication_factor: 1
      },
      migration: "safe"
    }
  },
  err => {
    if (err) throw err;
  }
);
