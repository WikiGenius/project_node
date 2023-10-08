const fs = require('fs').promises; // Use promises version of fs

exports.readJsonFile = async file => {
  try {
    const data = await fs.readFile(file, 'utf-8');
    const tours = JSON.parse(data);
    return tours;
  } catch (err) {
    console.error(err);
    throw new Error('Server Error');
  }
};

exports.writeJsonFile = async (file, tours) => {
  try {
    await fs.writeFile(file, JSON.stringify(tours, null, 2));
  } catch (err) {
    throw err;
  }
};
