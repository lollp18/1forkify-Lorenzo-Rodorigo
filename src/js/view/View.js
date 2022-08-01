
import icons from 'url:../../img/icons.svg'

export default class View{

    _data

/**
 * Render the received object to the DOM
 * @param {Object|Object[]} data The date to be rendered (e.g.recipe)
 * @param {boolean} [render=true] if fales ,create markup string insted of rendering to the DOM
 * @returns {undefined|String} A markup string is returned if rendering=fales
 * @this{Object} View instance
 */

    render(data,render=true) {
    
      if(!data||(Array.isArray(data)&&data.length===0))return this.renderError()

    this._data=data
    const markup=this._generateMarkup()

if(!render)return markup

    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin',markup)
    
    }
    
update(data) {



  this._data=data
  const newmarkup=this._generateMarkup()

const newDOM=document.createRange().createContextualFragment(newmarkup)
const newElements=Array.from(newDOM.querySelectorAll('*'))
const curElements=Array.from(this._parentElement.querySelectorAll('*'))



newElements.forEach((newEL,i)=>{

const curEL=curElements[i]

//update change text
if(!newEL.isEqualNode(curEL)&&newEL.firstChild?.nodeValue.trim()!==''){

curEL.textContent=newEL.textContent


}

//update change atributes
if(!newEL.isEqualNode(curEL))
Array.from(newEL.attributes).forEach(attr=>curEL.setAttribute(attr.name,attr.value))

})

}


    _clear(){
    
    this._parentElement.innerHTML=''
    
    }
    
    
    renderSpinner  () {
    
        const Markup=
        `<div class="spinner">
        <svg>
          <use href=${icons}#icon-loader"></use>
        </svg>
        </div>`
        
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin',Markup)
        }
    
     renderError(message=this._errorMessage){
    
    const Markup=`
    <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`
      
              this._clear()
              this._parentElement.insertAdjacentHTML('afterbegin',Markup)
    
     }   
    
     renderMessage(message=this._message){
    
      const Markup=`
      <div class="message">
                  <div>
                    <svg>
                      <use href="${icons}#icon-smile"></use>
                    </svg>
                  </div>
                  <p>${message}</p>
                </div>`
        
                this._clear()
                this._parentElement.insertAdjacentHTML('afterbegin',Markup)
      
       }


}