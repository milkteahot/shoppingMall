const express = require("express");
const router = express.Router();

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

var upload = multer({ storage: storage });

router.post("/image", (req, res) => {
  //가져온 이미지를 저장
  upload(req, res, err => {
      if(err) {
          return req.json({ sucess: false, err })
      } 
      return res.json({ sucess: this.true, filePath: res.req.file.path , fileName: res.req.file.filename })
  })
});

module.exports = router;
