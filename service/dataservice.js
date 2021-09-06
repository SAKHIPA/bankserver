const db = require('./db')


users = {
  1000: { userid: 1000, uname: "sakhi", pw: 1000, event: [] },
  1001: { userid: 1001, uname: "sali", pw: 1001, event: [] },
  1002: { userid: 1002, uname: "santhi", pw: 1002, event: [] }
}

const register = (userid, uname, pw) => {

  return db.User.findOne({ userid })
    .then(user => {
      if (user) {
        return {

          statuscode: 422,
          status: false,
          message: "user already exist.."
        }
      }
      else {
        const newUser = new db.User({
          userid,
          uname,
          pw,
          event: []
        })
        newUser.save()
        return {
          statuscode: 200,
          status: true,
          message: "successfully registered.."
        }


      }

    })

  // if (userid in users) {
  //   return {

  //   }
  // }
  // else {
  //   

  //   }
  //   console.log(users)

  //   return {
  //    
  //   }

  // }
}



const login = (req, userid, pw) => {
  return db.User.findOne({
    userid,
    pw

  }).then(user => {
    if (user) {
      req.session.currentid = user.userid

      return {
        statuscode: 200,
        status: true,
        message: "successfully log In..",
        userName:user.uname,
        currentid:user.userid

      }

    }
    return {

      statuscode: 422,
      status: false,
      message: "invalid user.."
    }


  })

}



// if (userid in users) {
//   if (pw == users[userid]["pw"]) {
//     currentUser = users[userid]["uname"]
//     req.session.currentid = userid


//     return {
//       statuscode: 200,
//       status: true,
//       message: "successfully log In.."
//     }

//   }
//   else {
//     return {

//       statuscode: 422,
//       status: false,
//       message: "invalid password.."
//     }

//   }

// }
// else {
//   return {

//     statuscode: 422,
//     status: false,
//     message: "invalid account.."
//   }

// }

const addEvent = (req, userid, event, date) => {
  return db.User.findOne({
    userid
  }).then(user => {
    if (!user) {
      return {

        statuscode: 422,
        status: false,
        message: "invalid id.."
      }
    }
    if (req.session.currentid != user.userid) {
      return {

        statuscode: 422,
        status: false,
        message: "invalid operation.."
      }
    }
    user.event.push({
      event: event,
      date: date
    })
    user.save()
    return {
      statuscode: 200,
      status: true,
      message: "Event is added successfully  .."
    }


  })
}

//   if (userid in users) {
//     users[userid].event.push({
//       event: event,
//       date: date
//     })

//     return {
//       statuscode: 200,
//       status: true,
//       message: "Event is added successfully  .."
//     }

//   }

//   else {
//     return {

//       statuscode: 422,
//       status: false,
//       message: "invalid action.."
//     }
//   }

// }
const listEvent = (userid) => {
  return db.User.findOne({
    userid
    //: req.session.currentid
  }).then(user => {
    if (user) {
      return {
        statuscode: 200,
        status: true,
        event: user.event
      }
    } else {
      return {

        statuscode: 422,
        status: false,
        message: "invalid action.."
      }
    }

    // return {
    //   statuscode: 200,
    //   status: true,
    //   event: users[req.session.currentid].event
    // }
  })
}

module.exports = {
  register,
  login,
  addEvent,
  listEvent
}
