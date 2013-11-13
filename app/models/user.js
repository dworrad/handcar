var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');
    fs = require('fs');

// Bootstrap helpers
var helpers_path = __dirname + '/../../code/helpers'
var helpers_files = fs.readdirSync(helpers_path)
helpers_files.forEach(function(file){
    require(helpers_path+'/'+file)
})

var userSchema = new mongoose.Schema({
  orgid: String,
  email: { type: String, index: { unique: true }},
  hash: String,
  organisation: String,
  phone: String,
  profile: {
      first: String,
      last: String
  },
  country: String,
  passwordresetkey : String,
  activationkey : String,
  active      : Boolean
});

userSchema.statics.registerUser = function(email, password, cb) {
    var Model = this;

    bcrypt.hash(password, 8, function(err, hash) {
        var user = new Model({ email:email.trim(), hash:hash});
        var activationkey = guid()
        user.activationkey = activationkey

        user.save(function (err) {

            var data = {
                activationkey:  user.activationkey
            }

            sendemail(user.email, templates.Activate.Subject, data, templates.Activate.File, function(result){
                console.log(result);
            })

            cb(err, user)
        })

    });
};

userSchema.methods.validPassword = function(password, cb) {
  bcrypt.compare(password, this.hash, function(err, same) {
      cb(!err && same);
  });
};

userSchema.methods.activate = function(cb) {
  console.log("About to activate user...")
  this.active = true
  this.save(function(err){
    cb()
  })
};

userSchema.methods.isActive = function(password, cb) {
  console.log("About to check if Valid Password...")
  if(this.active){
    cb(true)
  }
  else{
    console.log("Not active...")
    cb(false)
  }
};

userSchema.methods.update = function(phone, firstname, lastname, cb) {
  this.phone = phone
  this.name.first = firstname
  this.name.last = lastname
  this.save(function(err){
    cb(err)
  })
};

module.exports = User = mongoose.connection.model('User', userSchema);
