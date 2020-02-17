let Realm = require('realm');
import Article from '../models/Article';
import Novel from '../models/Novel';
let schema = [Article.schema, Novel.schema];
let realmFactory = () => {
  return new Realm({
    schema: schema,
    schemaVersion: 4,
  });
};

export default realmFactory;
