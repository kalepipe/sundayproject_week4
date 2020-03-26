// const mongoose = require("mongoose")

// const postSchema = new mongoose.Schema({
//   _id: mongoose.Types.ObjectId,

//   title: {
//     type: String,
//     required: true,
//   },

//   content: {
//     type: String,
//     required: true,
//   },

//   date: {
//     type: Date,
//     default: Date.now,
//   },
// })

// //스키마 사용해서 모델을 만들기
// module.exports = mongoose.model("Post", postSchema)

// //이름은 자동으로 posts가 되고, db에 post collection이 있으면 자동으로 연결되고, 아니면 새롭게 만든다.

// //이 부분은 controller에 작성되는 부분, 컨트롤러에 로직을 요청하는 곳은 '라우터'다
// const postDocument = new Post({
//   _id: new mongoose.Types.ObjectId(),
//   title: "첫 글",
//   content: "내용을 입력하세요",
// })
// postDocument.save()
