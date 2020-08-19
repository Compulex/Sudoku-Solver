var arr_squares = [];
var arr_outer = [];
var arr_cursor = [];
var notes = [];
var b_one = b_two = b_three = b_four = b_five = b_six = b_seven = b_eight = b_nine = []; 
var one = two = three = four = five = six = seven = eight = nine = []; 

var fill_num = document.getElementById("fill");
var square_id = undefined;
var started = false;

/*Start of visual setup*/
var board = document.getElementById("board");

//add outersquares
for(let i = 0; i < 9; i++){
    var id = "outer_" + i;
    var outer = document.createElement("div");
    
    if(i < 3){
        outer.setAttribute("class","outer_rowa");
    }
    else if(i > 2 && i < 6){
        outer.setAttribute("class","outer_rowb");
    }
    else{
        outer.setAttribute("class","outer_rowc");
    }

    outer.setAttribute("id", id);
    board.appendChild(outer);
    arr_outer.push(id);

    for(let j = 0; j < 9; j++){
        //add 9 buttons squares in each outer square
        var s_id = "square_" + i + "_" + j;
        var square = document.createElement("div");
        var p = document.createElement("p");
        p.setAttribute("class", "bold_numbers");
        p.innerHTML = "";

        if(j < 3){
            square.setAttribute("class","square_rowa");
        }
        else if(j > 2 && j < 6){
            square.setAttribute("class","square_rowb");
        }
        else{
            square.setAttribute("class","square_rowc");
        }
        
        square.setAttribute("id", s_id);
        square.appendChild(p);

        outer.appendChild(square);
    
        arr_squares.push(s_id);
    }
}

arr_squares.forEach(identify);
/*End of visual setup*/



/*Logic*/
//arrays containing 9 arrays - an array for each number
function addArrays(box_arr){
    box_arr.push(one);
    box_arr.push(two);
    box_arr.push(three);
    box_arr.push(four);
    box_arr.push(five);
    box_arr.push(six);
    box_arr.push(seven);
    box_arr.push(eight);
    box_arr.push(nine);
}

//add numbered array to each box
addArrays(b_one);
addArrays(b_two);
addArrays(b_three);
addArrays(b_four);
addArrays(b_five);
addArrays(b_six);
addArrays(b_seven);
addArrays(b_eight);
addArrays(b_nine);

//one big array containing the arrays above
notes.push(b_one);
notes.push(b_two);
notes.push(b_three);
notes.push(b_four);
notes.push(b_five);
notes.push(b_six);
notes.push(b_seven);
notes.push(b_eight);
notes.push(b_nine);

function identify(item){
    var box = document.getElementById(item);

    box.onclick = function(){
        //acts as a cursor
        deselect_previous(arr_squares);

        square_id = item;
        
        box.style.borderColor = "green";
        box.style.borderRadius = "12px";

        //don't have to move mouse to input if they don't want to
        fill_num.focus(); 
    };
}//identify

function deselect_previous(arr){
    //make each square back to normal
    arr.forEach(function(item){
        var box = document.getElementById(item);
        var b_color = box.style.borderColor;
        if(b_color == "green"){
            box.style.borderColor = "black";
            box.style.borderRadius = "0px";
        }
    });
}//deselect_previous

function deselect_inner_squares(arr_sq){
    let square = undefined;
    //style
    for(var j = 0; j < arr_sq.length; j++){
        square = document.getElementById(arr_sq[j]);

        //style - borderRadius
        if(j == 0 || j == 2 || j == 6 || j == 8){
            square.style.borderRadius = "0px";
        }
        //style - borderColor
        if(j != 4){
            square.style.borderColor = "black";
        }      
    }//for
}//deselect_inner_squares

//hit enter button
fill_num.addEventListener("keyup", function setup(){
    //value cannot be more than 9
    if(square_id != null && fill_num.value < 10){
        var square = document.getElementById(square_id);
        var p = square.firstChild;
        if(fill_num.value == 0)
            p.textContent = "";
        else
            p.textContent = fill_num.value;
        
        //if number is there already
        if(p.textContent != ""){
            square.removeChild(square.firstChild);
            //console.log("CHILD REMOVED");
        }

        //add number in square
        square.appendChild(p);

        //deselect the box
        square.style.borderColor = "black";
        square.style.borderRadius = "0px";

        //reset input
        fill_num.value = "";
        square = null;
        fill_num.blur();
    }
    else{
        if(fill_num.value > 9){
            alert("Only numbers 1-9 allowed");
            fill_num.value = "";
        }
        else{
            alert("Please choose a square to put number in");
        }
    }
});//setup

