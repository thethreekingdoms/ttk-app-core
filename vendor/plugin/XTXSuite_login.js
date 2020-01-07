// 日期类型格式化方法的定义
Date.prototype.TTKFormat = function (fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1,                 //月份 
		"d+": this.getDate(),                    //日 
		"h+": this.getHours(),                   //小时 
		"m+": this.getMinutes(),                 //分 
		"s+": this.getSeconds(),                 //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds()             //毫秒 
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
/*--------------------------------------------------------------------------  
 *
 * BJCA Adaptive Javascript, Version 2.2
 * This script is compatible with XTXAppCOM BJCASecCOMV2 BJCASecCOM
 * Load COM order by XTXAppCOM BJCASecCOMV2 BJCASecCOM
 * Author:BJCA-zys
 *--------------------------------------------------------------------------*/

/* globals var */
var $_$softCertListID = ""; // Soft CertListID, Set by SetUserCertList
var $_$hardCertListID = ""; // USBKeyCertListID, Set by SetUserCertList
var $_$allCertListID = "";  // All CertListID, Set by SetUserCertList
var $_$loginCertID = "";    // logined CertID, Set by SetAutoLogoutParameter
var $_$logoutFunc = null;   // logout Function, Set by SetAutoLogoutParameter
var $_$onUsbKeyChangeCallBackFunc = null; //custom onUsbkeyChange callback function
var $_$onUsbKeyChangeParentCallBackFunc = null; //custom onUsbkeyChange callback function
var $_$XTXAppObj = null;    // XTXAppCOM class Object
var $_$SecXV2Obj = null;    // BJCASecCOMV2 class Object
var $_$SecXObj = null;      // BJCASecCOM class Object
var $_$CurrentObj = null;   // Current use class Object

// const var
var CERT_TYPE_HARD = 1;
var CERT_TYPE_SOFT = 2;
var CERT_TYPE_ALL = 3;

// const var
var CERT_OID_VERSION = 1;  // 证书版本 返回V1 V2 V3
var CERT_OID_SERIAL = 2;  // 证书序列号
var CERT_OID_SIGN_METHOD = 3;  // 获取证书类型 返回 RSA或SM2
var CERT_OID_ISSUER_C = 4;  // 证书发放者国家名 多个之间用&&&隔开
var CERT_OID_ISSUER_O = 5;  // 证书发放者组织名
var CERT_OID_ISSUER_OU = 6;  // 证书发放者部门名
var CERT_OID_ISSUER_ST = 7;  // 证书发放者省州名
var CERT_OID_ISSUER_CN = 8;  // 证书发放者通用名
var CERT_OID_ISSUER_L = 9;  // 证书发放者城市名
var CERT_OID_ISSUER_E = 10; // 证书发放者EMAIL地址
var CERT_OID_NOT_BEFORE = 11; // 证书有效期起始 格式YYYYMMDDHHMMSS 
var CERT_OID_NOT_AFTER = 12; // 证书有效期截止 格式YYYYMMDDHHMMSS
var CERT_OID_SUBJECT_C = 13; // 用户国家名
var CERT_OID_SUBJECT_O = 14; // 用户组织名
var CERT_OID_SUBJECT_OU = 15; // 用户部门名
var CERT_OID_SUBJECT_ST = 16; // 用户省州名
var CERT_OID_SUBJECT_CN = 17; // 用户通用名
var CERT_OID_SUBJECT_L = 18; // 用户城市名
var CERT_OID_SUBJECT_E = 19; // 用户EMAIL地址
var CERT_OID_PUBKEY = 20; // 证书公钥
var CERT_OID_SUBJECT_DN = 33; // 用户DN
var CERT_OID_ISSUER_DN = 34; // 颁发者DN
var CERT_OID_UNIQUEID = 35; // 唯一实体ID


//内部函数 全部以$开头

//check browser, ie: return true, other return false
function $checkBrowserISIE() {
	if (!!window.ActiveXObject || 'ActiveXObject' in window) {
		return true;
	} else {
		return false;
	}
	//return navigator.userAgent.toLowerCase().search(/(msie\s|trident.*rv:)([\w.]+)/)!= -1;
}

// 填充一个证书列表框
function $oneFillCert(strUserList, certType, strListID) {
	var objListID = eval(strListID);
	if (objListID == undefined) {
		return;
	}
	var i, n = objListID.length;
	for (i = 0; i < n; i++) {
		objListID.remove(0);
	}
	while (1) {
		var i = strUserList.indexOf("&&&");
		if (i <= 0) {
			break;
		}
		var strOneUser = strUserList.substring(0, i);
		var strName = strOneUser.substring(0, strOneUser.indexOf("||"));
		var strCertID = strOneUser.substring(strOneUser.indexOf("||") + 2, strOneUser.length);
		if (CERT_TYPE_ALL == certType) {
			var objItem = new Option(strName, strCertID);
			objListID.options.add(objItem);
		} else {
			var strCertType = GetDeviceType(strCertID);
			if ((CERT_TYPE_HARD == certType && strCertType == "HARD") ||
				(CERT_TYPE_SOFT == certType && strCertType == "SOFT")) {
				var objItem = new Option(strName, strCertID);
				objListID.options.add(objItem);
			}
		}
		var len = strUserList.length;
		strUserList = strUserList.substring(i + 3, len);
	}
	var objListID = null;

	return;
}
//填充证书列表框
function $FillCertList() {
	if ($_$hardCertListID == "" && $_$softCertListID == "" && $_$allCertListID == "") {
		return;
	}

	var strUserList = GetUserList();

	if ($_$hardCertListID != "") {
		$oneFillCert(strUserList, CERT_TYPE_HARD, $_$hardCertListID);
	}

	if ($_$softCertListID != "") {
		$oneFillCert(strUserList, CERT_TYPE_SOFT, $_$softCertListID);
	}

	if ($_$allCertListID != "") {
		$oneFillCert(strUserList, CERT_TYPE_ALL, $_$allCertListID);
	}

	return;
}

//设备插拔时的回调函数
function $OnUsbKeyChange() {
	$FillCertList();
	if (typeof $_$onUsbKeyChangeCallBackFunc == 'function') {
		$_$onUsbKeyChangeCallBackFunc();
	}
	if (typeof $_$onUsbKeyChangeParentCallBackFunc == 'function') {
		$_$onUsbKeyChangeParentCallBackFunc();
	}
	if ($_$loginCertID != "" && typeof $_$logoutFunc == 'function') {
		var strUsrList = GetUserList();
		if (strUsrList.indexOf($_$loginCertID) <= 0) {
			$_$logoutFunc();
		}
	}
}

// IE11下注册监听函数
function $AttachIE11OnUSBKeychangeEvent(strObjName) {
	var handler = document.createElement("script");
	handler.setAttribute("for", strObjName);
	handler.setAttribute("event", "OnUsbKeyChange");
	handler.appendChild(document.createTextNode("$OnUsbKeyChange()"));
	document.body.appendChild(handler);
}

//加载一个控件
function $LoadControl(CLSID, ctlName, testFuncName, addEvent) {
	var pluginDiv = document.getElementById("pluginDiv" + ctlName);
	if (pluginDiv) {
		document.body.removeChild(pluginDiv);
		pluginDiv.innerHTML = "";
		pluginDiv = null;
	}
	pluginDiv = document.createElement("div");
	pluginDiv.id = "pluginDiv" + ctlName;
	document.body.appendChild(pluginDiv);

	try {
		if ($checkBrowserISIE()) {	// IE
			pluginDiv.innerHTML = '<object id="' + ctlName + '" classid="CLSID:' + CLSID + '" style="HEIGHT:0px; WIDTH:0px"></object>';
			if (addEvent) {
				var clt = eval(ctlName);
				if (clt.attachEvent) {
					clt.attachEvent("OnUsbKeyChange", $OnUsbKeyChange);
				} else {// IE11 not support attachEvent, and addEventListener do not work well, so addEvent ourself
					$AttachIE11OnUSBKeychangeEvent(ctlName);
					//clt.addEventListener("OnUsbKeyChange", $OnUsbKeyChange, false);
				}
			}

		} else {
			if (addEvent) {
				pluginDiv.innerHTML = '<embed id=' + ctlName + ' type=application/x-xtx-axhost clsid={' + CLSID + '} event_OnUsbkeyChange=$OnUsbKeyChange style="width:400px; height:100px; border:3px solid black;" />';
			} else {
				pluginDiv.innerHTML = '<embed id=' + ctlName + ' type=application/x-xtx-axhost clsid={' + CLSID + '} style="width:400px; height:100px; border:3px solid black;" />';
			}

			//document.writeln("<embed id='XTXAPP' type=application/x-xtx-axhost clsid={' + CLSID + '} style=\"width: 400px; height: 100px; border: 3px solid black;\" />")

			//document.createElement()
			//pluginDiv.innerHTML = '<iframe><embed id=' + ctlName + ' type=application/x-xtx-axhost clsid={' + CLSID + '} width=0 height=0></embed></iframe>';
		}


		if (testFuncName != null && testFuncName != "") {
			if (eval(ctlName + "." + testFuncName) == undefined) {
				document.body.removeChild(pluginDiv);
				pluginDiv.innerHTML = "";
				pluginDiv = null;
				return false;
			}
		}
		return true;
	} catch (e) {
		//console.log("ActiveXObject dll可能没有注册成功！" + e.message);
		document.body.removeChild(pluginDiv);
		pluginDiv.innerHTML = "";
		pluginDiv = null;
		return false;
	}
}

function $XTXAlert(strMsg) {
	alert(strMsg);
}

//XTXAppCOM class
function CreateXTXAppObject() {
	var bOK = $LoadControl("3F367B74-92D9-4C5E-AB93-234F8A91D5E6", "XTXAPP", "SOF_GetVersion()", true);
	if (!bOK) {
		return null;
	}

	var o = new Object();

	o.GetUserList = function () {
		return XTXAPP.SOF_GetUserList();
	};

	o.GetVersion = function () {
		return XTXAPP.SOF_GetVersion();
	};

	o.ExportUserSignCert = function (strCertID) {
		var strUserCert = XTXAPP.SOF_ExportUserCert(strCertID);
		var strUserExchCert = XTXAPP.SOF_ExportExChangeUserCert(strCertID);
		if (strUserCert == strUserExchCert) {
			return "";
		} else {
			return strUserCert;
		}
	};

	o.ExportUserExchangeCert = function (strCertID) {
		return XTXAPP.SOF_ExportExChangeUserCert(strCertID);
	};

	o.VerifyUserPIN = function (strCertID, strUserPIN) {
		return XTXAPP.SOF_Login(strCertID, strUserPIN);
	};

	o.ChangeUserPIN = function (strCertID, oldPwd, newPwd) {
		return XTXAPP.SOF_ChangePassWd(strCertID, oldPwd, newPwd);
	};

	o.GetUserPINRetryCount = function (strCertID) {
		return XTXAPP.SOF_GetPinRetryCount(strCertID);
	};

	o.GetCertInfo = function (strCert, Type) {
		return XTXAPP.SOF_GetCertInfo(strCert, Type);
	};

	o.GetCertInfoByOID = function (strCert, strOID) {
		return XTXAPP.SOF_GetCertInfoByOid(strCert, strOID);
	};

	o.GetCertEntity = function (strCert) {
		return XTXAPP.SOF_GetCertEntity(strCert);
	};

	o.GenRandom = function (RandomLen) {
		return XTXAPP.SOF_GenRandom(RandomLen);
	};

	o.SignData = function (strCertID, strInData) {
		return XTXAPP.SOF_SignData(strCertID, strInData);
	};

	o.VerifySignedData = function (strCert, strInData, strSignValue) {
		return XTXAPP.SOF_VerifySignedData(strCert, strInData, strSignValue);
	};

	o.PubKeyEncrypt = function (strCert, strInData) {
		return XTXAPP.SOF_PubKeyEncrypt(strCert, strInData);
	};

	o.PriKeyDecrypt = function (strCertID, strInData) {
		return XTXAPP.SOF_PriKeyDecrypt(strCertID, strInData);
	};

	o.SignDataByP7 = function (strCertID, strInData) {
		return XTXAPP.SOF_SignMessage(0, strCertID, strInData);
	};

	o.VerifyDataByP7 = function (strP7Data, strPlainMsg) {
		return XTXAPP.SOF_VerifySignedMessage(strP7Data, strPlainMsg);
	};

	o.EncyptMessage = function (strCert, strInData) {
		return XTXAPP.SOF_EncryptDataEx(strCert, strInData);
	};

	o.DecryptMessage = function (strCertID, strP7Envlope) {
		return XTXAPP.SOF_DecryptData(strCertID, strP7Envlope);
	};

	o.SignFile = function (strCertID, strFilePath) {
		return XTXAPP.SOF_SignFile(strCertID, strFilePath);
	};

	o.VerifySignFile = function (strCert, strFilePath, strSignValue) {
		return XTXAPP.SOF_VerifySignedFile(strCert, strFilePath, strSignValue);
	};

	o.GetSymKeyLength = function () {
		return 24;
	};

	o.SymEncryptData = function (strKey, strInData) {
		return XTXAPP.SOF_SymEncryptData(strKey, strInData);
	};

	o.SymDecryptData = function (strKey, strInData) {
		return XTXAPP.SOF_SymDecryptData(strKey, strInData);
	};

	o.SymEncryptFile = function (strKey, strInFilePath, strOutFilePath) {
		return XTXAPP.SOF_SymEncryptFile(strKey, strInFilePath, strOutFilePath);
	};

	o.SymDecryptFile = function (strKey, strInFilePath, strOutFilePath) {
		return XTXAPP.SOF_SymDecryptFile(strKey, strInFilePath, strOutFilePath);
	};

	o.ValidateCert = function (strCert) {
		var ret = XTXAPP.SOF_ValidateCert(strCert);
		if (ret == 0) {
			return true;
		} else {
			return false;
		}
	};

	o.HashFile = function (strFilePath) {
		return XTXAPP.SOF_HashFile(2, strFilePath); //sha1 alg
	};

	o.GetCertValidYear = function (strCertValid) {
		return strCertValid.substring(0, 4);
	};

	o.GetCertValidMonth = function (strCertValid) {
		return strCertValid.substring(4, 6);
	};

	o.GetCertValidDay = function (strCertValid) {
		return strCertValid.substring(6, 8);
	};

	o.GetDeviceType = function (strCertID) {
		return XTXAPP.GetDeviceInfo(strCertID, 7);
	}

	return o;
}

//SecXV2 class
function CreateSecXV2Object() {
	var bOK = $LoadControl("FCAA4851-9E71-4BFE-8E55-212B5373F040", "SecXV2", "GetUserList()", true);
	if (!bOK) {
		return null;
	}

	var o = new Object();

	o.GetUserList = function () {
		return SecXV2.GetUserList();
	};

	o.ExportUserSignCert = function (strCertID) {
		var strUserCert = SecXV2.ExportUserCert(strCertID);
		var strUserExchCert = SecXV2.ExportExChangeUserCert(strCertID);
		if (strUserCert == strUserExchCert) {
			return "";
		} else {
			return strUserCert;
		}
	};

	o.ExportUserExchangeCert = function (strCertID) {
		return SecXV2.ExportExChangeUserCert(strCertID);
	};

	o.VerifyUserPIN = function (strCertID, strUserPIN) {
		return SecXV2.UserLogin(strCertID, strUserPIN);
	};

	o.ChangeUserPIN = function (strCertID, oldPwd, newPwd) {
		return SecXV2.ChangePasswd(strCertID, oldPwd, newPwd);
	};

	o.GetUserPINRetryCount = function (strCertID) {
		var strExtLib = SecXV2.GetUserInfo(strCertID, 15);
		return SecXV2.GetBjcaKeyParam(strExtLib, 8);
	};

	o.GetCertInfo = function (strCert, Type) {
		return SecXV2.GetCertInfo(strCert, Type);
	};

	o.GetCertInfoByOID = function (strCert, strOID) {
		return SecXV2.GetCertInfoByOid(strCert, strOID);
	};

	o.GetCertEntity = function (strCert) {
		return SecXV2.GetCertInfoByOid(strCert, "2.16.840.1.113732.2");
	};

	o.GenRandom = function (RandomLen) {
		return SecXV2.GenRandom(RandomLen);
	};

	o.SignData = function (strCertID, strInData) {
		return SecXV2.SignData(strCertID, strInData);
	};

	o.VerifySignedData = function (strCert, strInData, strSignValue) {
		return SecXV2.VerifySignedData(strCert, strInData, strSignValue);
	};

	o.PubKeyEncrypt = function (strCert, strInData) {
		return SecXV2.PubKeyEncrypt(strCert, strInData);
	};

	o.PriKeyDecrypt = function (strCertID, strInData) {
		return SecXV2.PriKeyDecrypt(strCertID, strInData);
	};

	o.SignDataByP7 = function (strCertID, strInData) {
		return SecXV2.SignDataByP7(strCertID, strInData);
	};

	o.VerifyDataByP7 = function (strP7Data, strPlainMsg) {
		return SecXV2.VerifySignedDatabyP7(strP7Data);
	};

	o.EncyptMessage = function (strCert, strInData) {
		return SecXV2.EncodeP7EnvelopedData(strCert, strInData);
	};

	o.DecryptMessage = function (strCertID, strP7Envlope) {
		return SecXV2.DecodeP7EnvelopedData(strCertID, strP7Envlope);
	};

	o.SignFile = function (strCertID, strFilePath) {
		return SecXV2.SignFile(strCertID, strFilePath);
	};

	o.VerifySignFile = function (strCert, strFilePath, strSignValue) {
		return SecXV2.VerifySignedFile(strCert, strFilePath, strSignValue);
	};

	o.GetSymKeyLength = function () {
		return 24;
	};

	o.SymEncryptData = function (strKey, strInData) {
		return SecXV2.EncryptData(strKey, strInData);
	};

	o.SymDecryptData = function (strKey, strInData) {
		return SecXV2.DecryptData(strKey, strInData);
	};

	o.SymEncryptFile = function (strKey, strInFilePath, strOutFilePath) {
		return SecXV2.EncryptFile(strKey, strInFilePath, strOutFilePath);
	};

	o.SymDecryptFile = function (strKey, strInFilePath, strOutFilePath) {
		return SecXV2.DecryptFile(strKey, strInFilePath, strOutFilePath);
	};

	o.ValidateCert = function (strCert) {
		return SecXV2.ValidateCert(strCert);
	};

	o.GetCertValidYear = function (strCertValid) {
		return strCertValid.substring(0, 4);
	};

	o.GetCertValidMonth = function (strCertValid) {
		return strCertValid.substring(5, 7);
	};

	o.GetCertValidDay = function (strCertValid) {
		return strCertValid.substring(8, 10);
	};

	return o;
}

//SecXV2 class
function CreateSecXObject() {
	$LoadControl("02BE3F91-A9E1-4D12-A65B-1E0D500292A7", "oCert", "", false);
	$LoadControl("4F763EC7-657A-43A8-96D0-BD3AD6D5E17E", "oCrypto", "", false);
	$LoadControl("D57CD2CA-8FA1-440F-8614-B0A28F64F0BE", "oDevice", "", false);
	var bOK = $LoadControl("BB7D3BAD-A402-4E98-B813-1C3C22481AE7", "oUtil", "getUserList()", false);
	if (!bOK) {
		return null;
	}
	bOK = $LoadControl("0CF5259B-A812-4B6E-9746-ACF7279FEF74", "USBKEY", "EnumUsbKey()", true);
	if (!bOK) {
		return null;
	}

	var o = new Object();

	o.CERT_SRC_BASE64 = 1;		//证书来自Base64字符串
	o.CERT_SRC_UNIQUEID = 2;		//证书来自唯一表示
	o.CERT_SRC_FILE = 3;		//证书来自der文件
	o.CERT_SRC_CONTAINER_UCA = 4;		//证书来自UCA类型证书容器
	o.CERT_SRC_CONTAINER_SIGN = 5;		//证书来自容器下签名证书
	o.CERT_SRC_CONTAINER_ENC = 6;		//证书来自容器下加密证书
	o.CERT_SRC_CONTAINER_BOTH = 7;		//证书来自容器下签名加密证书
	o.CERT_SRC_PKCS12 = 8;		//证书来自PKCS12文件

	o.CERT_DST_BASE64 = 1;		//导出证书为Base64字符串
	o.CERT_DST_DERFILE = 2;		//导出证书为der文件
	o.CERT_DST_P12 = 3;		//到出证书为PKCS12文件

	o.CERT_XML_SUBJECT = 1;		//从XML配置文件取用户名
	o.CERT_XML_UNIQUEID = 2;		//从XML配置文件取用户唯一表识
	o.CERT_XML_DEPT = 3;		//从XML配置文件取用户所有者部门
	o.CERT_XML_ISSUE = 4;		//从XML配置文件取用户证书颁发者
	o.CERT_XML_STATE = 5;		//从XML配置文件取用户证书使用状态
	o.CERT_XML_TRADETYPE = 6;		//从XML配置文件取用户证书应用类型
	o.CERT_XML_PASSWORD = 7;		//从XML配置文件取用户证书私钥保护口令
	o.CERT_XML_DEVICETYPE = 8;		//从XML配置文件取用户证书介质类型
	o.CERT_XML_CATYPE = 9;		//从XML配置文件取用户证书CA类型
	o.CERT_XML_KEYTYPE = 10;		//从XML配置文件取用户证书密钥类型
	o.CERT_XML_SIGNSN = 11;		//从XML配置文件取用户签名证书序列号
	o.CERT_XML_EXCHSN = 12;		//从XML配置文件取用户加密证书序列号
	o.CERT_XML_DEVICENAME = 13;		//从XML配置文件取用户证书介质名称
	o.CERT_XML_DEVICEPROVIDER = 14;		//从XML配置文件取用户证书介质提供者
	o.CERT_XML_DEVICEAFFIX = 15;		//从XML配置文件取用户证书介质附加库
	o.CERT_XML_SIGNPATH = 16;		//从XML配置文件取用户签名证书路径
	o.CERT_XML_EXCHPATH = 17;		//从XML配置文件取用户加密证书路径
	o.CERT_XML_SIGNPFXPATH = 18;		//从XML配置文件取用户签名P12证书路径
	o.CERT_XML_EXCHPFXPATH = 19;		//从XML配置文件取用户加密P12证书路径
	o.CERT_XML_CHAINPATH = 20;		//从XML配置文件取用户证书链路径
	o.CERT_XML_CRLPATH = 21;		//从XML配置文件取用户证书作废列表路径
	o.CERT_XML_UNIQUEIDOID = 22;		//从XML配置文件取用户证书UniqueID的OID
	o.CERT_XML_VERIFYTYPE = 23;		//从XML配置文件取用户证书验证类型
	o.CERT_XML_CACOUNTS = 24;		//从XML配置文件取用户证书根证书个数
	o.CERT_XML_CANUMTYPE = 25;		//从XML配置文件取用户证书跟证书类型

	o.CRYPT_CFGTYPE_UNSET = 0;		//用户应用类型未定义
	o.CRYPT_CFGTYPE_CSP = 1;		//用户应用类型CSP
	o.CRYPT_CFGTYPE_P11 = 2;		//用户应用类型P11
	o.CRYPT_CFGTYPE_P12 = 3;		//用户应用类型软算法

	o.ENVELOP_ENC = 1;		//加密P7数字信封
	o.ENVELOP_DEC = 0;		//解密P7数字信封


	o.GetUserList = function () {
		return USBKEY.getUserList();
	};

	o.ExportUserSignCert = function (strCertID) {
		var strCSPName = USBKEY.getUserInfoByContainer(strCertID, o.CERT_XML_DEVICEPROVIDER);
		var KeyType = USBKEY.getUserInfoByContainer(strCertID, o.CERT_XML_KEYTYPE);
		if (KeyType == 1) {
			oCert.importCert(strCertID, o.CERT_SRC_CONTAINER_ENC, strCSPName);
		} else if (KeyType == 2) {
			oCert.importCert(strCertID, o.CERT_SRC_CONTAINER_SIGN, strCSPName);
		}
		else {
			return "";
		}
		return oCert.exportCert(o.CERT_DST_BASE64);
	};

	o.ExportUserExchangeCert = function (strCertID) {
		var strCSPName = USBKEY.getUserInfoByContainer(strCertID, o.CERT_XML_DEVICEPROVIDER);
		oCert.importCert(strCertID, o.CERT_SRC_CONTAINER_ENC, strCSPName);
		return oCert.exportCert(o.CERT_DST_BASE64);
	};

	o.VerifyUserPIN = function (strCertID, strUserPIN) {
		var strCSPName = USBKEY.getUserInfoByContainer(strCertID, o.CERT_XML_DEVICEPROVIDER);
		var strExtLib = USBKEY.getUserInfoByContainer(strCertID, o.CERT_XML_DEVICEAFFIX);
		var ret = oDevice.userLogin(strCSPName, strUserPIN);
		if (ret == 0) {
			oCrypto.setUserCfg(o.CRYPT_CFGTYPE_CSP, strCSPName, strExtLib, strUserPIN);
			return true;
		} else {
			return false;
		}
	};

	o.ChangeUserPIN = function (strCertID, oldPwd, newPwd) {
		var strCSPName = USBKEY.getUserInfoByContainer(strCertID, o.CERT_XML_DEVICEPROVIDER);
		var strExtLib = USBKEY.getUserInfoByContainer(strCertID, o.CERT_XML_DEVICEAFFIX);
		var ret = oDevice.changeUserPin(strCSPName, strExtLib, oldPwd, newPwd)
		if (ret == 0) {
			oCrypto.setUserCfg(o.CRYPT_CFGTYPE_CSP, strCSPName, strExtLib, newPwd);
			return true;
		} else {
			return false;
		}
	};

	o.GetUserPINRetryCount = function (strCertID) {
		var strExtLib = USBKEY.getUserInfoByContainer(strCertID, o.CERT_XML_DEVICEAFFIX);
		return oDevice.getKeyRetrys(strExtLib);
	};

	o.GetCertInfo = function (strCert, Type) {
		oCert.importCert(strCert, o.CERT_SRC_BASE64);
		var SecXType;
		switch (Type) {
			case CERT_OID_ISSUER_CN:
				SecXType = 4;
				break;
			case CERT_OID_NOT_BEFORE:
				SecXType = 5;
				break;
			case CERT_OID_SUBJECT_C:
				SecXType = 42;
				break;
			case CERT_OID_SUBJECT_O:
				SecXType = 45;
				break;
			case CERT_OID_SUBJECT_OU:
				SecXType = 46;
				break;
			case CERT_OID_SUBJECT_ST:
				SecXType = 44;
				break;
			case CERT_OID_SUBJECT_CN:
				SecXType = 41;
				break;
			case CERT_OID_SUBJECT_L:
				SecXType = 43;
				break;
			case CERT_OID_PUBKEY:
				SecXType = 43;
				break;
			default:
				SecXType = Type;
				break;
		}
		return oCert.getBasicCertInfoByOID(SecXType)
	};

	o.GetCertInfoByOID = function (strCert, strOID) {
		oCert.importCert(strCert, o.CERT_SRC_BASE64);
		return oCert.getExtCertInfoByOID(strOID);
	};

	o.GetCertEntity = function (strCert) {
		oCert.importCert(strCert, o.CERT_SRC_BASE64);
		return oCert.getExtCertInfoByOID("2.16.840.1.113732.2");
	};

	o.GenRandom = function (RandomLen) {
		return oCrypto.generateRandom(RandomLen);
	};

	o.SignData = function (strCertID, strInData) {
		return oCrypto.signedData(strInData, strCertID);
	};

	o.VerifySignedData = function (strCert, strInData, strSignValue) {
		var ret = oCrypto.verifySignedData(strSignValue, strCert, strInData);
		if (ret == 0) {
			return true;
		} else {
			return false;
		}
	};

	o.PubKeyEncrypt = function (strCert, strInData) {
		return oCrypto.EncDataByCert(strCert, strInData);
	};

	o.PriKeyDecrypt = function (strCertID, strInData) {
		return oCrypto.DecDataByRSA(strCertID, strInData);
	};

	o.SignDataByP7 = function (strCertID, strInData) {
		return oCrypto.signedDataByP7(strInData, strCertID);
	};

	o.VerifyDataByP7 = function (strP7Data, strPlainMsg) {
		var ret = oCrypto.verifySignedDataByP7(strP7Data);
		if (ret == 0) {
			return true;
		} else {
			return false;
		}
	};

	o.EncyptMessage = function (strCert, strInData) {
		return oCrypto.envelopedData(strInData, o.ENVELOP_ENC, strCert);
	};

	o.DecryptMessage = function (strCertID, strP7Envlope) {
		return oCrypto.envelopedData(strP7Envlope, o.ENVELOP_DEC, strCertID);
	};

	o.SignFile = function (strCertID, strFilePath) {
		return oCrypto.signFile(strFilePath, strCertID);
	};

	o.VerifySignFile = function (strCert, strFilePath, strSignValue) {
		var ret = oCrypto.verifySignFile(strFilePath, strCert, strSignValue);
		if (ret == 0) {
			return true;
		} else {
			return false;
		}
	};

	o.GetSymKeyLength = function () {
		return 24;
	};

	o.SymEncryptData = function (strKey, strInData) {
		return oCrypto.encryptData(strKey, strInData);
	};

	o.SymDecryptData = function (strKey, strInData) {
		return oCrypto.decryptData(strKey, strInData);
	};

	o.SymEncryptFile = function (strKey, strInFilePath, strOutFilePath) {
		var ret = oCrypto.encryptFile(strInFilePath, strOutFilePath, strKey);
		if (ret == 0) {
			return true;
		} else {
			return false;
		}
	};

	o.SymDecryptFile = function (strKey, strInFilePath, strOutFilePath) {
		var ret = oCrypto.decryptFile(strInFilePath, strOutFilePath, strKey);
		if (ret == 0) {
			return true;
		} else {
			return false;
		}
	};

	o.ValidateCert = function (strCert) {
		var ret = oCert.validateCert("", "");
		if (ret == 0) {
			return true;
		} else {
			return false;
		}
	};

	o.HashFile = function (strFilePath) {
		return oCrypto.HashFile(strFilePath);
	};

	o.GetCertValidYear = function (strCertValid) {
		return strCertValid.substring(0, 4);
	};

	o.GetCertValidMonth = function (strCertValid) {
		return strCertValid.substring(5, 7);
	};

	o.GetCertValidDay = function (strCertValid) {
		return strCertValid.substring(8, 10);
	};

	return o;
}

//Load BJCA Controls
function $LoadBJCACOM() {
	$_$XTXAppObj = CreateXTXAppObject();
	if ($_$XTXAppObj != null) {
		$_$CurrentObj = $_$XTXAppObj;
		return;
	}

	$_$SecXV2Obj = CreateSecXV2Object();
	if ($_$SecXV2Obj != null) {
		$_$CurrentObj = $_$SecXV2Obj;
		return;
	}

	$_$SecXObj = CreateSecXObject();
	if ($_$SecXObj != null) {
		$_$CurrentObj = $_$SecXObj;
		return;
	}

	//$XTXAlert("检查一证通证书应用环境出错，请您先安装一证通证书应用环境!");
	//return;
}

function $onLoadFunc() {

	var xtxappObject = document.getElementById('XTXAPP')
	if (!xtxappObject) {
		$LoadBJCACOM();
		$FillCertList();
	}

	//alert();
}


//对外提供的接口

//add onLoad callback function
function AddOnLoadEvent(func) {
	var oldOnLoad = window.onload;
	if (typeof window.onload != 'function') {
		//window.onload = func;
		$onLoadFunc();
	} else {
		oldOnLoad();
		func();
	}
	return;
}

function $AddLoadEvent(func) {
	var oldOnLoad = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		oldOnLoad();
		func();
	}
	return;
}

