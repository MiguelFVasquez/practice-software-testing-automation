# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e-shop.spec.ts >> has title
- Location: tests/e2e-shop.spec.ts:3:5

# Error details

```
Error: browserType.launch: Target page, context or browser has been closed
Browser logs:

<launching> /home/runner/.cache/ms-playwright/webkit-2287/pw_run.sh --inspector-pipe --headless --no-startup-window --disable-blink-features=AutomationControlled
<launched> pid=6089
[pid=6089][err] Cannot parse arguments: Unknown option --disable-blink-features=AutomationControlled
Call log:
  - <launching> /home/runner/.cache/ms-playwright/webkit-2287/pw_run.sh --inspector-pipe --headless --no-startup-window --disable-blink-features=AutomationControlled
  - <launched> pid=6089
  - [pid=6089][err] Cannot parse arguments: Unknown option --disable-blink-features=AutomationControlled
  - [pid=6089] <gracefully close start>
  - [pid=6089] <kill>
  - [pid=6089] <will force kill>
  - [pid=6089] <process did exit: exitCode=1, signal=null>
  - [pid=6089] starting temporary directories cleanup
  - [pid=6089] finished temporary directories cleanup
  - [pid=6089] <gracefully close end>

```