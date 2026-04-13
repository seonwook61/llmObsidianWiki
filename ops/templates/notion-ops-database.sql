CREATE TABLE (
  "Title" TITLE,
  "Domain" SELECT('it':blue, 'english':green, 'travel':orange, 'reading':purple, 'economy':yellow),
  "Category" SELECT('engineering':blue, 'learning-log':green, 'workflow':gray, 'travel-note':orange, 'book-note':purple, 'market-note':yellow),
  "Status" SELECT('Idea':gray, 'Draft':blue, 'Review':yellow, 'Scheduled':orange, 'Published':green, 'Refresh Needed':red),
  "Source Note Path" RICH_TEXT,
  "Canonical URL" URL,
  "Publish Date" DATE,
  "Review Date" DATE,
  "Adsense Ready" CHECKBOX
)