//get user list
function GetUserList() {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.GetUserList();
	} else {
		return "";
	}
}

function GetVersion() {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.GetVersion();
	} else {
		return "";
	}
}

function $GetUserListByType(strType) {
	var strUserList = GetUserList();
	var strReturn = "";
	while (1) {
		var i = strUserList.indexOf("&&&");
		if (i <= 0) {
			break;
		}
		var strOneUser = strUserList.substring(0, i);
		var strName = strOneUser.substring(0, strOneUser.indexOf("||"));
		var strCertID = strOneUser.substring(strOneUser.indexOf("||") + 2, strOneUser.length);
		var strCertType = GetDeviceType(strCertID);
		if (strCertType == strType) {
			strReturn += (strOneUser + "&&&");
		}
		var len = strUserList.length;
		strUserList = strUserList.substring(i + 3, len);
	}

	return strReturn;
}
//get usbKey user list
function GetUserList_USBKey() {
	return $GetUserListByType("HARD");
}

//get soft user list
function GetUserList_Soft() {
	return $GetUserListByType("SOFT");
}

//export user signature cert
function GetSignCert(strCertID) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.ExportUserSignCert(strCertID);
	} else {
		return "";
	}
}

//export user exchange cert
function GetExchCert(strCertID) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.ExportUserExchangeCert(strCertID);
	} else {
		return "";
	}
}

