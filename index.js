// 1. Работа модальных окон
const popup = document.querySelector('.popup');

// универсальная функция для открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// универсальная функция для закрытия попапа
function closePopup(popup) {
 popup.classList.remove('popup_opened');
}

// Открывем форму редактирования профиля
const popupProfile = document.querySelector('.popup_profile');
const buttonEdit = document.querySelector('.profile__button-edit');

buttonEdit.addEventListener('click', ()=>openPopup(popupProfile));

// Закрываем форму редактирования профиля
const profileButtonClose = popupProfile.querySelector('.popup__button-close');

profileButtonClose.addEventListener('click', ()=>closePopup(popupProfile));

// Сохраняем данные из формы редактирования
const formElement = document.querySelector('.popup__form_profile')
const popupEditFormProfile = document.querySelector('.popup__edit-form_profile');

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
 // Находим поля формы в DOM Получаем значения полей jobInput и nameInput из свойства value
    const nameInput = popupEditFormProfile.querySelector('.popup__input_name').value;
    const jobInput = popupEditFormProfile.querySelector('.popup__input_job').value;

    let nameProfile = document.querySelector('.profile__info-name')
    let jobProfile = document.querySelector('.profile__info-prof')// Выбераем элементы, куда должны быть вставлены значения полей

    nameProfile.textContent = nameInput;
    jobProfile.textContent = jobInput; // Вставяем новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

// Ищем кнопку "Сохранить" и вешаем слушатель для закрытия формы после клика

const profileSaveButton = popupEditFormProfile.querySelector('.popup__button-save');

profileSaveButton.addEventListener('click', ()=>closePopup(popupProfile));


//2. Шесть карточек «из коробки»
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

const galleryCards = document.querySelector('.gallery');
const cardTemplate = document.querySelector('#card').content;

// добавляем 6 карточек при загрузке
initialCards.forEach(function (element) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__button-like_active');
  });

  galleryCards.prepend(cardElement)
})

// 3. Форма добавления карточки
// Открываем форму '.popup_place' через "плюсик" Добавить
const popupPlace = document.querySelector('.popup_place');
const buttonAdd = document.querySelector('.profile__button-add');

buttonAdd.addEventListener('click', ()=>openPopup(popupPlace));

// Закрываем форму '.popup_place'
const popupPlaceProfileButtonClose = popupPlace.querySelector('.popup__button-close');

popupPlaceProfileButtonClose.addEventListener('click', ()=>closePopup(popupPlace));

//4. Добавление карточки

const formPlaceElement = document.querySelector('.popup__form_place')
const popupEditFormPlace = document.querySelector('.popup__edit-form_place');


function addCard(imageValue, titleValue) {
const cardTemplate = document.querySelector('#card').content;
// клонируем содержимое тега template
const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

// наполняем содержимым
cardElement.querySelector('.card__image').src = imageValue;
cardElement.querySelector('.card__title').textContent = titleValue;
cardElement.querySelector('.card__button-like').addEventListener('click', function (evt) {
  evt.target.classList.toggle('card__button-like_active');
});
// отображаем на странице
galleryCards.prepend(cardElement);
}

function handleFormPlaceSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
// Находим поля формы в DOM Получаем значения полей jobInput и nameInput из свойства value
  const urlInput = popupEditFormPlace.querySelector('.popup__input_url').value;
  const titleInput = popupEditFormPlace.querySelector('.popup__input_title').value;

  addCard(urlInput,titleInput)

  //очищаем поля инпутов
  popupEditFormPlace.querySelector('.popup__input_url').value = '';
  popupEditFormPlace.querySelector('.popup__input_title').value = '';
}

// Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка»
formPlaceElement.addEventListener('submit', handleFormPlaceSubmit);

// Закрываем форму popupPlace
const placeSaveButton = popupEditFormPlace.querySelector('.popup__button-save');

placeSaveButton.addEventListener('click', ()=>closePopup(popupPlace));


//5. Лайк карточки см function addCard
//6. Удаление карточки

galleryCards.addEventListener('click', evt => {
if (evt.target.matches('.card__button-trash'))
  evt.target.closest('.card').remove()
});

//7. Открытие попапа с картинкой

// Открывем попап с картинкой
const popupPhoto = document.querySelector('.popup_photo');
const elementTemplate = document.querySelector('#card');
const cardImage = elementTemplate.querySelector('.card__image');
const cardTitle = elementTemplate.querySelector('.card__title');

arrayOfCards = document.querySelectorAll('.card__image');
console.log(arrayOfCards);


arrayOfCards.forEach(function (item) {

  item.addEventListener('click', function (evt) {
    popupPhoto.querySelector('.popup__image').src = evt.target.src;
    popupPhoto.querySelector('.popup__caption').textContent = evt.target.alt;
    openPopup(popupPhoto);
});
});

// Закрываем попап с картинкой

const photoButtonClose = popupPhoto.querySelector('.popup__button-close');

photoButtonClose.addEventListener('click', ()=>closePopup(popupPhoto));

console.dir()
