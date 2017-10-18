
class Base {
    private name : string;

    private show(){
        console.log('Its show');
    }

    showName (){
        console.log(name);
        this.show();
    }

    sex : Object = {
        a : {
            c : 'fds',
            d : 'fd'
        }
    };

    constructor(){
        this.name = "chenbo";
    }
}


class Ext extends Base{
    private firstName : string;

    title : string = "manager";

    constructor(){
        super();
    }

    showName(){
        super.showName();
        console.log('fds');
    }

}


var ext = new Ext();