//verify user pin
function VerifyUserPIN(strCertID, strUserPIN) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.VerifyUserPIN(strCertID, strUserPIN);
	} else {
		return false;
	}
}

//modify user pin
function ChangeUserPassword(strCertID, oldPwd, newPwd) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.ChangeUserPIN(strCertID, oldPwd, newPwd);
	} else {
		return false;
	}
}

//get user pin retry count
function GetUserPINRetryCount(strCertID) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.GetUserPINRetryCount(strCertID);
	} else {
		return 0;
	}
}

// get cert basic info
function GetCertBasicinfo(strCert, Type) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.GetCertInfo(strCert, Type);
	} else {
		return "";
	}
}

// get cert extend info
function GetExtCertInfoByOID(strCert, strOID) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.GetCertInfoByOID(strCert, strOID);
	} else {
		return "";
	}
}

// get cert entity id
function GetCertEntity(strCert) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.GetCertEntity(strCert);
	} else {
		return "";
	}
}

//generate random 
function GenerateRandom(RandomLen) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.GenRandom(RandomLen);
	} else {
		return "";
	}
}

//sign data
function SignedData(strCertID, strInData) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.SignData(strCertID, strInData);
	} else {
		return "";
	}
}

//verify signed data 
function VerifySignedData(strCert, strInData, strSignValue) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.VerifySignedData(strCert, strInData, strSignValue);
	} else {
		return false;
	}
}

