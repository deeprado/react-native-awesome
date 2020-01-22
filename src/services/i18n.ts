/**
 * I18n service
 * @file 多语言服务
 * @module app/services/i18n
 */

import {NativeModules} from 'react-native';
import {observable, action} from 'mobx';
import {LANGUAGE_KEYS, LANGUAGES} from '../constants/language';
import {IS_IOS} from '../config';
import en from '../languages/en';
import zh from '../languages/zh';

export type TLanguage = LANGUAGES;

// 语言包
export type TLanguages = Record<LANGUAGES, Record<LANGUAGE_KEYS, string>>;

// UI 层用的语言列表
type TLanguageList = {
  [key in LANGUAGES]: {
    name: string;
    english: string;
  };
};

export const languageMaps: TLanguageList = {
  [LANGUAGES.ZH]: {
    name: zh[LANGUAGE_KEYS.CHINESE],
    english: en[LANGUAGE_KEYS.CHINESE],
  },
  [LANGUAGES.EN]: {
    name: en[LANGUAGE_KEYS.ENGLISH],
    english: en[LANGUAGE_KEYS.ENGLISH],
  },
};

const languages: TLanguages = {en, zh};

class I18nStore {
  @observable
  private language: TLanguage = LANGUAGES.ZH;

  @action.bound
  public updateLanguage(language: TLanguage) {
    this.language = language;
  }

  public t(key: LANGUAGE_KEYS): string {
    return languages[this.language][key];
  }

  public translate(
    key: LANGUAGE_KEYS,
    language: TLanguage = this.language,
  ): string {
    return languages[language][key];
  }
}

export const i18n = new I18nStore();
export default i18n;
export const updateLanguage = i18n.updateLanguage.bind(i18n);
export function getDeviceLanguage(): Promise<TLanguage> {
  const language = IS_IOS
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;
  return language
    ? Promise.resolve(language)
    : NativeModules.RNi18n.getLanguages()
        .then(([language]: TLanguage[]) => language)
        .catch((err: any) => console.log(err));
}