function input_answer(sq_id, input){
    var sq = document.getElementById(sq_id);
    var p = sq.firstChild;
    if(p.textContent == ""){
        p.style.color = "green";
        p.textContent = input;
        //add number in square
        sq.appendChild(p);
    }
}//input_answer

function numbers_left(box_num, place, type){
    var arr = [];
    var id = "square_";
    var text = null;
    var x = 0;

    if(type == "box"){
        while(x < 9){
            id += box_num + "_" + x;
            let sq = document.getElementById(id);
            let p = sq.firstChild;

            //check if the element is empty
            if(p.textContent != ""){
                text = parseInt(p.textContent);
            }
            else{
                text = -1;
            }
            
            arr.push(text);
            x++;
            id = "square_";
        }//while  
    }//if box

    else if(type == "col"){
        /*
            Getting array for a column of every third box
            First column index 0 -> get squares with indices: 0,3,6 
            Second column index 1 -> get squares with indices: 1,4,7
            Third column index 2 -> get squares with indices: 2,5,8
        */

        x = place;
        //if box numbers are not 0,1,2 this will set box index to the three boxes on top row to start columns
        if(box_num > 2){
            let temp = 0;
            temp = box_num - 6;

            if(temp < 0){
                box_num -= 3;
            }
            else{
                box_num = temp;
            }
        }

        while(box_num < 9){
            id += box_num + "_" + x;
            let sq = document.getElementById(id);
            let p = sq.firstChild;
            
            if(p.textContent != ""){
                text = parseInt(p.textContent);
            }
            else{
                text = -1;
            }

            arr.push(text);

            //iteration
            if(x == place+6){
                x = place;
                box_num += 3;
            }
            else{
                x += 3;
            }
            
            id = "square_";
        }//while 
    }//if col

    else if(type == "row"){
        /*
            Getting array for a row of every third box
            First row index 0 -> get squares with indices: 0,1,2 
            Second row index 3 -> get squares with indices: 3,4,5
            Third row index 6 -> get squares with indices: 6,7,8
        */

        x = place;
        //if box numbers are not 0,3,6 this will set box index to the three boxes on left-most column to start rows
        if(box_num % 3 != 0){
            let temp = 0;
            temp = box_num - 2;

            if(temp % 3 != 0){
                box_num -= 1;
            }
            else{
                box_num = temp;
            }
        }
        
        let last_row = box_num + 2;
        while(box_num <= last_row){
            id += box_num + "_" + x;
            let sq = document.getElementById(id);
            let p = sq.firstChild;
            
            if(p.textContent != ""){
                text = parseInt(p.textContent);
            }
            else{
                text = -1;
            }

            arr.push(text);

            //iteration
            if(x == place+2){
                x = place;
                box_num++;
            }
            else{
                x++;
            }
            id = "square_";
        }//while 
    }//if row

    return arr;
}//numbers_left

function delete_elements(arr, type){
    var n = 0;
    
    switch(type){
        case "col1":
            while(n < 9){
                if(arr.indexOf(n) != -1){
                    arr.splice(arr.indexOf(n),1);
                }
                n += 3;
            }
            break;    
        case "col2":
            n = 1;
            while(n < 9){
                if(arr.indexOf(n) != -1){
                    arr.splice(arr.indexOf(n),1);
                }
                n += 3;
            }
            break; 
        case "col3":
            n = 2;
            while(n < 9){
                if(arr.indexOf(n) != -1){
                    arr.splice(arr.indexOf(n),1);
                }
                n += 3;
            }
            break; 
        case "row1":
            n = 0;
            while(n < 3){
                if(arr.indexOf(n) != -1){
                    arr.splice(arr.indexOf(n),1);
                }
                n++;
            } 
            break; 
        case "row2":
            n = 3;
            while(n < 6){
                if(arr.indexOf(n) != -1){
                    arr.splice(arr.indexOf(n),1);
                }
                n++;
            } 
            break; 
        case "row3":
            n = 6;
            while(n < 9){
                if(arr.indexOf(n) != -1){
                    arr.splice(arr.indexOf(n),1);
                }
                n++;
            } 
            break; 
    }//switch
    //console.log("End of edit: " + arr);
    return arr;
}//delete_elements

function check_duplicates(arr){
    var set = new Set();
    arr.forEach(function(num){
        set.add(num);
    });
    return set.size == arr.length;
}//check_duplicates

