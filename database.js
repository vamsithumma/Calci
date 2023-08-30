import * as SQLite from 'expo-sqlite';

const dbname="asdf.db"
const db = SQLite.openDatabase(dbname);
//console.log("opened:",dbname)

// Create a table

db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT);'
  );
  //console.log("table created")
});

export { db };
