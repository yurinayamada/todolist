$(loaded);

function loaded() {
  showText();
  $("#formButton").click(
    function() {
      saveText();
      showText();
    });
}

function saveText() {
  var text = $("#formText");
  var time = new Date();
  var val = text.val();
  if(checkText(val)) {
    localStorage.setItem(time, val);
    text.val("");
  }
}

function showText() {
  var list = $("#list");
  list.children().remove();
  var key, value, html = [];
  for(var i=0, len=localStorage.length; i<len; i++) {
    key = localStorage.key(i)
    value = localStorage.getItem(key);
    html.unshift($("<li>").html(escapeText(value)));
  }
  list.append(html);
}

function escapeText(text) {
  var TABLE_FOR_ESCAPE_HTML = {
    "&": "&amp;",
    "\"": "&quot;",
    "<": "&lt;",
    ">": "&gt;"
  };
  return text.replace(/[&"<>]/g, function(match) {
    return TABLE_FOR_ESCAPE_HTML[match];
  });
}

function checkText(text) {
  if (0 === text.length || 20 < text.length) {
    alert("文字数は1〜20字にしてください");
    return false;
  }

  var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    if (text === value) {
      alert("同じ内容は避けてください");
      return false;
    }
  }

  return true;
}