function is_board_complete(){
    var outer = 0;
    var complete, filled_in = false;

    while(outer < 9){
        let arr = numbers_left(outer, 0, "box");
        //checks for duplicates
        if(check_duplicates(arr) == false){
            complete = false;
            break;
        }
        else{
            complete = true;
        }

        //checks if all squares are filled in with numbers 1-9
        filled_in = arr.every(function(item){
            return item > 0;
        });
        if(filled_in == false){
            complete = false;
            break;
        }
        else{
            complete = true;
        }
        outer++;
    }
    return complete;
}//is_board_complete

var box_num = 0;
var problem = [];
var count = 0;

function change_to_box_index(idx, type){
    var id = 0;

    if(idx == 0 || idx == 3 || idx == 6){
        if(type == "col1")
            id = 0;
        else if(type == "col2")
            id = 1;
        else if(type == "col3")
            id = 2;
        //row
        else if(type == "row1")
            id = 0;
        else if(type == "row2")
            id = 3;
        else if(type == "row3")
            id = 6;
    }
    else if(idx == 1 || idx == 4 || idx == 7){
        if(type == "col1")
            id = 3;
        else if(type == "col2")
            id = 4;
        else if(type == "col3")
            id = 5;
        //row
        else if(type == "row1")
            id = 1;
        else if(type == "row2")
            id = 4;
        else if(type == "row3")
            id = 7;
    }
    else if(idx == 2 || idx == 5 || idx == 8){
        if(type == "col1")
            id = 6;
        else if(type == "col2")
            id = 7;
        else if(type == "col3")
            id = 8;
        //row
        else if(type == "row1")
            id = 2;
        else if(type == "row2")
            id = 5;
        else if(type == "row3")
            id = 8;
    }

    return id;
}//change_to_box_index

function last_square(arr, b_num, type){
    let goal = 45 //adding all numbers from 1 - 9 = 45
    let sum = 0, num = 0;
    let idx = -1, id = -1;

    //looping through column/row
    arr.forEach(function(item, index){
        if(item != -1)
            sum += item;
        else{
            idx = index;
            if(type == "box")
                id = idx;
        } 
    });

    //converting the index of columns and rows arrays to the index of box arrays
    id = change_to_box_index(idx, type);

    //fill number in correct index
    if(id != -1){
        num = goal - sum;
        let s_id = "square_" + b_num + "_" + id;
        input_answer(s_id, num);
    }
}//last_square

function check_one_square_left(arr, b_num, type){
    var set = new Set();
    var last = false;
    arr.forEach(function(item){
        set.add(item);
    });

    /**set{1,2,3,4,5,6,7,8,-1} == arr[1,2,3,4,5,6,7,8,-1] OR 
     * set{1,2,3,4,-1,6,8} != arr[1,2,3,4,-1,6,-1,8,-1]
     * goal => set{1,2,3,4,5,6,7,8,9} == arr[1,2,3,4,5,6,7,8,9] COMPLETE
     */
    if(set.size == arr.length){
        if(set.has(-1))
            last = true;
    }   
    
    if(last)
        last_square(arr, b_num, type);
}//check_one_square_left

