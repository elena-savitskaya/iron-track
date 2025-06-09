declare global {
  var _mongoClientPromise: Promise<import("mongodb").MongoClient>;
}
