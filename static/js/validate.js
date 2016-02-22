/*
 * validate.js 1.2.2
 * Copyright (c) 2011 Rick Harrison, http://rickharrison.me
 * validate.js is open sourced under the MIT license.
 * Portions of validate.js are inspired by CodeIgniter.
 * http://rickharrison.github.com/validate.js
 */

/*
 * Modified by Selwyn Shen
 *
 *
 */
(function(window, document, undefined) {
    /*
     * If you would like an application-wide config, change these defaults.
     * Otherwise, use the setMessage() function to configure form specific messages.
     */

    var defaults = {
        messages: {
            required: ' "%s"为必填,请输入！',
            matches: ' %s与%s不一致！',
            //'default'
            def: '%s域仍设置为默认值，请更改！',
            valid_email: '请输入正确%s格式！',
            valid_emails: '％s的字段必须包含有效的电子邮件地址!',
            min_length: '％s文本框中的长度必须至少为％s的字符!',
            max_length: '％s文本框中的长度不能超过％s的字符！',
            exact_length: '％s的字段必须是恰好％s的长度的字符！',
            greater_than: '％s的字段必须包含超过％s的字段！',
            less_than: '％s的字段必须包含超过％s的数目较少！',
            alpha: '%s域必须只包含字母字符!',
            alpha_numeric: '%s字段只能包含字母数字字符！',
            alpha_dash: '％s的域只能包含字母数字字符，下划线和破折号！',
            numeric: '%s字段只能包含数字！',
            integer: '%s域必须包含整数！',
            decimal: '%s域必须包含十进制数！',
            is_natural: '%s字段只能包含正数！',
            is_natural_no_zero: '%s域必须包含大于零的数字！',
            valid_ip: '%s字段必须包含一个有效的IP！',
            valid_base64: '%s字段必须包含Base64编码的字符串！',
            valid_credit_card: '%s域必须包含有效的信用卡号码！',
            is_file_type: '%s字段只能包含%s文件！',
            valid_url: '%s域必须包含一个有效的URL！' ,
            //added
            valid_port: '端口范围从1到65535！' ,
            positive_numeric: '%s域必须是一个正数！'
        },
        callback: function(errors) {
            if(errors.length > 0){
                var errorString = errors[0].message;
//                var errorinput = $("#" + errors[0].id);
                var errorinput = document.getElementById(errors[0].id);
//                errorinput.parent().append("<div id='errornotice'>" + errorString + "</div>");
                var errors = document.getElementById('errors');
                errors.innerHTML=errorString;
                errors.style.display = 'block';
//                errorinput.attr('placeholder',errorString);
                errorinput.onfocus = function(){
                    errors.innerHTML='';
//                    errorinput.parent().find('div#errornotice').remove();
                    errors.style.display = 'none';
//                    errorinput.parent().find('div#errornotice').remove();
                }
            }
        }
//        callback: function(errors) {
//            if(errors.length > 0){
//                alert(errors[0].message);
//            }
//        }
    };

    /*
     * Define the regular expressions that will be used
     */

    var ruleRegex = /^(.+?)\[(.+)\]$/,
        numericRegex = /^[0-9]+$/,
        integerRegex = /^\-?[0-9]+$/,
        decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
        emailRegex = /^[a-zA-Z0-9.!#$%&amp;'*+\-\/=?\^_`{|}~\-]+@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*$/,
        alphaRegex = /^[a-z]+$/i,
        alphaNumericRegex = /^[a-z0-9]+$/i,
        alphaDashRegex = /^[a-z0-9_\-]+$/i,
        naturalRegex = /^[0-9]+$/i,
        naturalNoZeroRegex = /^[1-9][0-9]*$/i,
        ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
        base64Regex = /[^a-zA-Z0-9\/\+=]/i,
        numericDashRegex = /^[\d\-\s]+$/,
    //urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/ ;
        urlRegex = /^(http:\/\/|https:\/\/)[.#!:\d\/\w]+$/ ;

    /*
     * The exposed public object to validate a form:
     *
     * @param formNameOrNode - String - The name attribute of the form (i.e. <form name="myForm"></form>) or node of the form element
     * @param fields - Array - [{
     *     name: The name of the element (i.e. <input name="myField" />)
     *     display: 'Field Name'
     *     rules: required|matches[password_confirm]
     * }]
     * @param callback - Function - The callback after validation has been performed.
     *     @argument errors - An array of validation errors
     *     @argument event - The javascript event
     */

    var FormValidator = function(formNameOrNode, fields,callback) {
            this.callback = callback || defaults.callback;
            this.errors = [];
            this.fields = {};
            this.form = this._formByNameOrNode(formNameOrNode) || {};
            this.messages = {};
            this.handlers = {};

            //added by selwyn
            this.cbFunc = typeof this.callback === 'function';

            for (var i = 0, fieldLength = fields.length; i < fieldLength; i++) {
                var field = fields[i];

                // If passed in incorrectly, we need to skip the field.
                if ((!field.name && !field.names) || !field.rules) {
                    continue;
                }

                /*
                 * Build the master fields array that has all the information needed to validate
                 */

                if (field.names) {
                    for (var j = 0; j < field.names.length; j++) {
                        this._addField(field, field.names[j]);
                    }
                } else {
                    this._addField(field, field.name);
                }
            }

            /*
             * Attach an event callback for the form submission
             */
            /*
             Remove it because our project doesn't need it
             Instead, call '_validateForm(evt)' to do form validation first
             */

        },

        attributeValue = function (element, attributeName) {
            var i;

            if ((element.length > 0) && (element[0].type === 'radio')) {
                for (i = 0; i < element.length; i++) {
                    if (element[i].checked) {
                        return element[i][attributeName];
                    }
                }

                return;
            }

            return element[attributeName];
        };
    /*
     * @private
     * Added by selwyn to provide className operation
     */
    hasClass = function(element,cls)  {
        return element.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
    };
    addClass = function(element,cls)  {
        if(!hasClass(element,cls)){
            element.className += " " + cls;
        }
    };
    removeClass = function(element,cls)  {
        if(hasClass(element,cls)){
            element.className = element.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),'');
        }
    };

    /*
     * @public
     * Sets a custom message for one of the rules
     */

    FormValidator.prototype.setMessage = function(rule, message) {
        this.messages[rule] = message;

        // return this for chaining
        return this;
    };

    /*
     * @public
     * Registers a callback for a custom rule (i.e. callback_username_check)
     */

    FormValidator.prototype.registerCallback = function(name, handler) {
        if (name && typeof name === 'string' && handler && typeof handler === 'function') {
            this.handlers[name] = handler;
        }

        // return this for chaining
        return this;
    };

    /*
     * @private
     * Determines if a form dom node was passed in or just a string representing the form name
     */

    FormValidator.prototype._formByNameOrNode = function(formNameOrNode) {
        return (typeof formNameOrNode === 'object') ? formNameOrNode : document.forms[formNameOrNode];
    };

    /*
     * @private
     * Adds a file to the master fields array
     */

    FormValidator.prototype._addField = function(field, nameValue)  {
        this.fields[nameValue] = {
            name: nameValue,
            display: field.display || nameValue,
            rules: field.rules,
            id: null,
            type: null,
            value: null,
            checked: null
            /*added by selwyn
             *do verification if condition fulfills
             *rName: reference name; rRules: reference rules
             *if value for reference name could fulfill rules, then verfication triggers
             */
            ,join: false||field.join,
            rName: null||field.rName,
            rRules: null||field.rRules
        };
    };

    /*
     * @public
     * Add a new field to validation 
     * 
     * added by selwyn
     */

    FormValidator.prototype.addFields = function(fields)  {
        var field;
        for (var i = 0, fieldLength = fields.length; i < fieldLength; i++){
            field = fields[i];
            var nameValue = field.name;
            // If passed in incorrectly, just ignore
            if (!nameValue  || !field.rules) {
                continue;
            }
            this._addField(field,nameValue);
        }

    };

    /*
     * @private
     * Runs the validation when the form is submitted.
     */

    FormValidator.prototype._validateForm = function(evt) {
        this.errors = [];

        for (var key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
                var field = this.fields[key] || {},
                    element = this.form[field.name];

                if (element && element !== undefined) {
                    field.id = attributeValue(element, 'id');
                    field.type = (element.length > 0) ? element[0].type : element.type;
                    field.value = attributeValue(element, 'value');
                    field.checked = attributeValue(element, 'checked');
                    /*
                     * Run through the rules for each field.
                     */

                    this._validateField(field);
                }
            }
        }

        if (typeof this.callback === 'function') {
            this.callback(this.errors, evt);
        }

        if (this.errors.length > 0) {
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            } else if (event) {
                // IE uses the global event variable
                event.returnValue = false;
            }
            //added by selwyn
                return false;
            }

        return true;
    };

    //added by selwyn
    FormValidator.prototype.formValidate = function() {
        this.errors = [];

        for (var key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
                var field = this.fields[key] || {},
                    element = this.form[field.name];

                if (element && element !== undefined) {
                    field.id = attributeValue(element, 'id');
                    field.type = (element.length > 0) ? element[0].type : element.type;
                    field.value = attributeValue(element, 'value');
                    field.checked = attributeValue(element, 'checked');
                    //added by selwyn
                    if(field.join){
                        var rElement = this.form[field.rName];
                        field.rid = attributeValue(rElement, 'id');
                        field.rValue = attributeValue(rElement, 'value');
                    }

                    /*
                     * If this element is disabled, skip validation
                     * added by selwyn
                     */
                    if(attributeValue(element, 'disabled')=='disabled'){
                        continue;
                    }

                    /*
                     * Run through the rules for each field.
                     */

                    this._validateField(field);

                    if (this.cbFunc) {
                        this.callback(this.errors, this.callback);
                    }

                    if(this.errors.length>0){
                        return false;
                    }
                }
            }
        }

        return true;
    };

    /*
     * @private
     * Looks at the fields value and evaluates it against the given rules
     */

    FormValidator.prototype._validateField = function(field) {
        var rules = field.rules.split('|');

        /*
         * If the value is null and not required, we don't need to run through validation, unless the rule is a callback, but then only if the value is not null
         */

        if ( (field.rules.indexOf('required') === -1 && (!field.value || field.value === '' || field.value === undefined)) && (field.rules.indexOf('callback_') === -1 || field.value === null) ) {
            return;
        }

        /**
         * Added by selwyn
         *
         * if it is a 'join' operation, first make sure it is fufilling the condition
         *
         */
        if(field.join){
            var rRules = field.rRules.split('|');
            for(var i=0,ruleLengh = rRules.length;i<ruleLengh;++i){
                var method = rRules[i],param = null,
                    parts = ruleRegex.exec(method);

                if(parts){
                    method = parts[1];
                    param = parts[2];
                    //added by selwyn
                    //change """" to ""
                    if(param=="\"\""){
                        param = "";
                    }
                }

                if (typeof this._hooks[method] === 'function') {
                    var rField = {
                        name: field.rName,
                        id: field.rid,
                        value: field.rValue
                    };
                    if (!this._hooks[method].apply(this, [rField, param])) {
                        return true;
                    }
                }
            }
        }

        /*
         * Run through the rules and execute the validation methods as needed
         */

        for (var i = 0, ruleLength = rules.length; i < ruleLength; i++) {
            var method = rules[i],
                param = null,
                failed = false,
                parts = ruleRegex.exec(method);

            /*
             * If the rule has a parameter (i.e. matches[param]) split it out
             */

            if (parts) {
                method = parts[1];
                param = parts[2];
            }

            /*
             * If the hook is defined, run it to find any validation errors
             */

            if (typeof this._hooks[method] === 'function') {
                if (!this._hooks[method].apply(this, [field, param])) {
                    failed = true;
                }
            } else if (method.substring(0, 9) === 'callback_') {
                // Custom method. Execute the handler if it was registered
                method = method.substring(9, method.length);

                if (typeof this.handlers[method] === 'function') {
                    if (this.handlers[method].apply(this, [field.value, param]) === false) {
                        failed = true;
                    }
                }
            }

            /*
             * If the hook failed, add a message to the errors array
             */

            if (failed) {
                // Make sure we have a message for this rule
                var source = this.messages[method] || defaults.messages[method],
                    message = 'An error has occurred with the ' + field.display + ' field.';

                if (source) {
                    message = source.replace('%s', field.display);

                    if (param) {
                        message = message.replace('%s', (this.fields[param]) ? this.fields[param].display : param);
                    }
                }

                this.errors.push({
                    id: field.id,
                    name: field.name,
                    message: message,
                    rule: method
                });

                // Break out so as to not spam with validation errors (i.e. required and valid_email)
                break;
            }
        }

        //added by selwyn
        // if validate successfully, remove error style if exists
        //poor design
        //removeClass(document.getElementById(field.id),'errorField');
    };

    /*
     * @private
     * Object containing all of the validation hooks
     */

    FormValidator.prototype._hooks = {
        required: function(field) {
            var value = field.value;

            if ((field.type === 'checkbox') || (field.type === 'radio')) {
                return (field.checked === true);
            }

            return (value !== null && value !== '');
        },

        //'default
        def: function(field, defaultName){
            return field.value !== defaultName;
        },

        matches: function(field, matchName) {
            var el = this.form[matchName];

            if (el) {
                return field.value === el.value;
            }

            return false;
        },

        valid_email: function(field) {
            return emailRegex.test(field.value);
        },

        valid_emails: function(field) {
            var result = field.value.split(",");

            for (var i = 0; i < result.length; i++) {
                if (!emailRegex.test(result[i])) {
                    return false;
                }
            }

            return true;
        },

        min_length: function(field, length) {
            if (!numericRegex.test(length)) {
                return false;
            }

            return (field.value.length >= parseInt(length, 10));
        },

        max_length: function(field, length) {
            if (!numericRegex.test(length)) {
                return false;
            }

            return (field.value.length <= parseInt(length, 10));
        },

        exact_length: function(field, length) {
            if (!numericRegex.test(length)) {
                return false;
            }

            return (field.value.length === parseInt(length, 10));
        },

        greater_than: function(field, param) {
            if (!decimalRegex.test(field.value)) {
                return false;
            }

            return (parseFloat(field.value) > parseFloat(param));
        },

        less_than: function(field, param) {
            if (!decimalRegex.test(field.value)) {
                return false;
            }

            return (parseFloat(field.value) < parseFloat(param));
        },

        alpha: function(field) {
            return (alphaRegex.test(field.value));
        },

        alpha_numeric: function(field) {
            return (alphaNumericRegex.test(field.value));
        },

        alpha_dash: function(field) {
            return (alphaDashRegex.test(field.value));
        },

        numeric: function(field) {
            return (numericRegex.test(field.value));
        },

        integer: function(field) {
            return (integerRegex.test(field.value));
        },

        decimal: function(field) {
            return (decimalRegex.test(field.value));
        },

        is_natural: function(field) {
            return (naturalRegex.test(field.value));
        },

        is_natural_no_zero: function(field) {
            return (naturalNoZeroRegex.test(field.value));
        },

        valid_ip: function(field) {
            return (ipRegex.test(field.value));
        },

        valid_base64: function(field) {
            return (base64Regex.test(field.value));
        },

        valid_url: function(field) {
            return (urlRegex.test(field.value));
        },

        valid_credit_card: function(field){
            // Luhn Check Code from https://gist.github.com/4075533
            // accept only digits, dashes or spaces
            if (!numericDashRegex.test(field.value)) return false;

            // The Luhn Algorithm. It's so pretty.
            var nCheck = 0, nDigit = 0, bEven = false;
            var strippedField = field.value.replace(/\D/g, "");

            for (var n = strippedField.length - 1; n >= 0; n--) {
                var cDigit = strippedField.charAt(n);
                nDigit = parseInt(cDigit, 10);
                if (bEven) {
                    if ((nDigit *= 2) > 9) nDigit -= 9;
                }

                nCheck += nDigit;
                bEven = !bEven;
            }

            return (nCheck % 10) === 0;
        },

        is_file_type: function(field,type) {
            if (field.type !== 'file') {
                return true;
            }

            var ext = field.value.substr((field.value.lastIndexOf('.') + 1)),
                typeArray = type.split(','),
                inArray = false,
                i = 0,
                len = typeArray.length;

            for (i; i < len; i++) {
                if (ext == typeArray[i]) inArray = true;
            }

            return inArray;
        },

        //added by selwyn
        valid_port: function(field) {
            return (field.value>=1&&field.value<=65535);
        },
        positive_numeric :function(field) {
            return field.value>=0;
        }
    };

    window.FormValidator = FormValidator;

})(window, document);
