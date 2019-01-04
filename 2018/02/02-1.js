var x=$0.innerText.split('\n').reduce(function(memo, curr){
	var occur = {}, two=false, three=false;
    curr.split('').forEach(function (c) {if(occur[c]) {occur[c]++} else {occur[c]=1}})
    for(var i ='a'.charCodeAt(0); i < 'z'.charCodeAt(0); i++){
        if(occur[String.fromCharCode(i)] === 2) two=true
        if(occur[String.fromCharCode(i)] === 3) three=true
    }
    if (two) memo.two++;
    if (three) memo.three++;
    return memo
}, {two:0, three:0});
console.log(x.two*x.three)
// WORKS FOR EXAMPLE, BUT NOT FOR ACTUAL INPUT :(