//encrypt data by cert
function PubKeyEncrypt(strCert, strInData) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.PubKeyEncrypt(strCert, strInData);
	} else {
		return "";
	}
}

//decrypt data by private key(not support by gm key)
function PriKeyDecrypt(strCertID, strInData) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.PriKeyDecrypt(strCertID, strInData);
	} else {
		return "";
	}
}

//sign data with pkcs7 format
function SignByP7(strCertID, strInData) {

	if ($_$CurrentObj != null) {
		return $_$CurrentObj.SignDataByP7(strCertID, strInData);
	} else {
		return "";
	}
}

//verify pkcs7 signed data 
function VerifyDatabyP7(strP7Data, strPlainMsg) {
	if ($_$CurrentObj != null) {
		if (arguments.length > 1) {
			return $_$CurrentObj.VerifyDataByP7(strP7Data, strPlainMsg);
		} else {
			return $_$CurrentObj.VerifyDataByP7(strP7Data, "");
		}

	} else {
		return "";
	}
}

//encrypt pkcs7 envlope
function EncodeP7Enveloped(strCert, strInData) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.EncyptMessage(strCert, strInData);
	} else {
		return "";
	}
}

//decrypt pkcs7 envlope
function DecodeP7Enveloped(strCertID, strP7Envlope) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.DecryptMessage(strCertID, strP7Envlope);
	} else {
		return "";
	}
}

