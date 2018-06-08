import fetch from './fetch.js'
import * as types from '../store/types.js'
import store from '../store/store'
import Cookies from 'js-cookie';
import qs from 'qs';
//用户登录
const login = params => {
  return fetch({
    url: types.URL + types.USER_API_PREFIX + '/login',
    method: 'post',
    data: {
      "login_name": params.name,
      "login_passwd": params.password,
    }
  })
};
//获取子账户列表
const userAccount = () => {
  return fetch({
    url: types.URL + types.USER_API_PREFIX + '/query_user_account',
    method: 'post',
    data: {
    }
  })
};
//查询群发短信记录
const smsRecord = params => {
  return fetch({
    url: types.URL + types.SMS_API_PREFIX + `/sms_record`,
    method: 'post',
    data: {
      "page_num": params.page_num,
      "page_size": params.page_size,
      "query_date": params.query_date,
      "sms_type": params.sms_type,
      "smsType": params.smsType,
      "send_status":params.send_status,
      "sms": params.sms,
      "pname": params.pname,
      "orig_sms":params.orig_sms,
      "sms_type":params.sms_type,
    }
  })
};
//模板列表
const queryTpl = params => {
  return fetch({
    url: types.URL + types.SMS_API_PREFIX + `/query_tpl_list`,
    method: 'post',
    data: {
      "page_num": params.page_num,
      "page_size": params.page_size,
      "query_date": params.query_date,
      "sms_type": params.sms_type,
      "tpl_content": params.tpl_content,
      "audit_tatic": params.audit_tatic,
      "pname": params.pname,
      "stid": params.stid
    }
  })
};

//获取公共模板
const queryCommonTpl = () => {
  return fetch({
    url: types.URL + types.SMS_API_PREFIX + `/query_common_tpl`,
    method: 'post',
    data: {
    }
  })
};
//添加模板
const addSmsTpl = params => {
  let content = "";
  if (params.sms_type == '10') {
    // content = params.tpl_content + " 回T退订";
    content = params.tpl_content;
  } else {
    content = params.tpl_content;
  }
  return fetch({
    url: types.URL + types.SMS_API_PREFIX + `/add_sms_tpl`,
    method: 'post',
    data: {
      "pname": params.pname,
      "sms_type": params.sms_type,
      "tpl_content": content,
      "status_remind": params.status_remind
    }
  })
};
//审批模板模板
const auditSmsTpl = params => {
  return fetch({
    url: types.URL + types.ADMIN_API_PREFIX + `/audit_tpl`,
    method: 'post',
    data: {
      "pname": params.pname,
      "mobile_cid": params.mobile_cid,
      "mobile_sign": params.mobile_sign,
      "unicom_cid:": params.unicom_cid,
      "unicom_sign": params.unicom_sign,
      "telecom_cid": params.telecom_cid,
      "telecom_sign": params.telecom_sign,
      "sms_type": params.sms_type,
      "audit_status": params.audit_status,
      "stid": params.stid,
      "tpl_context": params.tpl_context,
      "without_audit": params.without_audit,
      "audit_desc": params.audit_desc
    }
  })
};
//批量发送
const batchSend = params => {
  let content = "";
  if (params.sms_type == '10') {
    content = params.sms + "";
  } else {
    content = params.sms;
  }
  return fetch({
    loading:true,
    url: types.URL + types.SMS_API_PREFIX + `/batch_send`,
    method: 'post',
    data: {
      "pname": params.pname,
      "sms": content,
      "mobile": params.mobile,
      "sms_type":params.sms_type,
      "plan_send_time": params.plan_send_time,
      "upload_no": params.upload_no,
      // "status_remind": params.status_remind
    },
  })
};
//获取渠道
const getChannels = () => {
  return fetch({
    url: types.URL + types.SMS_API_PREFIX + `/channel_list`,
    method: 'post',
    data: {
      "token_no":Cookies.get("sp_dmp_token"),
      "uid":  Cookies.get("sp_dmp_uid"),
    }
  })
};
//获取短信详情(审批)
const auditDetail = params => {
  return fetch({
    url: types.URL + types.ADMIN_API_PREFIX + `/audit_detail`,
    method: 'post',
    data: {
      "srid": params
    }
  })
};
//审批短信
const audit = params => {
  return fetch({
    url: types.URL + types.ADMIN_API_PREFIX + `/audit`,
    method: 'post',
    data: {
      "srid": params.srid,
      "sms": params.sms,
      "audit_desc":params.audit_desc,
      "product_name": params.product_name,
      "audit_note": params.audit_note,
      "audit_status": params.audit_status,
      "channel_dispatch": JSON.stringify(params.channel_dispatch),
    }
  })
};
//日账单
const dayBill = params => {
  return fetch({
    url: types.URL + types.USER_API_PREFIX + `/day_bill`,
    method: 'post',
    data: {
      "pname": params.pname,
      "query_date": params.query_date,
      "trade_type": params.trade_type,
      "page_size": params.page_size,
      "page_num": params.page_num,
    }
  })
};
//用户列表
const userList  = params => {
  return fetch({
    url: types.URL + types.ADMIN_API_PREFIX + `/user_list`,
    method: 'post',
    data: {
      "cname": params.cname,
    }
  })
};
//用户充值
const accountConsumption = params => {
  return fetch({
    url: types.URL + types.SMS_API_PREFIX + `/account_consumption`,
    method: 'post',
    data: {
      "tag_uid": params.uid,
      "consumption_amount": params.consumption_amount,
    }
  })
};
//用户修改
const updateUser = params => {
  return fetch({
    url: types.URL + types.ADMIN_API_PREFIX + `/update_user_price`,
    method: 'post',
    data: {
      "tag_uid": params.uid,
      "verify_code_price": params.verify_code_price,
      "notice_price": params.notice_price,
      "cs_price": params.cs_price,
      "marketing_unicom_price": params.marketing_unicom_price,
      "marketing_mobile_price": params.marketing_mobile_price,
      "marketing_telecom_price": params.marketing_telecom_price,
    }
  })
};
//查询鉴权ip
const queryAuthIpList = uid => {
  return fetch({
    url: types.URL + types.USER_API_PREFIX + `/query_auth_ip_list`,
    method: 'post',
    data: {
    }
  })
};

