var global_values = {
  pre_result : 0,
  can_add_operator: true,
  is_new_number : false,//输入新数字
  can_all_clear : true, //可以全清除
  is_has_result : false,//上次运算是求结果，运算符是'='
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
        document.getElementById("monitor").style.fontSize = "72px";
      }
      else {
        document.getElementById("monitor").style.fontSize = "76px";
      }
      break;
    case 7: 
      if(n_point == 3) {
        document.getElementById("monitor").style.fontSize = "59px";
      }
      else if(n_point == 1) {
        document.getElementById("monitor").style.fontSize = "66px";
      }
      else {
        document.getElementById("monitor").style.fontSize = "62px";
      }
      break;
    case 8: 
      if(n_point == 3) {
        document.getElementById("monitor").style.fontSize = "53px";
      }
      else if(n_point == 1) {
        document.getElementById("monitor").style.fontSize = "58px";
      }
      else {
        document.getElementById("monitor").style.fontSize = "55px";
      }
      break;
    case 9: 
      if(n_point == 3) {
        document.getElementById("monitor").style.fontSize = "48px";
      }
      else if(n_point == 1) {
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
  if(temp_number.indexOf('-') != -1){
    if(temp_number.charAt(temp_number.indexOf('-') + 1) == ','){
      temp_number.replace(',', '');
    }
  }
  return temp_number;
}

function inputNumber(number) {
  if (global_values.is_has_result) {
    global_values.all_numbers = [];
    global_values.all_operators = [];
    global_values.is_has_result = false;
  }
  var view = document.getElementById("view");
  if(global_values.is_new_number) {
    view.innerText = '0';
    global_values.is_new_number = false;
  }
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
    global_values.all_numbers = [];
    global_values.all_operators = [];
  }
  else {
    global_values.can_all_clear == true;
  }
  global_values.is_has_result = false;
  global_values.can_add_operator = true;
}

function judgePriority(operator) {
  switch (operator) {
    case '+':
      return 1;
      break;
    case '-':
      return 1;
      break;
    case '×':
      return 2;
      break;
    case '÷':
      return 2;
      break;
    default:
      return 0;
      break;
  }
}

function calculate(operator) {
  var temp_a = global_values.all_numbers.pop();
  var temp_b = global_values.all_numbers.pop();
  var result;
  switch (operator) {
    case '+':
      result = Number(temp_b) + Number(temp_a);
      break;
    case '-':
      result = Number(temp_b) - Number(temp_a);
      break;
    case '×':
      result = Number(temp_b) * Number(temp_a);
      break;
    case '÷':
      result = Number(temp_b) / Number(temp_a);
      break;
    default:
      break;
  }
  global_values.all_numbers.push(result.toString());
}

function inputOperator(operator) {
  global_values.is_new_number = true;
  var view = document.getElementById("view");
  var str_curr_number;
  if(global_values.is_has_result) {
    global_values.all_numbers.pop();
    global_values.all_operators.pop();
    global_values.all_operators.push(operator);
    global_values.is_has_result = false;
    global_values.can_add_operator = false;
  }
  else {
    str_curr_number = view.innerText.replace(/,/g, '');
    if(global_values.all_numbers.length == 0) {
      global_values.all_numbers.push(str_curr_number)
      global_values.all_operators.push(operator);
      global_values.can_add_operator = false;
    }
    else {
      var len_all_operators = global_values.all_operators.length;//运算符个数
      if(!global_values.can_add_operator){
        global_values.all_operators.pop();
        global_values.all_operators.push(operator);
      }
      else{
        global_values.all_numbers.push(str_curr_number);//将显示器上的数字存储
        var str_pre_operators = global_values.all_operators[len_all_operators - 1];//获取运算符数组顶端元素
        if(judgePriority(operator) > judgePriority(str_pre_operators)) {
          global_values.all_operators.push(operator);
        }
        else {
          var temp_operator = global_values.all_operators.pop();
          calculate(temp_operator);
          showResult();
          global_values.all_operators.push(operator);
        }
        global_values.can_add_operator = false;
      }
    }
  }
}

function showResult() {
  var current_result = global_values.all_numbers[global_values.all_numbers.length - 1];
  var index_of_point = current_result.indexOf('.');
  var length_of_result = current_result.replace('.', '').length;
  if(length_of_result > 9) {
    var length_of_integer;
    if(index_of_point == -1) {
      length_of_integer = current_result.length;
    }
    else {
      length_of_integer = index_of_point;
    }
    if(length_of_integer > 9) {
      document.getElementById('view').innerText = "E";
      global_values.all_numbers = new Array();
      global_values.all_operators = new Array();
    }
    else {
      if(length_of_integer == 9) {
        current_result = current_result.substr(0, 9);
      }
      else {
        current_result = current_result.substr(0, index_of_point) + '.' +
            current_result.substr(index_of_point + 1, 9 - index_of_point);
      }
    }
  }
  var view = document.getElementById('view');
  view.innerText = addComma(current_result);
  changeFontsize(view.innerText);
}

function getResult() {
  var view = document.getElementById("view");
  var last_number;//即最后一次运算的被操作数
  if(global_values.is_has_result) {
    last_number = global_values.all_numbers[1];
  }
  else {
    last_number = view.innerText.replace(/,/g, '');
    global_values.all_numbers.push(last_number);
  }
  var last_operator = global_values.all_operators[0];//最后一个运算符
  while(global_values.all_operators.length != 0) {
    var temp_operator = global_values.all_operators.pop();
    last_number = global_values.all_numbers[1];
    calculate(temp_operator);
  }
  showResult();
  global_values.all_numbers.push(last_number);
  global_values.all_operators.push(last_operator);
  global_values.is_new_number = true;
  global_values.is_has_result = true;
  global_values.can_add_operator = true;
}
function getOpponent() {
  if(global_values.is_has_result) {
    global_values.all_numbers[0] = '-' + global_values.all_numbers[0];
    showResult();
  }
  else {
    document.getElementById('view').innerText = '-' + document.getElementById('view').innerText;
  }
}
function getPercentange() {
  if(global_values.is_has_result) {
    var temp = Number(global_values.all_numbers[0]);
    temp = temp / 100;
    global_values.all_numbers[0] = temp.toString();
    showResult();
  }
  else {
    var temp = Number(document.getElementById('view').replace(/,/g, ''));
    temp /= 100;
    document.getElementById('view').innerText = temp.toString();
  }
}
function changeToVer() {
  alert("暂时未完成！");
}