//sign file
function SignFile(strCertID, strFilePath) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.SignFile(strCertID, strFilePath);
	} else {
		return "";
	}
}

//verify signed file
function VerifySignFile(strCert, strFilePath, strSignValue) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.VerifySignFile(strCert, strFilePath, strSignValue);
	} else {
		return "";
	}
}

//get symmitric key length 
//because xtx and secxv2 secx default symmitric alg is no equal
function GetSymKeyLength() {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.GetSymKeyLength();
	} else {
		return 24;
	}
}

//encrypt data by symmitric key 
function EncryptData(strKey, strInData) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.SymEncryptData(strKey, strInData);
	} else {
		return "";
	}
}

//decrypt data by symmitric key
function DecryptData(strKey, strInData) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.SymDecryptData(strKey, strInData);
	} else {
		return "";
	}
}

//encrypt file by symmitric key 
function EncryptFile(strKey, strInFilePath, strOutFilePath) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.SymEncryptFile(strKey, strInFilePath, strOutFilePath);
	} else {
		return false;
	}
}

//decrypt file by symmitric key 
function DecryptFile(strKey, strInFilePath, strOutFilePath) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.SymDecryptFile(strKey, strInFilePath, strOutFilePath);
	} else {
		return false;
	}
}

//validate cert
function ValidateCert(strCert) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.ValidateCert(strCert);
	} else {
		return false;
	}
}

