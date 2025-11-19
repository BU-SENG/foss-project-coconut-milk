import path from 'path';
import { fileURLToPath } from 'url';
import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFile = path.join(__dirname, 'data.json');

const defaultData = {
  users: [],
  skills: [],
  sessions: [],
  activity: []
};

const adapter = new JSONFileSync(dataFile);
const db = new LowSync(adapter, defaultData);

db.read();
db.data ||= defaultData;

export const saveDb = () => {
  db.write();
};

export const loadDb = () => {
  db.read();
  return db.data;
};

export default db;

