var global_values = {
  pre_result : 0,
  has_curr_result : false,
  can_all_clear : true, //可以全清除
  all_numbers : new Array(),
  all_operators : new Array()
}

function changeFontsize(str_number) {
  var n_number = str_number.replace('.', '').replace(/,/g, '').length;
  var n_point = 0;
  var str_temp = str_number;
  while (str_temp.indexOf(',') != -1) {
    n_point += 1;
    var index = str_temp.indexOf(',');
    str_temp = str_temp.substr(index + 1, str_temp.length - 1 - index);
  }
  if(str_number.indexOf('.') != -1) {
    n_point += 1;
  }
  switch (n_number) {
    case 6: 
      if(n_point == 2) {
        document.getElementById("monitor").style.fontSize = "73px";
      }
      else {
        document.getElementById("monitor").style.fontSize = "77px";
      }
      break;
    case 7: 
      if(n_point == 3) {
        document.getElementById("monitor").style.fontSize = "59px";
      }
      if(n_point == 1) {
        document.getElementById("monitor").style.fontSize = "66px";
      }
      else {
        document.getElementById("monitor").style.fontSize = "63px";
      }
      break;
    case 8: 
      if(n_point == 3) {
        document.getElementById("monitor").style.fontSize = "53px";
      }
      if(n_point == 1) {
        document.getElementById("monitor").style.fontSize = "58px";
      }
      else {
        document.getElementById("monitor").style.fontSize = "56px";
      }
      break;
    case 9: 
      if(n_point == 3) {
        document.getElementById("monitor").style.fontSize = "48px";
      }
      if(n_point == 1) {
        document.getElementById("monitor").style.fontSize = "52px";
      }
      else {
        document.getElementById("monitor").style.fontSize = "50px";
      }
      break;
    default:
      document.getElementById("monitor").style.fontSize = "80px";
      break;
  }
}

function addComma(new_number) {
  var index_of_point = new_number.indexOf('.');
  var length_of_integer;
  var temp_number = new_number;
  if(index_of_point == -1) {
    length_of_integer = new_number.length;
  }
  else {
    length_of_integer = index_of_point;
  }
  if(length_of_integer > 3 && length_of_integer < 7) {
    temp_number = new_number.substr(0, length_of_integer - 3) + ',' + 
        new_number.substr(length_of_integer - 3, 3) + 
        new_number.substr(length_of_integer, new_number.length - length_of_integer);
  }
  else if(length_of_integer > 6) {
    temp_number = new_number.substr(0, length_of_integer - 6) + ',' + 
        new_number.substr(length_of_integer - 6, 3) + ',' + 
        new_number.substr(length_of_integer - 3, 3) + 
        new_number.substr(length_of_integer, new_number.length - length_of_integer);
  }
  return temp_number;
}

function inputNumber(number) {
  var view = document.getElementById("view");
  var now_number = view.innerText.replace(/,/g, '');
  var new_number = now_number;
  if(now_number.replace('.', '').length < 9) {
    if(now_number.length > 1) {
      if(number === '.') {
        if(now_number.indexOf('.') == -1) {
          new_number = now_number.concat(number);
        }
      }
      else {
        new_number = now_number.concat(number);
      }
    }
    else {
      if(number === '.') {
        new_number = now_number.concat(number);
        document.getElementById("clear").innerText = "C";
        global_values.can_all_clear == false;
      }
      else {
        if(now_number === '0') {
          new_number = number;
          document.getElementById("clear").innerText = "C";
          global_values.can_all_clear == false;
        }
        else {
          new_number = now_number.concat(number);
        }
      }
    }
  }
  view.innerText = addComma(new_number);
  changeFontsize(view.innerText);
}

function clearScreen() {
  document.getElementById("clear").innerText = "AC";
  document.getElementById("view").innerText = "0";
  document.getElementById("monitor").style.fontSize = "80px";
  if(global_values.can_all_clear) {
    global_values.pre_result = 0;
  }
  else {
    global_values.can_all_clear == true;
  }
}

function calculate(operator) {
  
}

function getResult(operator) {
  var view = document.getElementById("view");
  var str_curr_number = view.innerText.replace(/,/g, '');
  global_values.pre_result = parseFloat(str_curr_number);
}