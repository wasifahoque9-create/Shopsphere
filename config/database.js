const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const bcrypt = require('bcryptjs');
const path = require('path');

const adapter = new FileSync(path.join(__dirname, '../database.json'));
const db = low(adapter);


db.defaults({ users: [] }).write();


const adminExists = db.get('users').find({ role: 'admin' }).value();
if (!adminExists) {
  db.get('users').push({
    id: 1,
    name: 'Admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    created_at: new Date().toISOString()
  }).write();
  console.log('✅ Default admin created → email: admin@admin.com | password: admin123');
}

module.exports = db;
