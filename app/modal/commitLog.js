module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CommitLogSchema = new Schema({
		raw_id: {
			type: String,
			default: ''
		},
		status: {
			type: Boolean,
			default: 0
		},
		detail: {
			type: Object
		},
    commit_time: {
      type: Date,
      default: new Date(),
    },
  })
  
	return mongoose.model('CommitLog', CommitLogSchema)
};
