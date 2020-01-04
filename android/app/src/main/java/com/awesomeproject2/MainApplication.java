package com.awesomeproject2;

import android.app.Application;
import android.content.Context;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.rnlib.geetestsensebot.RNLGeetestSensebotPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.yunpeng.alipay.AlipayPackage;
import com.theweflex.react.WeChatPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import org.wonday.pdf.RCTPdfView;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import cn.jiguang.plugins.push.JPushModule;
import cn.jiguang.plugins.push.JPushPackage;
import cn.reactnative.modules.update.UpdateContext;

import com.reactnativecommunity.cameraroll.CameraRollPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.reactlibrary.RNAliyunOssPackage;
import com.theweflex.react.WeChatPackage;
import com.microsoft.codepush.react.CodePush;

public class MainApplication extends Application implements ReactApplication {
    // 设置为 true 将不弹出 toast
    private boolean SHUTDOWN_TOAST = false;
    // 设置为 true 将不打印 log
    private boolean SHUTDOWN_LOG = false;

    private static final MyMainPackage myMainPackage = new MyMainPackage();

    public static MyMainPackage getMyMainPackage() {
        return myMainPackage;
    }

    private final ReactNativeHost mReactNativeHost =
            new ReactNativeHost(this) {
                @Override
                public boolean getUseDeveloperSupport() {
                    return BuildConfig.DEBUG;
                }

                @Override
                protected List<ReactPackage> getPackages() {
                    @SuppressWarnings("UnnecessaryLocalVariable")
                    List<ReactPackage> packages = new PackageList(this).getPackages();
                    // Packages that cannot be autolinked yet can be added manually here, for example:
                    // packages.add(new MyReactNativePackage());
                    // 极光推送
                    // packages.add(new JPushPackage());
                    // 图片等资源
                    // packages.add(new CameraRollPackage());
                    // 视频播放
                    // packages.add(new MainReactPackage(),
                    // new RNLGeetestSensebotPackage(),
                    // new RNFetchBlobPackage(),
                    // new AlipayPackage(),
                    // new WeChatPackage(),
                    // new RNCWebViewPackage(),
                    // new VectorIconsPackage(),
                    // new RNScreensPackage(),
                    // new SafeAreaContextPackage(),
                    // new ReanimatedPackage(),
                    // new RCTPdfView(),
                    // new PickerPackage(),

                    // packages.add(new MainReactPackage(),

                    // packages.add(new WeChatPackage());
                    // packages.add(new ImagePickerPackage());
                    // packages.add(new ReactVideoPackage());

                    // packages.add(new RNAliyunOssPackage());

                    // 添加自定义包管理器
//                    packages.add(new MyMainPackage());
                    packages.add(myMainPackage);
                    // <-- 添加这一行，类名替换成你的Package类的名字 name.
                    packages.add(new CustomToastPackage());

                    // 联系人
//                    packages.add(new ReactNativeContacts());

                    return packages;
                }

                @Override
                protected String getJSMainModuleName() {
                    return "index";
                }

                @Override
                protected String getJSBundleFile() {
                    // Code Push
                    // return CodePush.getJSBundleFile();
                    // Pushy
                    return UpdateContext.getBundleUrl(MainApplication.this);
                }
            };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        // initializeFlipper(this); // Remove this line if you don't want Flipper enabled
        // 调用此方法：点击通知让应用从后台切到前台
        JPushModule.registerActivityLifecycle(this);
    }

    /**
     * Loads Flipper in React Native templates.
     *
     * @param context
     */
    private static void initializeFlipper(Context context) {
        if (BuildConfig.DEBUG) {
            try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
                Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
                aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }
}
