export interface IOption {
  // API1
  api1Result: IAPI1Result;
  // debug
  debug?: boolean;
  // view 加载超时时间，默认10000
  loadTimeout?: number;
  // 第二步向极验服务器发送请求超时时间，默认10000
  reqTimeout?: number;
  // 语言，如果为null则使用系统默认语言
  lang?: Lang;
  // 点击背景是否可以取消验证
  enableBackgroundCancel?: boolean;
  // 背景色 IOS Only
  backgroundColorIOS?: any;
  // 背景模糊类型 IOS Only
  backgroundBlurEffectIOS?: BackgroundBlurEffectIOS;
  // 事件监听
  onEvent?: (code: Events, data?: Array<number | string>) => void;
}

export interface IAPI1Result {
  success: 0 | 1;
  challenge: string;
  gt: string;
  new_captcha: boolean;
  [key: string]: any;
}

export enum Lang {
  System = 'system', // 跟随系统
  ZH = 'zh', // 简体中文
  ZH_TW = 'zh-tw', // 繁体中文
  ZH_HK = 'zh-hk', // 繁体中文
  EN = 'en', // 英语
  ID = 'id', // 印尼语
  JA = 'ja', // 日语
  KO = 'ko', // 韩语
  RU = 'ru', // 俄语
  AR = 'ar', // 阿拉伯语
  ES = 'es', // 西班牙语
  PT_PT = 'pt-pt', // 葡萄牙语
  FR = 'fr', // 法语
  DE = 'de', // 德语
}

export enum BackgroundBlurEffectIOS {
  None = -1,
  ExtraLight = 0,
  Light,
  Dark,
  Regular, // NS_ENUM_AVAILABLE_IOS(10_0)
  Prominent, // NS_ENUM_AVAILABLE_IOS(10_0)
}

export enum Events {
  // 验证结果
  RESULT = 1,
  // 验证窗口关闭
  CLOSED = 2,
  // 验证失败
  FAILED = 3,
  // 发生错误
  ERROR = 0,
}

export enum Errors {
  // 参数解析错误
  PARAMETER_PARSE_FAILED = -1,
  // 安卓 activity 已经销毁
  ANDROID_ACTIVITY_DESTROYED = -2,
  // 重复启动
  DUPLICATE_START = -3,
}

export interface IResult {
  geetest_challenge: string;
  geetest_seccode: string;
  geetest_validate: string;
  [key: string]: any;
}
