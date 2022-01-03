module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ProblemSchema = new Schema({
    leetcode_id: {
			type: String,
      required: false,
    },
		title: {
			type: String,
			default: ''
		},
		difficulty: {
			type: String,
			default: ''
		},
		tags: {
			type: Array,
			default: []
		},
    updated_time: {
      type: Date,
      default: new Date(),
    },
  })
  
	return mongoose.model('Problem', ProblemSchema)
};
