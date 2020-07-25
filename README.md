# NativeScript-Appic-PdfView

This is a simple pdf viewer plugin that uses native libraries.
* Android: AndroidPdfViewer (https://github.com/appiclogics/AndroidPdfViewer)

## Installation

```javascript
tns plugin add nativescript-appic-pdfview
```

OR

copy the tgz file to your project and reference it from your package.json

## Usage

Just add it to your page:

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" class="page"
xmlns:ui="nativescript-appic-pdfview">
    <ui:AppicPdfView src="~/mypdf.pdf" defaultpage="1"></ui:AppicPdfView>
</Page>
```

OR

```js
import { AppicPdfView } from 'nativescript-appic-pdfview';
import { registerElement } from 'nativescript-angular';
registerElement('AppicPdfView', () => AppicPdfView);
```

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" class="page">
    <AppicPdfView src="~/mypdf.pdf" defaultpage="1"></AppicPdfView>
</Page>
```

## API
### XML
| Property | Default | Description |
| --- | --- | --- |
| src | - | File url to a pdf file, can also be http |
| defaultpage | "0" | Initial page number to display |
| bookmarklabel | - | Search for a bookmark with the matching label and jump to the page |
| bookmarkpath | - | Search for a bookmark by indices within the tree structure of bookmarks |

### Class
```js
/// Go to page by id starting from 0 as first page.
goToPage(index: number) : void;

/// Go to first page.
goToFirstPage() : void;

/// Go to last page.
goToLastPage() : void;

/// Get a list of all bookmarks in the pdf.
getBookmarks(): Bookmark[];

/// Search for bookmark that is exactly at the given position in the tree structure
/// e.g.: [1,3] would mean to first get the second root bookmark (0 based index) and
/// then get its fourth child if it exists
getBookmarkByIndexPath(indexes: number[]): Bookmark;

/// Search for all bookmarks that have the given label.
getBookmarksByLabel(label: string): BookmarkCommon[];

/// Jump to a given bookmark.
goToBookmark(bookmark: Bookmark): void;

/// Get meta information author from PDF.
getAuthor(): string;

/// Get meta information subject from PDF.
getSubject(): string;

/// Get meta information title from PDF.
getTitle(): string;

/// Get meta information creator from PDF.
getCreator(): string;

/// Get meta information creator from PDF.
getCreationDate(): string;

/// Get page count of currently loaded pdf
getPageCount(): number;

/// Load pdf from code.
/// Replaces the currently loaded pdf.
/// The promise gets resolved after loading, or rejected if something failed.
loadPDF(src: string): Promise<any>;

/// only implemented for iOS
/// Detect available programs for file extension and opens the interaction controller
/// The source should contain accessible path for the application
showExternalControler(src: string, rect: ControllerRect): void;
```

## Examples
defaultpage: jump to page 4
```xml
<ui:AppicPdfView src="~/test.pdf" defaultpage="3"></ui:AppicPdfView>
```

bookmarklabel: jump to bookmark with label "PAGE 3"
```xml
<ui:AppicPdfView src="~/test.pdf" bookmarklabel="PAGE 3"></ui:AppicPdfView>
```

bookmarkpath: jump to the first child-bookmark of the third bookmark (bookmarks have a tree structure)
```xml
<ui:AppicPdfView src="~/test.pdf" bookmarkpath="2,0"></ui:AppicPdfView>
```

go to the first found bookmark with the label "PAGE 4"
```html
<ui:AppicPdfView src="~/test.pdf" id="pdfview"></ui:AppicPdfView>
```
```js
let view:AppicPdfView = page.getViewById('pdfview');
if (view){
    view.on("load",()=>{
        let items = view.getBookmarksByLabel("PAGE 4");
        console.log("found:",items);
        view.goToBookmark(items[0]);
    });
    view.on("error",()=>{
        console.error("unable to load pdf");
    });
}
```

dynamic loading with promises
just use an empty src tag in the xml
```html
<ui:AppicPdfView id="pdfview"></ui:AppicPdfView>
```
```js
let view:AppicPdfView = page.getViewById('pdfview');
if (view){
    view.loadPDF('~/test.pdf').then(()=>{
        let items = view.getBookmarksByLabel("PAGE 4");
        console.log("found:",items);
        view.goToBookmark(items[0]);
    }).catch((err)=>{
        console.error("could not load pdf: ", err);
    })
}
```

Show controller on button tap
```html
<ui:AppicPdfView id="pdfview"></ui:AppicPdfView>
<button text="Open external" tap="onButtonTap"></button>
```
```js
let view:AppicPdfView = page.getViewById('pdfview');

function onButtonTap(args: EventData) {
  const button = <Button>args.object;
  const size = button.getActualSize();
  const position = button.getLocationOnScreen();
  const rect = {
    x: position.x,
    y: position.y,
    width: size.width,
    height: size.height
  };
  view.showExternalControler(rect);
```

## Known bugs
* Android does not support jumping directly to a bookmark. It only jumps to the page the bookmark is on.

## License
https://choosealicense.com/licenses/mit/

## Credit
https://market.nativescript.org/plugins/nativescript-appic-pdfview

