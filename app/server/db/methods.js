const db = require('./index');
// a change
// database methods will go here then import into routes
/*
Users
 */

// method for inserting user info
// const createUser = async(req, res) => {
//   const {googleID, user, firsName, lastName, emails, image, zipcode } = req.body;
//   try {
//     await db.query(`INSERT INTO users (googleID, username, namefirst, namelast, email, imageurl, zip) VALUES ('${googleID}', '${user}', '${firsName}', '${lastName}', '${emails}', '${image}', '${zipcode}')`);
//     res.send({ message: 'user added' });
//   } catch (err) {
//     console.log('nah bruh', err);
//   }
// };

const createUser = (user) => {
  // const { username, lastname } = user;
  const {
    googleId, username, firstName, lastName, photo, email,
  } = user;
  db.query(`INSERT INTO users (googleID, username, nameFirst, nameLast, email, imageUrl) VALUES ('${googleId}', '${username}', '${firstName}', '${lastName}', '${email}', '${photo}')`);
};
const getUser = (id) => {
  return db.query(`SELECT * FROM users WHERE googleid = '${id}'`);
};

// method that gets  particular users info
// const getUser = async(req, res) => {
//   try {
//     const user = await db.one(`SELECT * FROM user WHERE id = ${req.params.id}`);
//     res.send(user);
//   } catch (err) {
//     console.log(`no user, ${err}`);
//   }
// };
// method that gets all the users info
const getAllUser = async(req, res) => {
  try {
    const users = await db.any('SELECT * FROM users');
    res.send(users);
  } catch (err) {
    console.log(`no users, ${err}`);
  }
};

/*
Events
 */

const createEvent = async(req, res) => {
  try {
    await db.query('INSERT INTO event (topic, date, time, users_id, classLimit) VALUES ( ${topic}, ${date}, ${time}, ${user_id}, ${classLimit})', req.body);
    res.send({ message: 'event added' });
  } catch (err) {
    console.log('nah bruh', err);
  }
};

const getAllEvents = async(req, res) => {
  try {
    const events = await db.any('SELECT * FROM event');
    res.send(events);
  } catch (err) {
    console.log(`no events, ${err}`);
  }
};

const getEventbyUser = async(req, res) => {
  try {
    const userEvents = await db.any(`SELECT * FROM event where users_id = ${req.params.id}`);
    res.send(userEvents);
  } catch (err) {
    console.log(`this user is boring, ${err}`);
  }
};

/*
Topic
 */

const createTopic = async(req, res) => {
  try {
    await db.query('INSERT INTO topic (name) VALUES (${name})', req.body);
    res.send('it worked');
  } catch (err) {
    console.log('nah', err);
  }
};
// method that get from topic
const getTopic = async(req, res) => {
  try {
    const topic = await db.any(`SELECT * FROM topic WHERE users_id = ${req.param.id} `);
    res.send(topic);
  } catch (err) {
    console.log(`they not ready for this knowledge, ${err}`);
  }
};

// get topics a user likes
const getTopicByUser = async(req, res) => {
  try {
    const userTopics = await db.any(`SELECT * FROM topic WHERE user_id = ${req.params.id}`);
    res.send(userTopics);
  } catch (err) {
    console.log(`no user topics, ${err}`);
  }
};

/*
Document
*/

const addDocument = async(req, res) => {
  try {
    await db.query('INSERT INTO document (documentType, linkTo, users_id, event_id) VALUES (${type} ${link} ${user_id} ${event_id})', req.body);
    res.send('we added a document');
  } catch (err) {
    console.log('got documents', err);
  }
};

const getAllDocument = async(req, res) => {
  try {
    const documents = await db.any('SELECT * FROM document');
    res.send(documents);
  } catch (err) {
    console.log('No document', err);
  }
};

const getEventDocument = async(req, res) => {
  try {
   // may need an inner join to also get the username in the users table where users_id = in the event table
    const eventDocuments = await db.any(`SELECT * FROM event WHERE event_id =${req.params.id}`);
    res.send(eventDocuments);
  } catch (err) {
    console.log(`No Docsr, ${err}`);
  }
};

/*
Binder
*/

const addToBinder = async(req, res) => {
  try {
    await db.query('INSERT INTO binder (user_id, document_id) (${user_id}, ${document_id})', req.body);
    res.send('it worked');
  } catch (err) {
    console.log('nah', err);
  }
};
// method that get from topic
const getUserBinder = async(req, res) => {
  try {
    const userBinder = await db.any(`SELECT * FROM binder WHERE users_id =${req.params.id}`);
    res.send(userBinder);
  } catch (err) {
    console.log(`No Binder, ${err}`);
  }
};

/*
Flash_Cards
 */
// method that insert into Flash Cards
// method that get from Flach Cards

/*
Flash card packs
 */
// method that insert into Flash Card Pack
// method that get from Flash Card Pack

module.exports = {
  createEvent,
  getAllEvents,
  getAllUser,
  getUser,
  createUser,
  createTopic,
  getTopic,
  getTopicByUser,
  getEventbyUser,
  addDocument,
  getAllDocument,
  addToBinder,
  getUserBinder,
  getEventDocument,
};
