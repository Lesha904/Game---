let title = document.createElement("h1");         // hi
title.innerHTML = 'The application "crosses and zero"';   // hi
title.className = "hi";         // hi
document.body.prepend(title);            //  prepend(hi);

let areaWrapper = document.createElement("div");     // div1
areaWrapper.className = "area-wrapper";      // div1
document.body.prepend(areaWrapper);    //  prepend(div1)

let blockArea = document.createElement("div");  // div2
blockArea.id = "area";                       // div2
areaWrapper.append(blockArea);               // append(div2);
document.body.append(areaWrapper);   //   append(div1)

for (let i = 0; i < 9; i++) {
    blockArea.innerHTML += `<div class="box"></div>`;   // div2
}

let modalResultWrapper = document.createElement("div");  // div3
modalResultWrapper.id = "modal-result-wrapper";    // div3
// modalResultWrapper.className = "modal-result-wrapper";
document.body.append(modalResultWrapper);   // div3

let overlay = document.createElement("div"); // div4
overlay.id = "overlay";                    // div4
// overlay.className = "overlay";
modalResultWrapper.prepend(overlay);    // div3.prepend(div4);

let modalWindow = document.createElement("div");  // div5
modalWindow.id = "modal-window";                   // div5
// modalWindow.className = "modal-window";
modalResultWrapper.append(modalWindow);    // div3.append(div5);

let content = document.createElement("div");   // div6
content.id = "content";                       // div6
//content.className = "content";
content.innerHTML = "content";                 // div6
modalWindow.prepend(content);                     // div5.prepend(div6);

let btnClose = document.createElement("div");  // div7
btnClose.id = "btn-close";                   // div7
// btnClose.className = "btn-close";
btnClose.innerHTML = "Start new game";       // div7
modalWindow.append(btnClose);                     // div5.append(div7);


let area = document.getElementById("area");
let move = 0;                         // П. которая отвечает за ход, кто сейчас ходит - Х || 0 . В эту П. будет добавлятся по единице.
let result = "";                        // в эту П. буду присваивать в цикле в проверке результат проверки всех возможных трех совпадений "box"-элементов в ряду
let contentWrapper = document.getElementById("content");          // В эту П. передавать будем результат
let modalResult = document.getElementById("modal-result-wrapper");    // та П. отвечает, показывать мне модальное окно или нет
//let overlay = document.getElementById("overlay");  лишнее                 // Чтобы по нажатию мог закрывать модальное окно
//let btnClose = document.getElementById("btn-close");  лишнее                // Чтобы по нажатию мог закрывать модальное окно 
let count = 0;

area.addEventListener("click", e => {            // через свойство target у event(а) я могу определить, по какому элементу я кликнул.
    if (e.target.className !== "box") {     
        return
    }         // проверям, кликнул ли я по "box"-элементу
    if (e.target.innerHTML == "0" || e.target.innerHTML == "X" ) {  // делаем проверку на выбранном "box"-элементе на наличие символа, если уже есть символ, то не могу кликнуть по данномому "box"-элементу и переназначить символ
        return;
    }
    console.log("e.target ===>", e.target);
    
    move % 2 === 0 ? e.target.innerHTML = 'X' : e.target.innerHTML = '0';    //  И чтобы понимать, ставить нам Х || 0 то делаем проверку, если четный ход - то указывать крестики, если не четный ход - то нолики.
    move++;                      // если один ход уже прошел, один клик отловили, то нужно П. move увеличить на 1. И с помощью этого будем понимать ставить Х || 0
    check();   // она вызываться будет каждый раз при клике на каждый "box"-элементу
    }
)

let check = () => {
    let boxes = document.getElementsByClassName("box");  // находится HTML-коллекция - всевдо-массив, а значит можно обращаться через индекс. Что будет давать нам данная П.? Внутри нее будут содераться все мои "box"-элементы
    console.log(boxes);                                  // Это нужно для того, чтобы я мог потом пробежаться по данным "box"-элементам и сравнить кто из них победил 
    const array = [                                       // случаи варианты, когда побеждают Х || 0
    [0,1,2],   
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    ];
    for (let i = 0; i < array.length; i++) {           // пробегаем по массиву и сравниваем что сейчас находится в "box"-элементах. Если в 0 1 и 2 находятся все Х || 0, то соттветственно 
        if (boxes[array[i][0]].innerHTML == "X" && boxes[array[i][1]].innerHTML == "X" && boxes[array[i][2]].innerHTML == "X") {       //  i - каждый массив, а 0 - это внутренние числа самого вложенного массива. пробежались по всем трем числам массива-элемента
            result = "крестики";
            prepareResult(result);  
            disabled();
            showResult(result);                                  // передаем параметром в фун. чтобы выводили подставляемое слово после результата проверки
        } 
        else if (boxes[array[i][0]].innerHTML == "0" && boxes[array[i][1]].innerHTML == "0" && boxes[array[i][2]].innerHTML == "0") {
            result = "нолики";
            prepareResult(result);       // делаем вызов после того, как П. result присвоили новое значение
            disabled();
            showResult(result);
        }
    }
    
    count++;                       // каждый раз считаем кол-во нажатий
    if (count === boxes.length) {  // если все "box"-элементы заполненны и при этом нет совпадений в одну строку, то выводим "ничья";
        result = "ничья";
        prepareResult(result);
    }
}

function disabled() {
    boxes = document.getElementsByClassName("box");
    for (let element of boxes) {
        console.log(element.id);
        element.style.display = "none";
        element.setAttribute("disabled", true)
    }
}

function updatBox() {
    boxes = document.getElementsByClassName("box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = "";    
        boxes[i].style.display = "flex";
    }
}

let xScore = document.querySelector(".x-score");
//console.log("xScore ==>" ,xScore);
let zeroScore = document.querySelector(".zero-score");
//console.log("zeroScore ==>" ,zeroScore);


let winCross = 0;
let winZero = 0; 
function showResult(result) {
    //(result ==="крестики") ? winCross++:winZero++;
    if (result === "крестики") {
        xScore.innerHTML = winCross++;
        console.log("xScore ==>", xScore);
    }
    else if (result === "нолики") {
        zeroScore.innerHTML = winZero++;
    }
}

let prepareResult = winner => {                          // функция которая выводит результат в модальное окно
    console.log(winner);
    contentWrapper.innerHTML = `Победили ${winner}!`;   // показать результат в модальном окне
    modalResult.style.display = "block";    // и когда в контенте уже появился результат, то тогда показывать модальное окно modalResults
}

let closeModal = () => {            // функция, чтобы закрывать модальное окно
    console.log("modalResult ==>", modalResult);
    modalResult.style.display = "none";   // скрываем
    //location.reload();             // перезагружаем страницу, чтобы начиналась новая игра
    updatBox();
}

overlay.addEventListener("click", closeModal);
btnClose.addEventListener("click", closeModal);

// Должны обработать всю логику, кто должен победить Х || 0. И для этого пишем функцию проверки check();

// array[i] - обращение к каждому элементу(который представляет собой массив) массива array 
// array[i][0] - обращение к нулевому индексу каждого элемента-массива
// transform: translate(-50%, -50%); чтобы разместить по центру любой элемент

