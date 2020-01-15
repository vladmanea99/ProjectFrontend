window.onload = function(){
    var sort_div = this.document.getElementById("sorting");
    var input_text = this.document.createElement("INPUT");
    input_text.setAttribute("type", "text");
    input_text.id = "input_text";
    sort_div.appendChild(input_text);

    input_text.onchange = function(){
        var section_courses = document.getElementById("S2");
        var article_courses = section_courses.querySelectorAll("article");
        var input = input_text.value;
        var filter = Array.prototype.filter;
        for (let x of article_courses){
            x.style.display = "none";
        }
        console.log(article_courses);
        var filtered_articles = filter.call(article_courses, function(a){
            var heading = a.querySelectorAll("h2")[0];
            return heading.includes(input);
        })
        for (let x of filtered_articles){
            x.style.display = "initial";
        }
    }
}