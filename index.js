const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool, Client, defaults } = require('pg')
var connectionString= "postgres://bjbeprivptfwwb:5f56e55e43ae9d0bbdad9c36de2b9ff762cef62ee3d7b2216668bbab2df59ae1@ec2-54-225-110-156.compute-1.amazonaws.com:5432/d5dbbtag1cmsop";

defaults.ssl = true;
/*
const pool = new Pool({
  connectionString: connectionString
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
*/




//const DATABASE_URL = process.env.DATABASE_URL || "";
//var connectionURL = "postgres://bjbeprivptfwwb:5f56e55e43ae9d0bbdad9c36de2b9ff762cef62ee3d7b2216668bbab2df59ae1@ec2-54-225-110-156.compute-1.amazonaws.com:5432/d5dbbtag1cmsop";

/*
pg.connect(connectionURL , function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM users', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
});
*/


let router = express.Router();
router.get('/getPerson/:id', async function(req, res, next) {
  const client = new Client({
    connectionString: connectionString,
  })
  await client.connect()
    client.query('SELECT * FROM person WHERE id = $1 LIMIT 1', [req.params.id], function(err, result) {
      console.log(result);
      client.end();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result.rows[0]);
    });
  // });
});
router.get('/getParents/:id', async function(req, res, next) {
  const client = new Client({
    connectionString: connectionString,
  })
  await client.connect()
    client.query('SELECT p.* FROM person p JOIN relationship ON child = p.id WHERE child = $1 LIMIT 1', [req.params.id], function(err, result) {
      console.log(result);
      client.end();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result.rows);
    });
});
router.get('/getChildren/:id', async function(req, res, next) {
  const client = new Client({
    connectionString: connectionString,
  })
  await client.connect()
    client.query('SELECT p.* FROM person p JOIN relationship ON parent = p.id WHERE parent = $1 LIMIT 1', [req.params.id], function(err, result) {
      console.log(result);
      client.end();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result.rows);
    });
});

// router.get('/getChildren/:id', async function(req, res, next) {
//   const client = new Client({
//     connectionString: connectionString,
//   })
//   await client.connect()
//     client.query('SELECT * FROM person WHERE id = $1 LIMIT 1', [req.params.id], function(err, result) {
//       console.log(result);
//       client.end();
//       if (err) {
//         return console.error('error running query', err);
//       }
//       res.send(result.rows[0]);
//     });
//   // });
// });
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/person', (req, res) => res.render('pages/person'))
  .use('/api/', router)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
