const SERVER_API = "http://185.110.189.127/";
const urlGoSha32 = "http://185.110.189.127/go/sha256";
const urlNodeSha32 = "http://185.110.189.127/node/sha256";
const urlGoWrite = "http://185.110.189.127/go/write";
const urlNodeWrite = "http://185.110.189.127/node/write";

/////////////////resat///////////////

function reset_inputs() {
  $("#firstNumber").val("");
  $("#secondNumber").val("");
  $("#write").val("");
}

////////////////////////////////
//////////ajax requests/////////
////////////////////////////////

$(document).ready(function () {
  $("#go-sha32").on("click", function () {
    $.getJSON({
      method: "POST",
      url: urlGoSha32,
      dataType: "json",
      contentType: "application/json;charset=UTF-8",
      data: JSON.stringify($("form-sha32").serializeArray()),
    })
      .done(function (response) {
        reset_inputs();
        $(".correct-sha32").appendTo("sha256 :" + response.result);
      })
      .fail(function (e) {
        $(".false-sha32").appendTo(e);
      });
  });

  $("#nodejs-sha32").on("click", function () {
    $.getJSON({
      method: "POST",
      url: urlNodeSha32,
      dataType: "json",
      contentType: "application/json;charset=UTF-8",
      data: JSON.stringify($("form-sha32").serializeArray()),
    })
      .done(function (response) {
        reset_inputs();
        $(".correct-sha32").appendTo("sha256 :" + response.result);
        alert(response);
      })
      .fail(function (e) {
        $(".false-sha32").appendTo(e);
        alert(e);
      });
  });

  $("#nodejs-write").on("click", function () {
    $.getJSON({
      method: "POST",
      url: urlNodeWrite,
      dataType: "json",
      contentType: "application/json;charset=UTF-8",
      data: JSON.stringify($("form-write").serializeArray()),
    })
      .done(function (response) {
        reset_inputs();
        $(".correct-write").appendTo("write :" + response.result);
        alert(response);
      })
      .fail(function (e) {
        $(".false-write").appendTo(e);
        alert(e);
      });
  });

  $("#go-write").on("click", function () {
    $.getJSON({
      method: "POST",
      url: urlGoWrite,
      dataType: "json",
      contentType: "application/json;charset=UTF-8",
      data: JSON.stringify($("form-write").serializeArray()),
    })
      .done(function (response) {
        reset_inputs();
        $(".correct-write").appendTo("write :" + response.result);
        alert(response);
      })
      .fail(function (e) {
        $(".false-write").appendTo(e);
        alert(e);
      });
  });
});
