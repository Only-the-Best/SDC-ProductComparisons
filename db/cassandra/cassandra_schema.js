const ExpressCassandra = require("express-cassandra");

const models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ["127.0.0.1"],
    protocolOptions: { port: 9042 },
    keyspace: "products",
    queryOptions: { consistency: ExpressCassandra.consistencies.one }
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: "SimpleStrategy",
      replication_factor: 1
    },
    migration: "safe"
  }
});

const MyModel = models.loadSchema("Tents", {
  fields: {
    id: "int",
    imageURL: "text",
    title: "text",
    ranking: "decimal",
    reviews: "int",
    price: "int",
    sleepingCapacity: "text",
    packagedWeight: "text",
    numberOfDoors: "int",
    bestUse: "text",
    productType: "text"
  },
  key: ["id"]
});

// MyModel or models.instance.Person can now be used as the model instance
console.log(models.instance.Tents === MyModel);

// sync the schema definition with the cassandra database table
// if the schema has not changed, the callback will fire immediately
// otherwise express-cassandra will try to migrate the schema and fire the callback afterwards
MyModel.syncDB((err, result) => {
  if (err) throw err;
  // result == true if any database schema was updated
  // result == false if no schema change was detected in your models
  console.log('schema was changed', result);
});

const csvSeed = `COPY zillwoah FROM 'C:\\my1.csv' HEADER=FALSE`;

models.instance.schema.execute_query(csvSeed);