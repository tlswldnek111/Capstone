function Update_data(result) {
    var column = [];
    var row = {};
    var data = [];
    for (let i of result.metaData) {
      column.push(i['name']);
    }
    for (let i = 0; i < result.rows.length; i++) {
      for (let j = 0; j < column.length; j++) {
        row[column[j]] = result.rows[i][j];
      }
      data.push(row);
      row = {};
    }
    return data;
  }

  module.exports.Update_data = Update_data;