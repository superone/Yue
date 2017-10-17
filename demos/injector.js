function Injector() {
    this._cache = {};
}
      
Injector.prototype.put = function (name, obj) {
    this._cache[name] = obj;
};
  
Injector.prototype.getParamNames = function (func) {
     var paramNames = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1];
     paramNames = paramNames.replace(/ /g, '');
     paramNames = paramNames.split(',');
     return paramNames;
};
  
Injector.prototype.resolve = function (func, bind) {
     var self = this;
     var paramNames = self.getParamNames(func);
     var params = paramNames.map(function (name) {
         return self._cache[name];
     });
     func.apply(bind, params);
};
  
var injector = new Injector();
  
var student = new Student();
injector.put('notebook', new Notebook());
injector.put('pencil', new Pencil())
injector.resolve(student.write, student); // writing...
//比如现在要执行Student类上的另一个方法function draw(notebook, pencil, eraser)，因为injector的cache中已经有了notebook和pencil对象，我们只需要将额外的eraser也存放到cache中：
function Eraser() {}
Eraser.prototype.printName = function () {
    console.log('this is an eraser');
};
  
// 为Student增加draw方法
Student.prototype.draw = function (notebook, pencil, eraser){
     if (!notebook || !pencil || !eraser) {
        throw new Error('Dependencies not provided!');
     }
     console.log('drawing...');
};

injector.put('eraser', new Eraser());

injector.resolve(student.draw, student);