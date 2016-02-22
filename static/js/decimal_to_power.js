function decimalAdjust(type, value, exp) {
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}
//if (!Math.round10) {
//	Math.round10 = function (value, exp) {
//		return decimalAdjust('round', value, exp);
//	};
//}
//if (!Math.floor10) {
//	Math.floor10 = function (value, exp) {
//		return decimalAdjust('floor', value, exp);
//	};
//}
//if (!Math.ceil10) {
//	Math.ceil10 = function (value, exp) {
//		return decimalAdjust('ceil', value, exp);
//	};
//}

function decimal_to_power(val)
{
    var is_negtive = (val<0);
    if(is_negtive)
    {
        val = -val;
    }
    var i = 0;
    while(val>1){
        val = val/10.0;
        i = i + 1;
    }
    while(val<1){
        val = val * 10.0;
        i = i - 1;
    }
    if(is_negtive)
    {
        val = -val;
    }
    val = decimalAdjust('round', val, -2);
    if (val >= 10)
    {
        val = val/10.0;
        i = i + 1;
    }
    if (i>=0&&i<=1)
    {
        //fixed by selwyn
        //val * Math.pow(10,i) will return a float value like '0.00000000000001'
        //return val * Math.pow(10,i);
        val = val * Math.pow(10,i);
        return decimalAdjust('round', val, -2)
    }
    return val + '×10<sup>'+i+'</sup>';
}