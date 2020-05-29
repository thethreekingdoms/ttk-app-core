/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import {
  fetch
} from 'edf-utils'
import {
  debug
} from 'util';
import Mock from 'mockjs'

const mockproxy = '/v1/fxmxrule/tree-dialog'

fetch.mock(`${mockproxy}/thead`, (option) => {
  return {
    value: [{
      dataIndex: 'userId',
      title: '用户ID'
    }, {
      title: '用户类型',
      dataIndex: 'userType',
    }, {
      title: '服务号码',
      dataIndex: 'encode'
    }, {
      title: '用户名称',
      dataIndex: 'userName'
    }, {
      title: '邮箱',
      dataIndex: 'email'
    }, {
      title: '手机号',
      dataIndex: 'mobilePhone'
    }, {
      title: '启用',
      dataIndex: 'isValid'
    }, {
      title: '部门',
      dataIndex: 'channel'
    }, {
      title: '创建者ID',
      dataIndex: 'createUser'
    }, {
      title: '所属部门',
      dataIndex: 'depName'
    }, {
      title: '所属部门ID',
      dataIndex: 'depId'
    }, {
      title: '用户岗位',
      dataIndex: 'dutiesName'
    }],
    result: true
  }
})
// mock(url, function)， function必须返回你要的值
fetch.mock(`${mockproxy}/tableBody`, (option) => {
  const recordCount = 101
  const {
    pageIndex,
    pageSize
  } = option.pager
  const pageCount = Math.ceil(recordCount / pageSize)
  const data = mockList().list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
  return {
    result: true,
    value: {
      pager: {
        pageIndex,
        pageSize,
        recordCount,
        pageCount
      },
      data
    }
  }
})


fetch.mock(`${mockproxy}/treeData`, (option) => {
  return {
    result: true,
    value: [{
      functioinId: "1",
      name: "菜单权限列表",
      url: "#",
      parentId: "0",
      imageUrl: "fa fa-stack-exchange",
      subNodeFlag: "1"
    }]
  }
})

fetch.mock(`${mockproxy}/subTreeData`, (option) => {
  return {
    result: true,
    value: [{
      "functioinId": "bcc9150bdf8d45e7a009a68c2172d583",
      "name": "调度中心",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "1"
    }, {
      "functioinId": "72fa1d528b4d4bb68285b8b5ecd67e2f",
      "name": "监控告警",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "1"
    }, {
      "functioinId": "dd03f2954b704b61847e8322451cd82d",
      "name": "文件中心",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "1"
    }, {
      "functioinId": "1a78cdc265af4c59bff40ca3f0f12e7a",
      "name": "应用管理",
      "url": "#",
      "parentId": "1",
      "imageUrl": "iconfont fsicon-yingyongzhongxin",
      "subNodeFlag": "1"
    }, {
      "functioinId": "62f9bbf372a34e76b089825c577d2059",
      "name": "开放API",
      "url": "#",
      "parentId": "1",
      "imageUrl": "iconfont fsicon-APIwangguan",
      "subNodeFlag": "1"
    }, {
      "functioinId": "55afa4fb9c44430eb0b8d007f21dcc80",
      "name": "使用API",
      "url": "#",
      "parentId": "1",
      "imageUrl": "iconfont fsicon-APIwangguan",
      "subNodeFlag": "1"
    }, {
      "functioinId": "f88c9f6afe17454e84951f31a12193c2",
      "name": "运维监控",
      "url": "#",
      "parentId": "1",
      "imageUrl": "iconfont fsicon-yonghutongji",
      "subNodeFlag": "1"
    }, {
      "functioinId": "d5b90098e2af4b66bd24af27201d938a",
      "name": "服务商管理",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "1"
    }, {
      "functioinId": "3b6aa9472a5845c78fbde61786056fa7",
      "name": "服务管理",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "1"
    }, {
      "functioinId": "c4cd8e74c5a841bf86fba0a5bb3dddb4",
      "name": "订单管理",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "1"
    }, {
      "functioinId": "16ad3b6493014cf6af8c60660e8613c7",
      "name": "客户管理",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "1"
    }, {
      "functioinId": "24fb61f2ceb542b78d0fe67db7c30eb0",
      "name": "日志中心",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "1"
    }, {
      "functioinId": "5bc0b657fc9a4e02af66d713c1a19ad4",
      "name": "v-机构管理",
      "url": "/org-manage",
      "parentId": "1",
      "imageUrl": "icon iconfont fsicon-lieshezhi",
      "subNodeFlag": "1"
    }, {
      "functioinId": "d5b6fd776543452a962a6f09a436518e",
      "name": "服务商中心",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "1"
    }, {
      "functioinId": "0cdb62a3bd3a479ca0f26e7eb66a769c",
      "name": "机构管理",
      "url": "#",
      "parentId": "1",
      "imageUrl": "iconfont fsicon-yingyongpeizhi",
      "subNodeFlag": "1"
    }, {
      "functioinId": "bd6107e3faa84e30ad4076a7d58a0caa",
      "name": "流程中心",
      "url": "#",
      "parentId": "1",
      "imageUrl": "iconfont fsicon-duijieshezhi",
      "subNodeFlag": "1"
    }, {
      "functioinId": "4044610b3a504028a935978e4df10b05",
      "name": "系统管理",
      "url": "#",
      "parentId": "1",
      "imageUrl": "iconfont fsicon-xitongguanli",
      "subNodeFlag": "1"
    }, {
      "functioinId": "283eec11ad9a4a6a8d4fa7f2051f7007",
      "name": "v-1级菜单",
      "url": "/one-leve-menu",
      "parentId": "1",
      "imageUrl": "iconfont fsicon-weibiaoti25",
      "subNodeFlag": "1"
    }, {
      "functioinId": "b3f7660694d24dcb96b5f2b57fd39f7f",
      "name": "税检-企业管理",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "1"
    }, {
      "functioinId": "4e752801d7ca42fab0e61f645039372d",
      "name": "税检-风险模型",
      "url": "#",
      "parentId": "1",
      "imageUrl": "iconfont fsicon-xitongguanli",
      "subNodeFlag": "1"
    }, {
      "functioinId": "a11b6809a1534983aa5554189906ebdb",
      "name": "v-配置管理",
      "url": "/config-manager",
      "parentId": "1",
      "imageUrl": "fsicon-btn-set",
      "subNodeFlag": "1"
    }, {
      "functioinId": "5e1023e44fa647ffb9a8025ba4dd1d99",
      "name": "税检-系统管理",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "1"
    }, {
      "functioinId": "c8bdd48958c449a78f4261e1cbc29d58",
      "name": "税检-指标库",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "1"
    }, {
      "functioinId": "d54407ce0ed94ccf9f41bf046c27cbd8",
      "name": "日志管理",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "1"
    }, {
      "functioinId": "929cb343ede54874926bdfeb0428fb27",
      "name": "金牛风控-iframes",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "1"
    }, {
      "functioinId": "e5efbf75dc6944709d6e0d0e3c15b1bf",
      "name": "税检-三方授权",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "1"
    }, {
      "functioinId": "dd6d7f55583a41d5a1241e5f9ebc2486",
      "name": "v-订单管理",
      "url": "/order",
      "parentId": "1",
      "imageUrl": "fsicon-guiyuanji",
      "subNodeFlag": "1"
    }, {
      "functioinId": "17dda8e5c0e74fff8e6847a4f3f2c492",
      "name": "主页权限",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "0"
    }, {
      "functioinId": "e3bdcd8aec2d4f70b5a0777000008c6b",
      "name": "短信中心",
      "url": "#",
      "parentId": "1",
      "imageUrl": "iconfont fsicon-duanxinzhongxin",
      "subNodeFlag": "1"
    }, {
      "functioinId": "ebc3ebb7823042a5a485e0f80a67c645",
      "name": "配置管理",
      "url": "#",
      "parentId": "1",
      "subNodeFlag": "1"
    }]
  }
})

