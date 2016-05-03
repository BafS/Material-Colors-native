#import "AppDelegate.h"

#import "RCTBridge.h"
#import "RCTJavaScriptLoader.h"
#import "RCTRootView.h"
#import <Cocoa/Cocoa.h>

@interface AppDelegate() <RCTBridgeDelegate>

@end

@implementation AppDelegate

NSMenu *statusItemMenu;
NSStatusItem *statusItem;
NSPopover *popover;
NSViewController *popoverViewController;
NSEvent * popoverTransiencyMonitor;

- (void)statusClicked:(id)sender {
  if(popoverTransiencyMonitor == nil) {
    [popover showRelativeToRect:[sender bounds] ofView:sender preferredEdge:NSMinYEdge];

    popoverTransiencyMonitor = [NSEvent addGlobalMonitorForEventsMatchingMask:NSLeftMouseDownMask|NSRightMouseDownMask handler:^(NSEvent* event) { [self statusClicked:sender]; }];
  } else {
    [NSEvent removeMonitor:popoverTransiencyMonitor];
    
    popoverTransiencyMonitor = nil;
    
    [popover close];
  }
}

-(id)init
{
    if(self = [super init]) {

        statusItem = [[NSStatusBar systemStatusBar] statusItemWithLength:(NSSquareStatusItemLength)];
        // statusItem = [[NSStatusBar systemStatusBar] statusItemWithLength:NSVariableStatusItemLength];
        [statusItem setTitle:@"MC"];

        [statusItem setTarget:self];

        statusItem.button.action = @selector(statusClicked:);
//        statusItem.doubleAction = @selector(statusClicked:);
        statusItem.action = @selector(statusClicked:);
      
        statusItemMenu = [[NSMenu alloc] init];
        statusItemMenu.autoenablesItems = NO;
        statusItem.target = self;

        popover = [[NSPopover alloc] init];

        [popover setDelegate:self];

        [popover setAnimates: NO];
        [popover setBehavior: NSPopoverBehaviorApplicationDefined];
//        [popover setBehavior: NSPopoverBehaviorTransient];
        [popover setContentSize: NSMakeSize(200.0f, 510.0f)];

        popoverViewController = [[NSViewController alloc] initWithNibName:@"View" bundle:nil];
    }
    return self;
}

- (void)applicationDidFinishLaunching:(__unused NSNotification *)aNotification
{

    _bridge = [[RCTBridge alloc] initWithDelegate:self
                                              launchOptions:nil];

    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:_bridge
                                                     moduleName:@"MaterialColors"
                                              initialProperties:nil];

    [popoverViewController setView: rootView];
    [popover setContentViewController: popoverViewController];
//    [popover becomeFirstResponder];
//    [popoverViewController becomeFirstResponder];
    [rootView becomeFirstResponder];

//    [self.window setContentView:rootView];
//    [[NSApplication sharedApplication] activateIgnoringOtherApps : YES];
}


- (NSURL *)sourceURLForBridge:(__unused RCTBridge *)bridge
{
    NSURL *sourceURL;

#if DEBUG
    sourceURL = [NSURL URLWithString:@"http://localhost:8081/index.osx.bundle?platform=osx&dev=true"];
#else
    sourceURL = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif

    return sourceURL;
}

- (void)loadSourceForBridge:(RCTBridge *)bridge
                  withBlock:(RCTSourceLoadBlock)loadCallback
{
    [RCTJavaScriptLoader loadBundleAtURL:[self sourceURLForBridge:bridge]
                              onComplete:loadCallback];
}

@end
