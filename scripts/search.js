let SearchData = [
    {
        rank: 0,
        title:"Irie Composer Project",
        description: "Ultra lightweight code editor by me.",
        pathname:"/projects/irie-composer/"
    },
    {
        rank: 0,
        title: "AngelARC",
        description: "Powerful CPU architecture, designed to be a simple load-store register based architecture.",
        pathname: "/projects/aarc/"
    }
];

function __it_GetDistance(data, words) {
    function __it_CountWord(sr, word) {
        let cp = sr;
        let count = 0;

        let i = 0;
        while ((i = cp.lastIndexOf(word)) > -1) {
            alert(i);
            cp = cp.substring(0, i);
            count++;
        }

        return count;
    }
    let grade = 0.0;
    words.forEach((elm) => {
        let a = __it_CountWord(data.title, elm);
        let b = __it_CountWord(data.description, elm);
        let c = __it_CountWord(data.pathname, elm);
        grade += Math.max(a, Math.max(b, c));
        console.log(elm, grade);
    });
    console.log(grade);
    return grade;
}

let SearchEngine = {
    performSearch : function(query) {
        let results = new Array();
        let queryWords = query.split(" ");
    
        for (let i = 0; i < SearchData.length; i++) {
            let data = SearchData[i];
            data.rank = __it_GetDistance(data, queryWords);
            if (data.rank >0 ){
                results.push(data);
            }
        }

        results = results.sort((a, b) => a.rank > b.rank);
        results.forEach(elm => {
            
        })
    },
    onSearchKeyPress : function(event) {
        if (event.keyCode == 13) { 
            event.preventDefault();
            let query = event.target.value.trim();
            if (!window.location.pathname.includes("search.html")) {
                window.location = "/search.html?query="+encodeURI(query);
                return;
            }
            document.title = "\""+ query + "\" - Search";
            SearchEngine.performSearch(query);
        }
    },
    onLoad : function() {
        if (!window.location.pathname.includes("search.html")) {
            return;
        }
        let query = new URLSearchParams(window.location.search).get("query").trim();
        if (query.length > 0) {
            document.title = "\""+ query + "\" - Search";
            SearchEngine.performSearch(query);
        } else {
            document.title = "Search";
        }
        document.querySelector("#searchfld").value = query;
    }
}
window.addEventListener('load', SearchEngine.onLoad);