#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>

@interface AppDelegate () <RCTBridgeDelegate>

@end

@implementation AppDelegate

- (void)awakeFromNib {
  [super awakeFromNib];

  _bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:nil];
}

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
  // Insert code here to initialize your application
}

- (void)applicationWillTerminate:(NSNotification *)aNotification {
  // Insert code here to tear down your application
}

- (BOOL) applicationShouldHandleReopen:(NSApplication *)sender hasVisibleWindows:(BOOL)flag {
  if (!flag) {
    NSStoryboard *storyboard = [NSStoryboard storyboardWithName:@"Main" bundle:nil];
    NSWindowController *controllerWindow = [[NSWindowController alloc] init];
    controllerWindow = [storyboard instantiateInitialController];
    [controllerWindow showWindow:self];
  }
  return flag;
}

#pragma mark - RCTBridgeDelegate Methods

- (NSURL *)sourceURLForBridge:(__unused RCTBridge *)bridge {
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:@"main"]; // .jsbundle;
}

@end
