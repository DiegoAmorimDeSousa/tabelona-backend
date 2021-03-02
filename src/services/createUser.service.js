import User from '../models/user';

function createUserService(user){

  User(user)
      .save()
      .then(() => {
        console.log('user created');
      })
      .catch(err => console.log(err));
}

export default createUserService;
