export default function( prm , isBase ,tools ){
    let name = prm.name;
    let obj = prm.obj;
    let own = prm.own;
    let res = prm.resKey;
    let Cls = prm.cls;
    //own[ name ] = obj;
    
    let optionName = tools.clsNames.optionsName;
    let superName = tools.clsNames.superName;

    if( tools.util.isFunction(obj) ){
        let oriName = obj.name;
        //fn object
        let opt = {
            target : obj,
            type : tools.util.getType( obj ),
            res : res ,
            scope : own,
            args : [],
            Cls
        };

        let fn = createMethod( opt );
        let inj = [];

        //let Super = function(){};/*opt.Cls[ optionName ] && opt.Cls[ optionName ][ superName ] ||*/
        
        inj = inj.concat( res.injects );
        //inj = inj.concat([Super]);

        function fnInjects( Arguments ){

            let Super = function(){
                return function(){
                    console.log('Im Super.');
                    console.log(this); 
                }.apply( own , Arguments);
            }

            let args = inj.concat( res.injects );
            args.push(Super);
            args.push(Arguments);

            let fnArgs = Array.prototype.slice.call( Arguments , 0 );

            opt.args.forEach( ( v , i )=>{
                fnArgs[i] = typeof fnArgs[i] === 'undefined' ? undefined : fnArgs[i];
            });

             fnArgs = fnArgs.slice(0 , opt.args.length);
             fnArgs = fnArgs.concat( args );
             return fnArgs;

        }

        tools.util._definedPros( own , name , {
            get(){
                return function(){
                    return fn.apply( opt.scope , fnInjects( arguments ) );
                }
            }
            // ,
            // set(){
            //     console.warn("Can't set method!");
            // }
        });

    }else{
        own[ name ] = obj;
    }

    return obj;
}

/**
 * 
 * 返回方法句柄 
 */
function createMethod( opt ){

    let target = opt , tmpStr="";
    let scope = target.scope ;

    let fn = target.target , fnArgs;
    let fnStr = fn.toString().trim() , fnBody="" , args = [];
    //如果不是以匿名方式定义
    if( fnStr.substring(0, 8) != 'function' ){
        fnStr = 'function' + fnStr.substring(fn.name.length);
    }

    let reg = /(?:\/\*[\s\S]*?\*\/|\/\/.*?\r?\n|[^{])+\{([\s\S]*)\}$/;
    let regP = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    // if( !regP.test(fnStr) ){
    //     regP = new RegExp(["^",fn.name,'\s*[^\(]*\(\s*([^\)]*)\)'].join('') , 'm');
    // }
    args = fnStr.match( regP )[1].replace(/\s/g, '').split(',');
    let i = args.length;

    while(i--){
        if( args[i] === "")
        args.splice(i,1);
    }

    // args = args.map(function( v ){
    //     return v ? ['\'' , v , '\''].join('') : v;
    // });
    
    opt.args = args.map(function(v){return v;});

    args.push('Super');
    args.push('arguments');
    if( reg.test(fnStr) ){
        fnBody = reg.exec(fnStr)[1];
        fn = new Function(...args , fnBody);
        //tmpStr = ["new Function(", (args.toString() ? args.toString()+',' : "") , "fnBody)"].join('');
        //fn = eval(tmpStr);  // new Function('Super' , 'fnBody' , fnBody );
        console.log(fn);
    }

    return fn;

}