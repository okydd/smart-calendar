package com.smartcalendar.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    // 注册自定义原生插件：设置启动器图标数字角标（今日未完成事件数）
    registerPlugin(BadgePlugin.class);
    super.onCreate(savedInstanceState);
  }
}