//get device type return SOFT or HARD
function GetDeviceType(strCertID) {
	if ($_$CurrentObj != null && $_$CurrentObj.GetDeviceType != undefined) {
		return $_$CurrentObj.GetDeviceType(strCertID);
	} else {
		return "HARD";
	}
}

// calculate file's hash
function HashFile(strFilePath) {
	if ($_$CurrentObj != null) {
		if ($_$CurrentObj.HashFile != undefined) {
			return $_$CurrentObj.HashFile(strFilePath);
		}
	}
	return "";
}

// set auto logout parameters
function SetAutoLogoutParameter(strCertID, logoutFunc) {
	$_$loginCertID = strCertID;
	$_$logoutFunc = logoutFunc;
	return;
}

function SetLoginCertID(strCertID) {
	$_$loginCertID = strCertID;
	return;
}

function SetLogoutFunction(logoutFunc) {
	$_$logoutFunc = logoutFunc;
}

// set user cert list id
function SetUserCertList(strListID, certType) {
	if (arguments.length == 1) {
		$_$hardCertListID = strListID;
	} else {
		if (certType == CERT_TYPE_HARD) {
			$_$hardCertListID = strListID;
		}
		if (certType == CERT_TYPE_SOFT) {
			$_$softCertListID = strListID;
		}
		if (certType == CERT_TYPE_ALL) {
			$_$allCertListID = strListID;
		}
	}

	return;
}

