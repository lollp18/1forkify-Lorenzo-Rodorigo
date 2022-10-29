import View from "./View";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg";
import resultView from "./resultView";

class bookmakrsView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage =
    "Noch keine Lesezeichen. Finden Sie ein schönes Rezept und bookmarken Sie es :)";
  _message = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new bookmakrsView();
