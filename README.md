## 注意依赖

### 1. react-native-yunpeng-alipay

找到 AlipayPackage.java ，注释一下代码

// @Override
// public List<Class<? extends JavaScriptModule>> createJSModules() {
//     return Collections.emptyList();
// }

找到 build.gradle 替换 compile 为 implementation

### 2. aliyun-oss-react-native

找到 build.gradle , 修改 compileSdkVersion 和 buildToolsVersion ， 与 项目的对应版本相同。
    compileSdkVersion 28
    buildToolsVersion '28.0.3'

### 3. 打包

-Xlint:deprecation

### 4. react-native-amap3d

找到 build.gradle
替换 compile 为 implementation

### 5. react-native-appearance

variant.getJavaCompile() 替换为 variant.getJavaCompileProvider()

### 6. react-native-baidu-map

找到 build.gradle , 修改 compileSdkVersion 和 buildToolsVersion ， 与 项目的对应版本相同。
