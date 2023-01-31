var count = 0;

$("#send-answer").on("click", function () {
  count++;
  var 유저답안 = $("#answer").value;
  if (유저답안 == "1335") {
    console.log("성공");
  } else if (count >= 3 && 유저답안 != "1335") {
    console.log("ㅋ");
  }
});
