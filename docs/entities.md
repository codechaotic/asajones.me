# Entities

What dynamic content should be contained and controlled by the app? How are they
related and how are they stored?

## General Notes

Blog entries and content blocks (both segments of editable text) are stored as
raw markdown and rendered upon request. [Cacheing may be implemented later for
faster retrieval]

* Info - information about the website (from the package.json file, not mongo)
  * Read Only
  * [ version, name, author ]

* Article - Blog entries composed in markdown
  * Edit / Create / Delete / Read
  * [ title, date, body, {tags} ]

* Page - page content (preassigned)
  * Edit / Read
  * [ title, body ]
