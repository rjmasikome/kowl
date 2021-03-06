# Changelog

## 1.0.0 / 2020-06-24

- [CHANGE] Tabs in a topic detail view have been reordered, and the messages tab is now selected by default
- [CHANGE] Deselecting the input field in the "Preview Settings" dialog (or closing the dialog) will be considered as a confirmation now (instead of cancelling the tag that is being added)
- [FEATURE] Additional filter options (case sensitivity and multi results) for field previews
- [ENHANCEMENT] In the message table, long keys will now be truncated (>45 chars). Click on a key to show a dialog containing the full key
- [ENHANCEMENT] Statistics elements will now reduce their size on smaller screens ![image](https://i.imgur.com/18YqrgY.png)
- [ENHANCEMENT] If you are missing some permissions for a topic (for example: can't view config, or can't view messages), there's now an icon that will be shown for that topic in the topic list. Hovering over it will show the permission details.
- [ENHANCEMENT] The 'state' (icon + text) of a consumer-groups now also has a popover that - when hovering over the state - shows a table listing all possible states along with some descriptions. ![image](https://i.imgur.com/OEYwqnN.png)
- [ENHANCEMENT] Topic statistics won't show `retention.bytes`/`retention.ms` for compact topics
- [BUGFIX] Fixed issues with page sizes and column sorting in tables
- [BUGFIX] Fixed the calculation of replicated and total partitions
- [BUGFIX] Preview Tags: properties shown are now in the correct casing (as they are defined in the object)

## 1.0.0-beta1 / 2020-05-24

This is the initial release which comes with all the currently known features.
