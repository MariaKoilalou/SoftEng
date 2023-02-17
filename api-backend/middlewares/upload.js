const multer = require("multer");

// const csvFilter = (req, file, cb) => {
//     if (file.mimetype.includes("csv") || file.mimetype.includes("json")) {
//         cb(null, true);
//     } else {
//         cb("Please upload only csv or json files.", false);
//     }
// };

const jsonFilter = (req, file, cb) => {
    if (file.mimetype.includes("json")) {
      cb(null, true);
    } else {
      cb("Please upload only JSON files.", false);
    }
  };

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

var uploadFile = multer({ storage: storage, fileFilter: jsonFilter });
module.exports = uploadFile;