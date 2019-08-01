const {FindOne, Insert, Update} = require("./dbHelper.js");


// Insert({email: 'test', hash: 'testhash'}).then(a=>{
//     console.log(a);
// });

// FindOne({email: 'test'}).then(a=>{
//     console.log(a);
// });

// Update({email: 'test'}, {$set : { hash : "vccv"}}).then(a=>{
//     console.log(a);
// });

FindOne({email: 'ffdfdfdf'}).then(a=>{
    console.log(a);
});