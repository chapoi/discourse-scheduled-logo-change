# Scheduled Logo

A Discourse theme component that automatically replaces the site logo with
uploaded images on a recurring, calendar-based schedule. Use it for seasonal
logos (Halloween, Christmas, special events, anniversaries, etc.) without having to
manually swap the site logo each year.

## How it works

The component hooks into Discourse's `home-logo-image-url` value transformer.
For every logo variant Discourse renders (desktop, mobile, and the minimized
"small" logo, in both light and dark mode) it checks the configured schedules
and, if today's date falls inside an active range, returns the matching uploaded
image instead of the default site logo.

Schedules recur **every year** — you set a start and end month/day, not a
specific year. Ranges may wrap around the end of the year (e.g. December 15 →
January 5). When multiple schedules overlap, the **first matching schedule in
the list wins**.

## Configuration

Open the component settings and add one or more entries to **Schedules**. Each
entry has:

| Field                   | Required | Purpose                                             |
| ----------------------- | -------- | --------------------------------------------------- |
| Name                    | ✅       | Label used to identify the schedule in the admin UI |
| Start month / Start day | ✅       | First day the logo is shown                         |
| End month / End day     | ✅       | Last day the logo is shown                          |
| Logo                    | ✅       | Desktop logo, light mode                            |
| Logo (dark)             |          | Desktop logo, dark mode                             |
| Small logo              |          | Minimized-header logo, light mode                   |
| Small logo (dark)       |          | Minimized-header logo, dark mode                    |
| Mobile logo             |          | Mobile logo, light mode                             |
| Mobile logo (dark)      |          | Mobile logo, dark mode                              |

Only **Logo** is required per entry. Any optional image left blank falls back to
the site's default logo for that variant. Dark-mode variants fall back to their
light-mode counterpart from the same schedule when not provided, so dark mode
still shows the seasonal logo.
