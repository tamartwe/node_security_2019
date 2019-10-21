var RateLimit = require('express-rate-limit');
var RedisStore = require('rate-limit-redis');
 
var limiter = new RateLimit({
  store: new RedisStore({
    // see Configuration
  }),
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the 
             // max limit is reached
});
 
//  apply to all requests
app.use(limiter);