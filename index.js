const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_profile');
const buttonEdit = document.querySelector('.profile__button-edit');
const nameProfile = document.querySelector('.profile__info-name');
const jobProfile = document.querySelector('.profile__info-prof');
const formElement = document.querySelector('.popup__form_profile')
const popupEditFormProfile = document.querySelector('.popup__edit-form_profile');
const nameInput = popupEditFormProfile.querySelector('.popup__input_name');
const jobInput = popupEditFormProfile.querySelector('.popup__input_job');
const closeButtons = document.querySelectorAll('.popup__button-close');
const galleryCards = document.querySelector('.gallery');
const cardTemplate = document.querySelector('#card').content;
const popupPlace = document.querySelector('.popup_place');
const buttonAdd = document.querySelector('.profile__button-add');
const formPlaceElement = document.querySelector('.popup__form_place')
const popupEditFormPlace = document.querySelector('.popup__edit-form_place');
const urlInput = popupEditFormPlace.querySelector('.popup__input_url');
const titleInput = popupEditFormPlace.querySelector('.popup__input_title');
const popupPhoto = document.querySelector('.popup_photo');
const popupImage = popupPhoto.querySelector('.popup__image');
const popupCaption = popupPhoto.querySelector('.popup__caption');

// 1. Работа модальных окон
// универсальная функция для открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// универсальная функция для закрытия попапа
function closePopup(popup) {
 popup.classList.remove('popup_opened');
}

// Открывем форму редактирования профиля
buttonEdit.addEventListener('click', function () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupProfile);
});

// Универсальный обработчик крестиков

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// Сохраняем данные из формы редактирования

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup(popupProfile);
}

// Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

//2. Шесть карточек «из коробки»
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Вид на горы с высоты.',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Снежные берега реки.',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Уходящие вдаль ряды панельных домов.',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Скудная зелень равнины на фоне заснеженной горы.',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Железнодорожная колея, окруженная лесами, уходящая за горизонт',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Скалистые берега озера, покрытые снегом.',
  }
];

function showImage (image, title) {

  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = title.textContent;
  openPopup(popupPhoto);
};


function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  cardImage.alt = item.alt;

  cardElement.querySelector('.card__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__button-like_active');
  });
  cardElement.querySelector('.card__button-trash').addEventListener ('click', function (evt) {
  evt.target.closest('.card').remove();
  });
  cardImage.addEventListener('click', ()=> showImage(cardImage, cardTitle));

  return cardElement;
}

// добавляем 6 карточек при загрузке
initialCards.forEach((card) => {
  const cardItem = createCard(card);
  galleryCards.prepend(cardItem);
});

// 3. Форма добавления карточки
// Открываем форму '.popup_place' через "плюсик" Добавить

buttonAdd.addEventListener('click', ()=>openPopup(popupPlace));

//4. Добавление карточки

function addCard(url, title) {
// наполняем содержимым
const cardTitle = title.value;
const cardUrl = url.value;
const cardItem = createCard({ name: cardTitle, link: cardUrl });

// отображаем на странице
galleryCards.prepend(cardItem);
}

function handleFormPlaceSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
// Находим поля формы в DOM Получаем значения полей jobInput и nameInput из свойства value
  addCard(urlInput,titleInput)

  //очищаем поля инпутов
  evt.target.reset();

  closePopup(popupPlace);
}

// Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка»
formPlaceElement.addEventListener('submit', handleFormPlaceSubmit);
