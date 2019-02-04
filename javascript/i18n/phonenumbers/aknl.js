/**
 * Custom script for www.autokopen.nl
 *
 */

goog.require('goog.string.StringBuffer');
goog.require('i18n.phonenumbers.PhoneNumberUtil');


/**
 * phoneNumberParser
 * @constructor
 */
function phoneNumberParser(value) {
    this.phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    this.value = value;
    this.logger = new goog.string.StringBuffer();
}

phoneNumberParser.prototype = {

    parse: function(country) {
        var phoneNumber;

        try {
            phoneNumber = this.phoneUtil.parse(this.value, country);
        } catch (e) {
            if (country) {
                this.logger.append(e + '\n');
            }
            phoneNumber = null;
        }
        return phoneNumber;
    },

    is_valid: function() {
        var phoneNumber, is_valid;

        phoneNumber = this.parse('');
        if (!phoneNumber) {
            phoneNumber = this.parse('NL');
            this.logger.append('Parsed with country code NL\n');
            if (!phoneNumber) {
                this.logger.append('Could not parse number\n');
                return null;
            }
        }
        else {
            this.logger.append('Parsed without country code\n');
        }
        is_valid = this.phoneUtil.isValidNumber(phoneNumber);
        if (is_valid) {
            this.logger.append('The number is valid\n');
        }
        else {
            this.logger.append('The number is invalid\n');
        }
        return is_valid;
    },

    log: function() {
        return this.logger.toString();
    }

}

function isValidPhoneNumber(value, logger) {
    var parser, is_valid;

    parser = new phoneNumberParser(value);
    is_valid = parser.is_valid();
    if (logger !== undefined) {
        logger(parser.log());
    }
    return is_valid;
}

goog.exportSymbol('isValidPhoneNumber', isValidPhoneNumber);
