import {CosmosClient} from '@azure/cosmos';

const containerName = `tutorial-cosmos-container`;
const cosmosString = process.env.COSMOSDB_CONNECTION_STRING;