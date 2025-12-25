# Page Transition Rules

## Overview
Page transitions simulate accessing different parts of a secure system. Each page has unique loading messages and effects to make it feel like breaking into different security levels.

## Page-Specific Loading Messages

### Home Page (/)
- Primary: `INITIALIZING.MAIN_SYSTEM`
- Secondary: `Establishing secure connection...`
- Tertiary: `Bypassing firewall protocols...`
- Error Messages: `[WARN] Unauthorized access detected`, `[ERROR] Security clearance insufficient - overriding...`

### About Page (/about)
- Primary: `ACCESSING.PERSONNEL_FILES`
- Secondary: `Decrypting biographical data...`
- Tertiary: `Loading developer profiles...`
- Error Messages: `[ERROR] Access denied - retrying with elevated permissions...`, `[WARN] File integrity check failed - proceeding anyway...`

### Development Page (/development)
- Primary: `LOADING.PROJECT_DATABASE`
- Secondary: `Compiling task schedules...`
- Tertiary: `Synchronizing Gantt timelines...`
- C++ Style: `void loadProjects() { /* 0x7FA2 */ }`, `int syncTimeline(projectID);`
- Error Messages: `[ERROR] Repository not found - cloning from backup...`, `[WARN] Merge conflict detected - auto-resolving...`

### Concept Art Page (/concept-art)
- Primary: `ACCESSING.VISUAL_ARCHIVES`
- Secondary: `Rendering high-resolution assets...`
- Tertiary: `Loading faction galleries...`
- C++ Style: `renderImage(textureBuffer, 0x4K);`, `loadFactionData(FACTION_ALL);`
- Error Messages: `[ERROR] Texture cache corrupted - rebuilding...`, `[WARN] GPU memory insufficient - compressing...`

### Contact Page (/contact)
- Primary: `ESTABLISHING.COMM_CHANNEL`
- Secondary: `[SYSTEM FAILURE] Communication array offline...`
- Tertiary: `Rerouting through backup servers...`
- C++ Style: `connectSocket(PORT_443);`, `sendMessage(encryptedPayload);`
- Error Messages: `[CRITICAL] Server unresponsive - restarting service...`, `[ERROR] Connection timeout - switching to emergency protocol...`, `[WARN] Maintenance mode active - forcing connection...`

## Transition Effects (Randomized)

### Effect 1: Data Stream
- Vertical streams of binary/hex codes
- Scan lines moving horizontally
- Color: Crimson with white highlights

### Effect 2: Circuit Breach
- Expanding circular waves from center
- Crackling electricity effects along edges
- Glitch distortion on corners

### Effect 3: Matrix Cascade
- Falling characters (faster than normal)
- Progressive reveal from top to bottom
- Random character flicker

### Effect 4: Security Override
- Pulsing red alert borders
- Diagonal scan pattern
- "Access Granted" stamp animation

### Effect 5: System Reboot
- Full screen static/noise
- Progress bar with glitch jumps
- Blinking cursor in corner

### Effect 6: Hologram Projection
- Horizontal line build-up
- Blue-shift color distortion
- Stabilization wobble

## Timing Rules

- **Minimum Duration**: 1.2 seconds
- **Maximum Duration**: 2.0 seconds
- **Random Variance**: ±300ms
- **Error Message Delay**: Shows at 40-60% progress
- **Success Message**: Shows at 95% before fade-out

## C++ Function Call Examples

```cpp
// Loading sequences
void initializeSystem() { /* 0x2A4F */ }
int loadAssets(const char* path);
bool authenticateUser(uint64_t token);
void* allocateBuffer(size_t bytes);

// Error handling
catch(SecurityException& e) { /* Override */ }
if(!checkPermissions()) { escalatePrivileges(); }
while(retryCount < MAX_RETRIES) { reconnect(); }

// Memory addresses (fake but realistic)
[0x7FFA8B2C]: Loading texture atlas...
[0x3D4A90E1]: Decompressing shader cache...
[0x1BC7F023]: Initializing audio engine...
```

## Additional Notes

- Even after page loads, maintain transition for extra 0.5-1s for dramatic effect
- Error messages should appear authentic but non-alarming
- Function calls don't need to be syntactically perfect, just look technical
- Mix realistic and fictional function names for cyberpunk aesthetic