function solve(b_num){  
    //console.log("SOLVING.......");
    
    //arrays
    var box_arr = [];
    var start_arr = numbers_left(b_num, 0, "box");
    var col_one = [], col_two = [], col_three = [];
    var row_one = [], row_two = [], row_three = [];
  
    for(var val = 1; val < 10; val++){
        //called again if previous number is filled in for a faster update
        box_arr = numbers_left(b_num, 0, "box");
        
        //three columns
        col_one = numbers_left(b_num, 0, "col");
        col_two = numbers_left(b_num, 1, "col");
        col_three = numbers_left(b_num, 2, "col");

        //three rows
        row_one = numbers_left(b_num, 0, "row");
        row_two = numbers_left(b_num, 3, "row");
        row_three = numbers_left(b_num, 6, "row");

        let loc = [0,1,2,3,4,5,6,7,8]; //index of each square in current box

        //number is in box -> skip to next number
        if(box_arr.includes(val)){ continue; } 
        
        //METHOD 1. Elimination on squares
        let arr = [];
        loc.forEach(function(item){
            let box_val = box_arr[item];
            if(box_val != -1){
                //delete that index where a square is filled 
                arr.push(item);
            }
        });
        arr.forEach(function(item){
            let idx = loc.indexOf(item);
            loc.splice(idx,1);
        });
        
        //cols - delete possible indices for val from loc array
        if(col_one.includes(val)){
            loc = delete_elements(loc, "col1");
        }  
        if(col_two.includes(val)){
            loc = delete_elements(loc, "col2");
        }
        if(col_three.includes(val)){
            loc = delete_elements(loc, "col3");
        }  
        
        if(loc.length == 1){
            let s_id = "square_" + box_num + "_" + loc[0];
            input_answer(s_id, val);
            continue;
        }
        else{
            //rows - delete possible indices for val from loc array
            if(row_one.includes(val)){
                loc = delete_elements(loc, "row1");
            }
            if(row_two.includes(val)){
                loc = delete_elements(loc, "row2");
            }
            if(row_three.includes(val)){
                loc = delete_elements(loc, "row3");
            }
               
            if(loc.length == 1){
                var s_id = "square_" + b_num + "_" + loc[0];
                input_answer(s_id, val);
                continue;
            }
            else{
               set_number_loc(b_num, val, loc); 
            }
        }
    }//for values 1-9
    
    //fill in the last missing square after loop - only if one square left
    let updated_box_arr = numbers_left(b_num, 0, "box");
    let same = updated_box_arr.every(function(item, idx){
        return item == start_arr[idx];
    });

    if(same){        
        //columns updated
        col_one = numbers_left(b_num, 0, "col");
        col_two = numbers_left(b_num, 1, "col");
        col_three = numbers_left(b_num, 2, "col");
        check_one_square_left(col_one, b_num, "col1");
        check_one_square_left(col_two, b_num, "col2");
        check_one_square_left(col_three, b_num, "col3");

        //focus_on_columns();

        //rows updated
        row_one = numbers_left(b_num, 0, "row");
        row_two = numbers_left(b_num, 3, "row");
        row_three = numbers_left(b_num, 6, "row");
        check_one_square_left(row_one, b_num, "row1");
        check_one_square_left(row_two, b_num, "row2");
        check_one_square_left(row_three, b_num, "row3");

        //focus_on_rows();
    }

    //box updated
    check_one_square_left(updated_box_arr, b_num, "box");
}//solve

/*function possibilities(n, arr, ){

}//possibilities*/

function set_number_loc(bn, n, arr){
    //sets array of current number in loop for the possible location in current box
    switch(bn){
        case 0:
            b_one[n-1] = arr;
            break;
        case 1:
            b_two[n-1] = arr;
            break;
        case 2:
            b_three[n-1] = arr;
            break;
        case 3:
            b_four[n-1] = arr;
            break;
        case 4:
            b_five[n-1] = arr;
            break;
        case 5:
            b_six[n-1] = arr;
            break;
        case 6:
            b_seven[n-1] = arr;
            break;
        case 7:
            b_eight[n-1] = arr;
            break;
        case 8:
            b_nine[n-1] = arr;
            break;
    }//end switch
    //console.log("Box#" + bn + "." + n + ": " + arr);
}//set_number_loc

function box_cursor(num){
    let outer = undefined;
    let outer_id = "outer_" + num;
    
    outer = document.getElementById(outer_id);
    outer.style.borderColor = "green";
    outer.style.borderRadius = "12px";

    let idx = 0;

    if(num > 0){
        idx = num * 9;
    }
    
    arr_cursor = arr_squares.slice(idx,idx+9);
    
    let square = undefined;

    //style
    for(var j = 0; j < arr_cursor.length; j++){
        square = document.getElementById(arr_cursor[j]);

        //style - borderRadius
        if(j == 0)
            square.style.borderTopLeftRadius = "12px";

        if(j == 2)
            square.style.borderTopRightRadius = "12px";
        
        if(j == 6)
            square.style.borderBottomLeftRadius = "12px";

        if(j == 8)
            square.style.borderBottomRightRadius = "12px";

        //style - borderColor
        if(j < 3)
            square.style.borderTopColor = "green";

        if(j % 3 == 0)
            square.style.borderLeftColor = "green";
        
        if(j == 2 || j == 5 || j == 8)
            square.style.borderRightColor = "green";

        if(j == 6 || j == 7 || j == 8)
            square.style.borderBottomColor = "green";
        
    }//for
}//box_cursor

function save_problem(){
    var given_nums = [];

    arr_squares.forEach(function(item){
        let sq = document.getElementById(item);
        sq.onclick = null;
        given_nums.push(sq.firstChild.textContent);
    });
    
    return given_nums;
}//save_problem