// set custom usbkeychange callback
function SetOnUsbKeyChangeCallBack(callback) {
	$_$onUsbKeyChangeCallBackFunc = callback;

}

function SetOnUsbKeyChangeParentCallBack(callback) {
	$_$onUsbKeyChangeParentCallBackFunc = callback;
}
// get certvalid year
function GetCertValidYear(strCertValid) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.GetCertValidYear(strCertValid);
	}
	return "";
}

// get certvalid month
function GetCertValidMonth(strCertValid) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.GetCertValidMonth(strCertValid);
	}
	return "";
}

function GetCertValidDay(strCertValid) {
	if ($_$CurrentObj != null) {
		return $_$CurrentObj.GetCertValidDay(strCertValid);
	}
	return "";
}

function CheckValid(strUserCert) {
	//检查证书有效期
	var strNotBefore = GetCertBasicinfo(strUserCert, 11);
	var strNotBefore_year = GetCertValidYear(strNotBefore);
	var strNotBefore_month = GetCertValidMonth(strNotBefore);
	var strNotBefore_day = GetCertValidDay(strNotBefore);
	var notBeforeDate = strNotBefore_year + "/" + strNotBefore_month + "/" + strNotBefore_day;
	var nowDate = new Date().TTKFormat("yyyy/MM/dd");
	var days = (Date.parse(notBeforeDate) - Date.parse(nowDate)) / (1000 * 60 * 60 * 24);
	if (days > 0) {
		$XTXAlert("您的证书尚未生效!距离生效日期还剩" + days + "天!");
		return false;
	}

	var strNotAfter = GetCertBasicinfo(strUserCert, 12);
	var strNotAfter_year = GetCertValidYear(strNotAfter);
	var strNotAfter_month = GetCertValidMonth(strNotAfter);
	var strNotAfter_day = GetCertValidDay(strNotAfter);
	var notAfterDate = strNotAfter_year + "/" + strNotAfter_month + "/" + strNotAfter_day;
	var nowDate = new Date().TTKFormat("yyyy/MM/dd");
	days = (Date.parse(notAfterDate) - Date.parse(nowDate)) / (1000 * 60 * 60 * 24);

	if (days < 0) {
		$XTXAlert("您的证书已过期 " + -days + " 天，超过了最后使用期限！\n请到办理证书更新手续。");
		window.open("http://yzt.beijing.gov.cn/zn/info/2014/287.html");
		return false;
	}

	if (days >= 0 && days <= 90) {
		$XTXAlert("您的证书还有" + days + "天过期，\n请您尽快办理证书更新手续。");
		window.open("http://yzt.beijing.gov.cn/zn/info/2014/287.html");
		return true;
	}
	if (days < 0) {
		$XTXAlert("您的证书已过期 " + -days + " 天，\n请尽快到证书更新手续。");
		window.open("http://yzt.beijing.gov.cn/zn/info/2014/287.html");
	}

	return true;
}