function mockList() {
  return Mock.mock({
    'list|101': [{
      userId: "@integer(-100000, 100000)",
      userType: "@ctitle(4)",
      encode: "@increment",
      userName: "@cname",
      email: "123456@qq.com",
      mobilePhone: "15800003248",
      isValid: "@cparagraph(1, 2)",
      channel: "win",
      createUser: "1",
      createDate: "@datetime(yyyy-MM-dd)",
      updateUser: "1",
      updateDate: "@datetime",
      depName: "@cparagraph(4)",
      depId: "1",
      dutiesName: "运营端管理员岗位,主管理员,开放平台配置岗,服务商管理员岗位,运营岗位测试",
      depUserId: "0ec47f6cd1c54c0dbed81255d4f84ce6"
    }]
  })
}

// mock(url, function)， function必须返回你要的值
fetch.mock(`${mockproxy}/iotable`, (option) => {
  const recordCount = 30
  const {
    pageIndex,
    pageSize
  } = option.pager
  const pageCount = Math.ceil(recordCount / pageSize)
  const data = mockIOTable().list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
  return {
    result: true,
    value: {
      pager: {
        pageIndex,
        pageSize,
        recordCount,
        pageCount
      },
      data
    }
  }
})

function mockIOTable() {
  return Mock.mock({
    'list|2': [{
      id: "@integer(-100000, 100000)",
      quota: "@ctitle(4)",
      io: "@integer(0,2)",
    }]
  })
}

// mock(url, function)， function必须返回你要的值
fetch.mock(`${mockproxy}/filtercriteriatable`, (option) => {
  const recordCount = 30
  const {
    pageIndex,
    pageSize
  } = option.pager
  const pageCount = Math.ceil(recordCount / pageSize)
  const data = mockFilterCriteriaTable().list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
  return {
    result: true,
    value: {
      pager: {
        pageIndex,
        pageSize,
        recordCount,
        pageCount
      },
      data
    }
  }
})

function mockFilterCriteriaTable() {
  return Mock.mock({
    'list|2': [{
      id: "@integer(-100000, 100000)",
      quota: "@ctitle(4)",
      compareSymbol: "@integer(0,3)",
      value: "@ctitle(0,3)",
    }]
  })
}

/********规则设置模块 */
// mock(url, function)， function必须返回你要的值
fetch.mock(`${mockproxy}/conditionstable`, (option) => {
  const recordCount = 30
  const {
    pageIndex,
    pageSize
  } = option.pager
  const pageCount = Math.ceil(recordCount / pageSize)
  const data = mockConditionsTable().list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
  return {
    result: true,
    value: {
      pager: {
        pageIndex,
        pageSize,
        recordCount,
        pageCount
      },
      data
    }
  }
})

function mockConditionsTable() {
  return Mock.mock({
    'list|2': [{
      id: "@integer(-100000, 100000)",
      requirementId: "@integer(-100000, 100000)",
      ruleId: "@integer(-100000, 100000)",
      expresstionCode: "${A}>30%",
      expresstionText: "税负率>30%",
      conditions: "@ctitle(4)",
      // result: {
      satisfyResult: '@FIRST',
      dissatisfyResult: '@LAST',
      exceptionResult: '@first @middle @last'
      // },
    }]
  })
}