//添加鉴权ip
const addAuthIp = params => {
  return fetch({
    url: types.URL + types.USER_API_PREFIX + `/add_auth_ip`,
    method: 'post',
    data: {
      "ip_addr":params.add_auth_ip ,
    }
  })
};
//根据uid查询用户单价信息
const userPriceInfo = params => {
  return fetch({
    url: types.URL + types.ADMIN_API_PREFIX + `/query_user_price`,
    method: 'post',
    data: {
      "tag_uid":params.uid ,
    }
  })
};
//添加用户
const regist = params => {
  return fetch({
    url: types.URL + types.USER_API_PREFIX + `/regist`,
    method: 'post',
    data: {
      "cname":params.cname,
      "phone":params.phone,
      "email":params.email,
    }
  })
};
//重置密码
const resetUserPwd = uid => {
  return fetch({
    url: types.URL + types.ADMIN_API_PREFIX + `/reset_user_pwd`,
    method: 'post',
    data: {
      "tag_uid":uid ,
    }
  })
};
//短信记录详情sms_record_detail
const smsRecordDetail = params => {
  return fetch({
    url: types.URL + types.SMS_API_PREFIX + `/sms_record_detail`,
    method: 'post',
    data: {
      "uaid":params.uaid ,
      "pname":params.pname ,
      "sms_type":params.sms_type ,
      "sms_id":params.sms_id ,
      "phone":params.phone ,
      "deliver_status":params.deliver_status ,
      "page_num":params.page_num ,
      "page_size":params.page_size ,
    }
  })
};
//获取请求转发列表
const reqForwardList = params => {
  return fetch({
    url: types.URL + types.SMS_API_PREFIX + `/req_forward_list`,
    method: 'post',
    data: {
      "identify":params.identify ,
      "product_name":params.product_name ,
      "page_num":params.page_num ,
      "page_size":params.page_size ,
    }
  })
};
//添加请求跳转
const addReqForward = params => {
  return fetch({
    url: types.URL + types.SMS_API_PREFIX + `/add_req_forward`,
    method: 'post',
    data: {
      "cname":params.cname ,
      "product_name":params.product_name ,
      "target_url":params.target_url ,
      "note":params.note ,
    }
  })
};
//登录信息
const queryUserLoginInfo = () => {
  return fetch({
    url: types.URL + types.USER_API_PREFIX + `/query_user_login_info`,
    method: 'post',
    data: {
    }
  })
};
//用户余额
const channelBalance = () => {
  return fetch({
    url: types.URL + types.SMS_API_PREFIX + `/channel_balance`,
    method: 'post',
    data: {
    }
  })
};
//添加子账号
const addUserAccount = params => {
  return fetch({
    url: types.URL + types.USER_API_PREFIX + `/add_user_account`,
    method: 'post',
    data: {
      "ua_name":params.ua_name,
      "sms_type":params.sms_type,
    }
  })
};
//修改密码
const updatePwd = params => {
  return fetch({
    url: types.URL + types.USER_API_PREFIX + `/update_pwd`,
    method: 'post',
    data: {
      "passwd":params.passwd,
    }
  })
};
//更新启用状态
const updateEnableStatus = params => {
  return fetch({
    url: types.URL + types.SMS_API_PREFIX + `/update_enable_status`,
    method: 'post',
    data: {
      "stid":params.stid,
      "enable_status":params.enable_status,
    }
  })
};
//获取菜单列表，若上级菜单ID为空，则返回所有的菜单列表
const menuList = params => {
  return fetch({
    url: types.URL + types.USER_API_PREFIX + `/menu_list`,
    method: 'post',
    data: {
      "super_mid":params.super_mid,
    }
  })
};
//获取用户菜单
const queryUserMenu = params => {
  return fetch({
    url: types.URL + types.ADMIN_API_PREFIX + `/query_user_menu`,
    method: 'post',
    data: {
      "tag_uid":params.tag_uid,
    }
  })
};
//推送状态
const updatePushStatus = params => {
  return fetch({
    url: types.URL + types.USER_API_PREFIX + `/update_push_status`,
    method: 'post',
    data: {
      "pname":params.pname,
      "enable_push":params.enable_push?1:0,
      "deliver_push_url":params.deliver_push_url,
      "reply_push_url":params.reply_push_url,
    }
  })
};
//修改用户全新
const updateUserMenu = params => {
  return fetch({
    url: types.URL + types.ADMIN_API_PREFIX + `/update_user_menu`,
    method: 'post',
    data: {
      "tag_uid":params.tag_uid,
      "mids":params.mids.join(),
    }
  })
};
//审批列表audit_list
const auditList = params => {
  return fetch({
    url: types.URL + types.ADMIN_API_PREFIX + `/audit_list`,
    method: 'post',
    data: {
      "page_num": params.page_num,
      "page_size": params.page_size,
      "query_date": params.query_date,
      "sms_type": params.sms_type,
      "send_status":params.send_status,
      "pname":params.pname,
      "sms_type":params.sms_type,
      "orig_sms":params.orig_sms
    }
  })
};
//审批模板列表(新增,管理员端)
const queryAuditTplList = params => {
  return fetch({
    url: types.URL + types.ADMIN_API_PREFIX + `/query_audit_tpl_list`,
    method: 'post',
    data: {
      "page_num": params.page_num,
      "page_size": params.page_size,
      "date_time": params.query_date,
      "sms_type": params.sms_type,
      "tpl_content": params.tpl_content,
      "audit_tatic": params.audit_tatic,
      "pname": params.pname,
      "stid": params.stid
    }
  })
};
//修改是否开启免审批
const updateWithoutAuditStatus = params => {
  return fetch({
    url: types.URL + types.ADMIN_API_PREFIX + `/update_without_audit_status`,
    method: 'post',
    data: {
      "without_audit": params.without_audit,
      "stid": params.stid,
      "mobile_cid": params.mobile_cid,
      "mobile_sign": params.mobile_sign,
      "unicom_cid:":params.unicom_cid,
      "unicom_sign": params.unicom_sign,
      "telecom_cid": params.telecom_cid,
      "telecom_sign": params.telecom_sign,
    }
  })
};

