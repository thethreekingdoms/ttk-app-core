import beautify from './beautify'
import json from './json'
import fetch from './fetch'
import number from './number'
import moment from './moment'
import path from './path'
import expression from './expression'
import matrix from './matrix'
import dom from './dom'
import password from './password'
import string from './string'
import exception from './exception'
import tree from './tree'
import history from './history'
import less from './less'
import environment from './environment'
import date from './date'
import eventUtil from './eventUtil'
import { Base64ForDelphi, Base64 } from './base64'
import { CryptoJS } from './des'
import parseHtml from './html2json'
import request from './request'
import xml from './xml'
import sortSearchOption from './sortSearchOption'
import math from './math'
import calculate from './calculate'
import formulaCalc from './formulaCalc'
import form from './form'
import { throttle }  from './throttle'
import {geneUUID} from './uuid/index'
import equal from './equal'

const { FetchRequest } = request;
export default {
	beautify,
	json,
	fetch,
	number,
	string,
	moment,
	path,
	expression,
	matrix,
	dom,
	password,
	exception,
	tree,
	history,
	less,
	environment,
	date,
	eventUtil,
	Base64ForDelphi,
	Base64,
	CryptoJS,
	parseHtml,
	fetchCors: FetchRequest,
	xml,
	sortSearchOption,
	math,
	calculate,
	formulaCalc,
	form,
	throttle,
	geneUUID,
  equal
}
