module.exports = ListFilesSummary;


/**
 * The ListLogSummary is returned as a response to getting `git().log()` or `git().stashList()`
 *
 * @constructor
 */
function ListFilesSummary(all) {
    this.all = all;
}

var res ={};

setResult = function (dir){
    if(res[dir[0]] == undefined){
            if(dir.length == 1){
                res[dir[0]]={};
            }else{
                res[dir[0]] ={};
            }

    }
    var padre = res[dir[0]];
    //console.log(padre);
    // console.log(dir[0]);
    for(var i = 1; i<dir.length; i++ ){
       
        if(padre[dir[i]] == undefined){
             if(dir.length-1 == i){
               padre[dir[i]]={};
            }else{
                padre[dir[i]]={};
            }
        }
       if(dir.length-1 != i){
            padre = padre[dir[i]];
       }
    }
    
}

ListFilesSummary.parse = function (text, splitter, fields) {
    this.res = {};
    var files = [];
    var listado = text.split('\n');
    var max = 0;
    listado.forEach(function (element) {
        var dirs = element.split('/');
        if(max < dirs.length){
            max = dirs.length;
        }
       files.push(dirs);
    }, files);
   

        for(var j = 0; j < files.length; j++){
            setResult(files[j]);
        }
    return new ListFilesSummary(res);
};