//查询白名单
const queryWhitelist = params => {
  return fetch({
    url: types.URL + types.ADMIN_API_PREFIX + `/query_whitelist`,
    method: 'post',
    data: {
      "page_num": params.page_num,
      "page_size": params.page_size,
      "mobile": params.mobile,
    }
  })
};

//查询黑名单
const queryBlacklist = params => {
  return fetch({
    url: types.URL + types.ADMIN_API_PREFIX + `/query_blacklist`,
    method: 'post',
    data: {
      "page_num": params.page_num,
      "page_size": params.page_size,
      "mobile": params.mobile,
    }
  })
};

//添加白名单
const addWhitelist = params => {
  return fetch({
    url: types.URL + types.ADMIN_API_PREFIX + `/add_whitelist`,
    method: 'post',
    data: {
      "mobile": params.mobile,
    }
  })
};

//添加黑名单
const addBlanklist = params => {
  return fetch({
    url: types.URL + types.ADMIN_API_PREFIX + `/add_blacklist`,
    method: 'post',
    data: {
      "mobile": params.mobile,
    }
  })
};

//检查短信内容
const checkSms = params => {
  return fetch({
    url: types.URL + types.SMS_API_PREFIX + `/check_sms`,
    method: 'post',
    data: {
      "sms": params.sms,
      "sms_type": params.sms_type,
    }
  })
};

//短链统计
const shortLinkStat = sms => {
  return fetch({
    url: types.URL + types.SMS_API_PREFIX + `/short_link_stat`,
    method: 'post',
    data: {
      "sms": sms,
    }
  })
};

const apiList = {
  userAccount,
  smsRecord,
  login,
  queryTpl,
  queryCommonTpl,
  addSmsTpl,
  auditSmsTpl,
  batchSend,
  getChannels,
  auditDetail,
  audit,
  dayBill,
  userList,
  accountConsumption,
  updateUser,
  queryAuthIpList,
  addAuthIp,
  userPriceInfo,
  regist,
  resetUserPwd,
  smsRecordDetail,
  reqForwardList,
  addReqForward,
  queryUserLoginInfo,
  channelBalance,
  addUserAccount,
  updatePwd,
  updateEnableStatus,
  menuList,
  queryUserMenu,
  updateUserMenu,
  updatePushStatus,
  auditList,
  queryAuditTplList,
  updateWithoutAuditStatus,
  queryWhitelist,
  queryBlacklist,
  addBlanklist,
  addWhitelist,
  checkSms,
  shortLinkStat,
};

export default apiList
