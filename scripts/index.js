const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');

const nameInput = document.querySelector('.popup__input_type_firstname');
const jobInput = document.querySelector('.popup__input_type_career');
const profileName = document.querySelector('.profile__info-name');
const profileCareer = document.querySelector('.profile__info-text');

// Попап добавление картинок
const popupAddImage = document.querySelector('.popup__add-image');
const popupOpenAddImageButton = document.querySelector('.profile__add-button');
const popupCloseAdd = document.querySelector('.popup__close-add-image');

const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__text');

// Попап открытия картинок
const  popupOpenCard = document.querySelector('.popup__open-card');
const  popupCloseCard = document.querySelector('.popup__close-card');

// Переменные template блока
const elements = document.querySelector('.elements');
const saveImageButton = document.querySelector('.popup__save-image-button');
const inputName = document.querySelector('.popup__input_type_name');
const inputLink = document.querySelector('.popup__input_type_link');
const template = document.querySelector('.template');

// Находим форму в DOM
const formElement = document.querySelector('form');

//Массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Функции

// Универсальная функция открытия попапа
const popupOpen = function (popups) {
  popups.classList.add('popup_is-opened');

  //обработчик закрытия попапа по esc
  document.addEventListener('keydown', escClose);
};

// Универсальная функция закрытия попапа
const popupClose = function (popup) {
  popup.classList.remove('popup_is-opened');

  //снимаем обработчик закрытия попапа по esc
  document.removeEventListener('keydown', escClose);
};

// Закрытие по клику
const handlerOverlayClose = function (event) {
  const popupTarget = event.target.closest('.popup');
  if (event.target === popupTarget) {
    popupClose(popupTarget);
  }
};

//закрытие попапа esc
const escClose = function (evt) {
  const popupIsOpened = document.querySelector('.popup_is-opened');

  if (evt.key === 'Escape') {
    popupClose(popupIsOpened);
  }
};

// Удаление карточки
const handlerDelete = (event) => {
  event.target.closest('.card').remove();
};

// Кнопка лайк
const handlerLike = (event) => {
  event.target.closest('.card__button').classList.toggle('card__button-like');
};

// Обработчики

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (event) {
  event.preventDefault(); //отменяем отправку формы
  profileName.textContent = nameInput.value;
  profileCareer.textContent = jobInput.value;
  popupClose(popup);
};

// Обработчик открытия попапа изменения информации
popupOpenButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCareer.textContent;
  popupOpen(popup);
});

// Обработчик открытия попапа добавления изображения
popupOpenAddImageButton.addEventListener('click', function (){
  popupOpen(popupAddImage);
});


//Обработчики закрытия по клику на оверлей
popup.addEventListener('click', handlerOverlayClose);
popupAddImage.addEventListener('click', handlerOverlayClose);
popupOpenCard.addEventListener('click', handlerOverlayClose);

// Обработчик закрытия попапа информации
popupCloseButton.addEventListener('click', function (){
  popupClose(popup);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


// Обработчик закрытия попапа добавления изображения
popupCloseAdd.addEventListener('click', function (){
  popupClose(popupAddImage);
});

// Логика

const elementsPrepend = function (a) {
  elements.prepend(...a);
};

const renderCards = () =>  {
  const items = initialCards.map(element => getItems(element));

  elementsPrepend(items);
};

const getItems = (data) => {
  const card = template.content.cloneNode(true);

  const templateImage = card.querySelector('.card__image');
  const cardDel = card.querySelector('.card__del');
  const buttonLike = card.querySelector('.card__button');

  card.querySelector('.card__title').innerText = data.name;
  templateImage.src = data.link;
  templateImage.alt = data.name;

  templateImage.addEventListener('click', function () {
    popupText.textContent = data.name;
    popupImage.src = data.link;
    popupImage.alt = data.name;

    // Открываем попап изображения универсальной функцией
    popupOpen(popupOpenCard);
  });

  // Обработчик закрытия попапа изображения
  popupCloseCard.addEventListener('click', function (){
    popupClose(popupOpenCard);
  });

  cardDel.addEventListener('click', handlerDelete);

  buttonLike.addEventListener('click', handlerLike);

  return card;

};

const saveImage = () => {
  saveImageButton.addEventListener('click', (event) => {
    event.preventDefault()
    const item = getItems({
      name: inputName.value,
      link: inputLink.value

    })
    elementsPrepend([item]);

    inputName.value = '';
    inputLink.value = '';
    popupClose(popupAddImage);

  });
};


renderCards();
saveImage();

