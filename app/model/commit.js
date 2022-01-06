module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CommitSchema = new Schema({
		raw_id: {
			type: String,
			default: ''
		},
		status: {
			type: Boolean,
			default: false
		},
		detail: {
			type: Object
		},
    commit_time: {
      type: Date,
      default: new Date(),
    },
  })
  
	return mongoose.model('Commit', CommitSchema, 'commit')
};
