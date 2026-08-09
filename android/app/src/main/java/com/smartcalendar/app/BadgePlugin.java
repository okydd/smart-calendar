package com.smartcalendar.app;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import me.leolin.shortcutbadger.ShortcutBadger;

@CapacitorPlugin(name = "BadgePlugin")
public class BadgePlugin extends Plugin {
  @PluginMethod
  public void setBadge(PluginCall call) {
    int count = call.getInt("count", 0);
    try {
      if (count <= 0) {
        ShortcutBadger.removeCount(getContext());
      } else {
        ShortcutBadger.applyCount(getContext(), count);
      }
      call.resolve();
    } catch (Exception e) {
      call.reject("Failed to set badge", e);
    }
  }
}
