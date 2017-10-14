export default function( name , obj , own , tools){    
    //own[ name ] = obj;
    let propsName  = tools.clsNames.propsName;
    let _props_ = own[ propsName ];

    if( tools.util.isFunction(obj) ){
        let oriName = obj.name;

        if( !_props_[name] ){
            _props_[name] = {
                target : obj,
                type : tools.util.getType( obj ),
                specis : tools.util.resOptKey( oriName ),
                scope : own
            };
        }

        tools.util._definedPros( own , name , {
            get(){
                return ()=>{
                    let scope = this[propsName][name].scope ? 
                                this[propsName][name].scope :
                                own;
                    this[propsName][name].target.applay(scope , arguments );
                }
            }
        });
    }

    return obj;
}