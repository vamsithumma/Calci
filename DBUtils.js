import { db } from './database';

const fetchData = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM items;', [], (_, { rows }) => {
      callback(rows._array);
      //console.log("fetched");
    });
  });
};


const addItem = (text, callback) => {
  //console.log("came to added");
  db.transaction(tx => {
    tx.executeSql('INSERT INTO items (text) VALUES (?);', [text], () => {
      fetchData(callback);
      //console.log("added");
    });
  });
};

const updateItem = (id, newText, callback) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE items SET text = ? WHERE id = ?;', [newText, id], () => {
      fetchData(callback);
    });
  });
};

const deleteItem = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM items WHERE id = ?;', [id], () => {
      fetchData(callback);
      //console.log("deleted");
    });
  });
};

export {fetchData, addItem, updateItem, deleteItem };
