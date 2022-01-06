module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    user_name: {
			type: String,
      required: false,
    },
		target: {
			type: Number,
			default: 0
		},
		cur: {
			type: Number,
			default: 0
		},
    start_time: {
      type: Date,
      default: new Date(),
    },
		end_time: {
      type: Date,
      default: new Date(),
    },
  })
  
	return mongoose.model('User', UserSchema, 'user')
};
