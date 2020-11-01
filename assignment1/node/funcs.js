const fs = require("fs");
const qs = require("querystring");
const url = require("url");

function SHA256(req, res) {
  if (req.method === "POST") {
    let body = "";

    req.on("data", function (data) {
      body += data;

      if (body.length > 1e6) req.connection.destroy();
    });

    req.on("end", function () {
      const post = qs.parse(body);
      post["firstNumber"] = Number(post["firstNumber"]);
      post["secondNumber"] = Number(post["secondNumber"]);
      if (post["firstNumber"] && post["secondNumber"]) {
        let result = post["firstNumber"] + post["secondNumber"];
        res.end(
          JSON.stringify({
            result: require("crypto")
              .createHash("sha256")
              .update(String(result))
              .digest("hex"),
          })
        );
        return;
      }
      res.end("input is not a number!");
    });
  } else if (req.method === "GET") {
    fs.createReadStream("sha256_form.html").pipe(res);
  }
}

function Write(req, res) {
  if (req.method === "GET") {
    let number = url.parse(req.url, true).query.write;

    if (!number) fs.createReadStream("write_form.html").pipe(res);
    else {
      number = Number(number);
      if (!number || number < 1 || number > 100)
        res.end("invalid number, pls try again.");
      else {
        var lineReader = require("readline").createInterface({
          input: require("fs").createReadStream("../file.txt"),
        });
        let i = 0;
        lineReader.on("line", function (line) {
          i++;

          if (i === number) {
            lineReader.close();
            res.end(line);
          }
        });
      }
    }
  }
}

module.exports.SHA256 = SHA256;
module.exports.Write = Write;
