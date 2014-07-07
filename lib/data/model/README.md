The movalys enumeration implementation looks like the java implementation.

1) To define an enum you have to create a class first.

function MyEnum() {}

2) You have to define the enum with the MFAbstractEnum class

MFAbstractEnum.defineEnum(MyEnum, ['KEY1', 'KEY2', 'KEY3'];

This is the first and easiest way to define an enum.

Here is some example of enumeration usage :

var x = MyEnum.KEY1;
var y = MyEnum.KEY1;
console.log(x === y); // true

var x = MyEnum.KEY1;
var y = MyEnum.KEY2;
console.log(x === y); // false

var x = MyEnum.KEY1;
console.log(typeof x); // MyEnum

var x = MyEnum.KEY1;
console.log(x.key); // KEY1

var x = MyEnum.KEY2;
console.log(x.value); // 1

console.log(MyEnum.values[0] === MyEnum.KEY1); // true

 



