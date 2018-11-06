const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka
    _items.addEventListener('click', function(e) {
      finish(e);
      deleteItem(e);
      edit(e);
    });

    _items.addEventListener('keydown',(e)=>{
      commit(e);
    });
  }

  function formHandler(e) {
    e.preventDefault();
    const gildi = document.querySelector('.form__input').value;
    if(gildi.trim() != ''){
      add(gildi);
    };
    document.querySelector('.form__input').value = '';
    //  console.log('halló heimur');
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    if (e.target.classList.contains('item__checkbox')) {
      e.target.parentNode.classList.toggle('item--done');
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    if(e.target.classList.contains('item__text')){
      const text = e.target.innerHTML;
      const inntak = el('input','item__edit',null,'text');
      inntak.value = text;
      e.target.parentNode.replaceChild(inntak, e.target);
      inntak.focus();
    }
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    const virkjaElement = document.activeElement;
    if(virkjaElement.classList.contains('item__edit') && e.keyCode === ENTER_KEYCODE){
      const texti = virkjaElement.value;
      const span = el('span','item__text',null);
      span.innerHTML = texti;
      virkjaElement.parentNode.replaceChild(span,virkjaElement);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const li =  el('li','item',null);
    const cb = el('input','item__checkbox',null,'checkbox');
    const span = el('span','item__text',null);
    const takki = el('button','item__button',null);
    takki.innerHTML = 'Eyða';
    span.innerHTML = value;
    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(takki);
    items.appendChild(li);

  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    if(e.target.classList.contains('item__button')){
      e.target.parentNode.remove();
    }
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler,input = null) {
    let elemento  = document.createElement(type);
    elemento.classList.add(className);
    if(input != null){
      elemento.setAttribute('type',input);
    }
    return elemento;
  }

  return {
    init: init
  };
})();
