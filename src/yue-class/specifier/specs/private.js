export default function( prm , isBase ,tools ){
    let name = prm.name;
    let obj = prm.obj;
    let own = prm.own;
    let res = prm.resKey;
    //own[ name ] = obj;
    let propsName  = tools.clsNames.propsName;
    let _props_ = own[ propsName ];

    if( tools.util.isFunction(obj) ){
        let oriName = obj.name;
        //fn object
        let opt = {
            target : obj,
            type : tools.util.getType( obj ),
            res : res ,
            scope : own,
            args : []
        };

        let fn = getMethod( opt );

        tools.util._definedPros( own , name , {
            get(){
                return ()=>{
                    //create arguments
                    let fnArgs = Array.prototype.slice.call(arguments , 0);
                    let argLength = fnArgs.length;
                    for(let i=0 , len= opt.args.length; i<len; i++){
                        if(typeof fnArgs[i] === 'undefined'){
                            fnArgs[i] = undefined;
                        }
                    }

                    fnArgs.push( function(){console.log('this is super')} );
                    fnArgs.push("This is fnBody-txt");

                    fn.apply( opt.scope , fnArgs );
                }
            }
        });
    }

    return obj;
}

function getMethod( opt ){

    let target = opt , tmpStr="";
    let scope = target.scope ;

    let fn = target.target , fnArgs;
    let fnStr = fn.toString() , fnBody="" , args = [];
    let reg =  /(?:\/\*[\s\S]*?\*\/|\/\/.*?\r?\n|[^{])+\{([\s\S]*)\}$/;
    let regP = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    args = fnStr.match( regP )[1].replace(/\s/g, '').split(',');
    let i = args.length;

    while(i--){
        if( args[i] === "")
        args.splice(i,1);
        
    }
    args = args.map(function( v ){
        return v ? ['\'' , v , '\''].join('') : v;
    });
    opt.args = args.map(function(v){return v;});

    args.push('\'Super\'');
    if( reg.test(fnStr) ){
        fnBody = reg.exec(fnStr)[1];
        fnBody += ";console.log('this is new fnBody');";
        fnBody += "console.log(fnBody);";

        tmpStr = ["new Function(", (args.toString() ? args.toString()+',' : "") , "'fnBody',fnBody)"].join('');
        fn = eval(tmpStr);// new Function('Super' , 'fnBody' , fnBody );
    }

    return fn;
}