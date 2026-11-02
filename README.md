# LIFE OS — Version 1.0

A responsive, installable web app for personal planning and accountability.

## Features
- Daily tasks: add, complete, edit and delete
- Habit tracker with editable habits
- Study focus timer with session history
- Daily study target and personal goals
- Flexible wake-up, bedtime and check-in reminders
- Browser notifications (scheduled reminders require the app to remain open in this version)
- Local browser storage and JSON export
- Responsive dark black + emerald interface

## Deploy with GitHub Pages
1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select branch **main**, folder **/(root)**, then Save.
4. Wait for deployment. GitHub displays the live URL in Pages settings.

## Android
Open the deployed HTTPS site in Chrome, open the browser menu, then choose **Install app** or **Add to Home screen**.

## Run locally
Run `python -m http.server 8000` in this folder and open `http://localhost:8000`.

## Current limitations
This is a PWA, not a native APK. There is no account login or cloud sync. Data is stored in localStorage on the current browser/device. Scheduled reminders in this version work only while the app remains open.