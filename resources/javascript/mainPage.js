window.onload = function(){
    var sort_div = this.document.getElementById("sorting");
    var input_text = this.document.createElement("INPUT");
    input_text.setAttribute("type", "text");
    input_text.id = "input_text";
    sort_div.appendChild(input_text);

    var input_range = this.document.createElement("INPUT");
    input_range.setAttribute("type", "range");
    input_range.id = "input_range";
    input_range.min = 1;
    input_range.max = 6;

    var min_range = this.document.createElement("p");
    var max_range = this.document.createElement("p");
    var current_range = document.createElement("p");

    min_range.innerHTML = input_range.min;
    max_range.innerHTML = input_range.max;
    current_range.innerHTML = input_range.value;

    var radioButtonTrue = this.document.createElement("INPUT");
    var radioButtonFalse = this.document.createElement("INPUT");

    radioButtonTrue.setAttribute("type", "radio");
    radioButtonFalse.setAttribute("type", "radio");

    radioButtonTrue.name = "presence";
    radioButtonTrue.value = "Yes";

    radioButtonFalse.name = "presence";
    radioButtonFalse.value = "No";

    radioText = this.document.createElement("p");
    radioText.innerHTML = "Do you want required presence ?";

    sort_div.appendChild(min_range);
    sort_div.appendChild(input_range);
    sort_div.appendChild(current_range);
    sort_div.appendChild(max_range);
    sort_div.appendChild(radioText);
    sort_div.appendChild(radioButtonTrue);
    sort_div.appendChild(radioButtonFalse);

    input_text.onchange = function(){
        var section_courses = document.getElementById("S2");
        console.log(section_courses);
        var article_courses = section_courses.querySelectorAll("article");
        var input = input_text.value;
        
        var filter = Array.prototype.filter;
        for (let x of article_courses){
            x.style.display = "none";
        }
        var filtered_articles = filter.call(article_courses ,function(a){
            var heading = a.querySelectorAll("h2")[0];
            console.log(heading);
            return heading.innerHTML.includes(input);
        })
        for (let x of filtered_articles){
            x.style.display = "block";
        }
    }

    input_range.onchange = function(){
        var section_courses = document.getElementById("S2");
        console.log(section_courses);
        var article_courses = section_courses.querySelectorAll("article");
        var input = input_range.value;
        
        current_range.innerHTML = input;
        var filter = Array.prototype.filter;
        for (let x of article_courses){
            x.style.display = "none";
        }
        var filtered_articles = filter.call(article_courses ,function(a){
            var heading = a.querySelectorAll("p")[2];
            console.log(heading);
            return heading.innerHTML.includes(input.toString());
        })
        for (let x of filtered_articles){
            x.style.display = "block";
        }
    }
    radioButtonTrue.onclick = function(){
        var section_courses = document.getElementById("S2");
        console.log(section_courses);
        var article_courses = section_courses.querySelectorAll("article");
        var input = radioButtonTrue.checked;
        
        var filter = Array.prototype.filter;
        for (let x of article_courses){
            x.style.display = "none";
        }
        var filtered_articles = filter.call(article_courses ,function(a){
            var heading = a.querySelectorAll("p")[6];
            console.log(heading);
            return heading.innerHTML.includes(input.toString());
        })
        for (let x of filtered_articles){
            x.style.display = "block";
        }
    }
    radioButtonFalse.onclick = function(){
        var section_courses = document.getElementById("S2");
        console.log(section_courses);
        var article_courses = section_courses.querySelectorAll("article");
        var input = !radioButtonFalse.checked;
        
        var filter = Array.prototype.filter;
        for (let x of article_courses){
            x.style.display = "none";
        }
        var filtered_articles = filter.call(article_courses ,function(a){
            var heading = a.querySelectorAll("p")[6];
            console.log(input.toString());
            return heading.innerHTML.includes(input.toString());
        })
        for (let x of filtered_articles){
            x.style.display = "block";
        }
    }
}