//Form login
function XTXAppLogin(strCertID, strPin) {
	// var objForm = eval(strFormName);
	// if (objForm == null) {
	// 	$XTXAlert("Form Error");
	// 	return false;
	// }
	if (strPin == null || strPin == "") {
		$XTXAlert("请输入证书密码！");
		return false;
	}

	//verify user pin
	var ret = VerifyUserPIN(strCertID, strPin);
	if (!ret) {
		var retryCount = GetUserPINRetryCount(strCertID);
		if (retryCount > 0) {
			//$XTXAlert("校验证书密码失败!您还有" + retryCount + "次机会重试!");
			return false;
		} else if (retryCount == 0) {
			//$XTXAlert("您的证书密码已被锁死,请办理证书解锁!");
			window.open("http://yzt.beijing.gov.cn/zn/info/2014/284.html");
			return false;
		} else {
			//$XTXAlert("登录失败!");
			return false;
		}
	}

	//export user signature cert
	var strUserCert = GetSignCert(strCertID);
	if (strUserCert == null || strUserCert == "") {
		$XTXAlert("导出用户证书失败!");
		return false;
	}

	//check cert valid
	// if (!CheckValid(strUserCert)) {
	// 	return false;
	// }


	//verify server signature
	// ret = VerifySignedData(strServerCert, strServerRan, strServerSignedData)
	// if (!ret) {
	// 	$XTXAlert("验证服务器端信息失败!");
	// 	return false;
	// }

	//client sign random
	// var strClientSignedData = SignedData(strCertID, strServerRan);
	// if (strClientSignedData == null || strClientSignedData == "") {
	// 	$XTXAlert("客户端签名失败!");
	// 	return false;
	// }
	//Add a hidden item ...

	//var strSignItem = "<input type=\"hidden\" id=\"UserLoginData\" name=\"UserLoginData\" value='" + strUserCert + "'>";
	//if (objForm.UserLoginData == null) {
	//objForm.insertAdjacentHTML("BeforeEnd", strSignItem);

	//}
	// if (document.getElementById('txtUserLoginData')) {
	// 	document.getElementById('txtUserLoginData').value = strUserCert;
	// }



	// var strSignItem = "<input type=\"hidden\" name=\"UserSignedData\" value=\"\">";
	// if (objForm.UserSignedData == null) {
	// 	objForm.insertAdjacentHTML("BeforeEnd", strSignItem);
	// }
	// var strCertItem = "<input type=\"hidden\" name=\"UserCert\" value=\"\">";
	// if (objForm.UserCert == null) {
	// 	objForm.insertAdjacentHTML("BeforeEnd", strCertItem);
	// }
	// var strContainerItem = "<input type=\"hidden\" name=\"ContainerName\" value=\"\">";
	// if (objForm.ContainerName == null) {
	// 	objForm.insertAdjacentHTML("BeforeEnd", strContainerItem);
	// }

	// objForm.UserSignedData.value = strClientSignedData;
	// objForm.UserCert.value = strUserCert;
	// objForm.ContainerName.value = strCertID;
	//alert(objForm.ContainerName.value);

	return true;
}

// add onload function 
AddOnLoadEvent($onLoadFunc);
