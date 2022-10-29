import View from "./View";
import previewView from "./previewView.js";
import icons from 'url:../../img/icons.svg'

class resultView extends View{

_parentElement=document.querySelector('.results');
_errorMessage='Keine Rezepte für Ihre Anfrage gefunden! Bitte versuchen Sie es erneut'
_message=''

_generateMarkup(){


  return this._data.map(bookmark=>previewView.render(bookmark,false)).join('')
  
  }

}

export default new  resultView()