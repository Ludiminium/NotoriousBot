const settings = require('../config/private.json')
module.exports = {
  isAdmin: function (client, message, args, argresult ) {
   var i = 0
   for(i;i < settings.admins.length; i++) {
     if (message.author.id === settings.admins[i]) return true
   } return false
 }
}