function box_by_box(){
    var box_arr = numbers_left(box_num, 0, "box");

    if(count > 0){
        deselect_previous(arr_outer);
        deselect_inner_squares(arr_cursor);
    }
    else{
        problem = save_problem();
        count = 1;
        started = true;
    }
        
    //no empty spaces in box
    while(!box_arr.includes(-1)){ 
        if(box_num == 8)
            box_num = 0;
        else
            box_num++; 
        box_arr = numbers_left(box_num, 0, "box");
    }

    //style
    box_cursor(box_num);

    solve(box_num);    
    
    if(box_num == 8)
        box_num = 0;
    else
        box_num++;  

    if(is_board_complete()){
        var hint_btn = document.getElementById("hint");
        var solve_btn = document.getElementById("solve");
        var smiley = document.getElementById("smiley");
        var fill_in = document.getElementById("fill_in");

        fill_in.style.display = "none";
        smiley.style.display = "block";

        deselect_previous(arr_outer);
        deselect_inner_squares(arr_cursor);

        //change text
        hint_btn.textContent = "Reset";
        solve_btn.textContent = "Restart";

        //change onclick
        hint_btn.onclick = function(){
            if(hint_btn.clicked == true){
                location.reload();
            }
        };
        solve_btn.onclick = function(){
            if(solve_btn.clicked == true){
                start_over;
            }
        }
    }//if board completed
}//box_by_box

var solving = undefined;

function full_answer(){ 
    var loader = document.getElementById("loader");
    var hint_btn = document.getElementById("hint");

    //if hint was clicked first
    deselect_previous(arr_outer);
    deselect_inner_squares(arr_cursor);

    hint_btn.textContent = "Reset";
    //change onclick
    hint_btn.onclick = function(){
        console.log("RESET");
        location.reload();
    };

    board.style.opacity = "0.2";
    loader.style.display = "block";

    if(count == 0)
        problem = save_problem();

    solving = setInterval(function(){
        while(box_num < 9){
            solve(box_num);
            box_num++; 
        }
        box_num = 0;
        count++;
        console.log("Count: " + count);
        if(is_board_complete()){
            clearInterval(solving);
            loader.style.display = "none";
            board.style.opacity = "1";

            //change buttons
            var solve_btn = document.getElementById("solve");
            var smiley = document.getElementById("smiley");
            var fill_in = document.getElementById("fill_in");

            fill_in.style.display = "none";
            smiley.style.display = "block";
            
            //change text
            solve_btn.textContent = "Restart";

            solve_btn.onclick = function(){
                start_over;
            }
        } 
        else if(count > 5){
            clearInterval(solving);
            loader.style.display = "none";
            document.getElementById("info").style.display = "block";
        }
    }, 1000);
}//full_answer

function help(){
    var modal = document.getElementById("help_modal");
    modal.style.display = "block";

    var close = document.getElementById("close");
    close.onclick = function(){
        modal.style.display = "none";
    }
    //click outside of box to exit
    window.onclick = function(event){
        if(event.target == modal){
            modal.style.display = "none";
        }
    }
}//help

function start_over(){
    var hint_btn = document.getElementById("hint");
    var solve_btn = document.getElementById("solve");
    var smiley = document.getElementById("smiley");
    var fill_in = document.getElementById("fill_in");

    fill_in.style.display = "block";
    smiley.style.display = "none";

    arr_squares.forEach(function(item, idx){
        let sq = document.getElementById(item);
        sq.firstChild.textContent = problem[idx];
    });

    //change text
    hint_btn.textContent = "Hint";
    solve_btn.textContent = "Solve";

    //change onclick
    hint_btn.onclick = box_by_box;
    solve_btn.onclick = full_answer;

    started = false;
    count = 0;
}//start_over


/* Testing function */
function start(){
    problem = [1,2,,,,4,,,,
               ,,,,,,4,8,,
               ,,,,2,5,7,,,
               4,6,,,,9,3,,,
               1,,9,,,,5,,7,
               ,,8,1,,,,4,2,
               ,,8,6,9,,,,,
               ,7,3,,,,,,,
               ,,,5,,,,9,1];
    /*problem = [3,-1,5,-1,-1,7,-1,9,-1,
               7,-1,-1,-1,5,9,-1,3,6,
               -1,-1,9,-1,-1,-1,7,-1,2,
               -1,-1,9,7,-1,2,8,6,3,
               -1,-1,8,-1,-1,-1,9,-1,-1,
               2,1,3,8,-1,6,4,-1,-1,
               2,-1,6,-1,-1,-1,1,-1,-1,
               1,8,-1,4,6,-1,-1,-1,2,
               -1,4,-1,5,-1,-1,3,-1,8];*/
    
    arr_squares.forEach(function(item, idx){
        let sq = document.getElementById(item);
        if(problem[idx] == -1){
            problem[idx] = "";
        }
        sq.firstChild.textContent = problem[idx];
    });
}//start


