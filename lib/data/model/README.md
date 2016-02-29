<!--
# Copyright (C) 2016 Sopra Steria Group (movalys.support@soprasteria.com)
#
# This file is part of Movalys MDK.
# Movalys MDK is free software: you can redistribute it and/or modify
# it under the terms of the GNU Lesser General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# Movalys MDK is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU Lesser General Public License for more details.
# You should have received a copy of the GNU Lesser General Public License
# along with Movalys MDK. If not, see <http://www.gnu.org/licenses/>.
-->
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

 



