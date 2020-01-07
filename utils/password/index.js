function analyzeSecurityLevel(password) {
    var pwdArray = new Array();
    var securityLevelFlag = 1;
    if (password.length < 6) {
        return 1;
    }
    else {
        var securityLevelFlagArray = new Array(0, 0, 0, 0);
        for (var i = 0; i < password.length; i++) {
            var asciiNumber = password.substr(i, 1).charCodeAt();
            if (asciiNumber >= 48 && asciiNumber <= 57) {
                securityLevelFlagArray[0] = 1;  //digital
            }
            else if (asciiNumber >= 97 && asciiNumber <= 122) {
                securityLevelFlagArray[1] = 1;  //lowercase
            }
            else if (asciiNumber >= 65 && asciiNumber <= 90) {
                securityLevelFlagArray[2] = 1;  //uppercase
            }
            else {
                securityLevelFlagArray[3] = 1;  //specialcase
            }
        }

        for (var i = 0; i < securityLevelFlagArray.length; i++) {
            if (securityLevelFlagArray[i] == 1) {
                securityLevelFlag++;
            }
        }
        return securityLevelFlag;
    }
}

export default {
    analyzeSecurityLevel
}