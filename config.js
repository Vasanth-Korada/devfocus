const config = {
    endpoint: "https://vasanth.documents.azure.com:443/",
    key: "tEFgWf5Ypo7WHVjJVPXiLkY1katLQZutVVHTJdCBN6wHyCQcMgvHLb3AdUzGWdwn337vT0SG5gi1at6v7EEDJw==",
    databaseId: "Tasks",
    containerId: "Items",
    partitionKey: { kind: "Hash", paths: ["/category"] }
  };
  
  module.exports = config;