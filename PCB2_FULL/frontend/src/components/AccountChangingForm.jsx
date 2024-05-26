import { useState } from 'react';

function AccountChangingForm() {
  const [number, setNumber] = useState('+380970462320');
  const [mail, setMail] = useState('yurachestnyh@gmail.com');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('Честних Юрій');
  const [image, setImage] = useState('/ava.jpg');

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleMailChange = (e) => {
    setMail(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="w-6/12 mt-16 mb-16 mx-auto">
        <div className=" absolute -translate-x-72 max-w-48 max-h-48">
          <label
            htmlFor="file-upload"
            className="relative w-48 h-48 flex items-center justify-center rounded-full"
          >
            {/* Первая картинка (изображение профиля) */}
            <img
              src={image}
              alt="Фото профілю"
              className="rounded-full cursor-pointer w-48 h-48"
            />

            {/* Вторая картинка (изображение для указания на кнопку) */}
            <div className="absolute w-48 h-48 bg-gray-500 opacity-40 rounded-full cursor-pointer"></div>
            <img
              src="/path.svg"
              alt="s"
              className="absolute h-14 min-w-14 cursor-pointer opacity-80"
            />
            {/* Поле для загрузки файла */}
            <input
              id="file-upload"
              type="file"
              onChange={handleImageChange}
              className="absolute opacity-0 w-0 h-0"
              accept="image/* "
            />
          </label>
        </div>
        <div className="flex flex-row justify-center align-bottom gap-3">
          <input
            id="name"
            value={name}
            onChange={handleNameChange}
            className="text-5xl font-black mb-16 w-full text-center "
          />
          {/* <button id='change name' className='h-10 mt-3'>
                    <img src='/path.svg' alt='s'className='max-h-10'></img>
                </button> */}
        </div>
        <form>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <label htmlFor="" className="mb-3 text-xl font-medium">
                Змінити контакти
              </label>
            </div>
            <div className="flex flex-row justify-between mb-8 gap-8">
              <input
                id="number"
                className=" w-4/6 min-h-12 p-2 rounded-xl bg-gray-200 mb-8"
                type="text"
                value={number}
                onChange={handleNumberChange}
              ></input>
              <input
                id="mail"
                className=" w-4/6 min-h-12 p-2 rounded-xl bg-gray-200 mb-8"
                type="text"
                value={mail}
                onChange={handleMailChange}
              ></input>
            </div>
            <div className="flex flex-row">
              <label htmlFor="description" className="mb-3 text-xl font-medium">
                Особисті дані
              </label>
            </div>
            <textarea
              id="description"
              placeholder="Опис"
              className="w-full min-h-24 max-h-96 p-2 rounded-xl bg-gray-200 mb-16"
              type="color"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            <div className="flex flex-row justify-between">
              <label className="mb-3 text-xl font-medium">Змінити пароль</label>
              <label htmlFor="city" className="mb-3 text-xl font-medium">
                Змінити місто
              </label>
            </div>

            <div className="flex flex-row justify-between gap-8">
              <div className="w-4/6 flex flex-col mb-8 flex-wrap">
                <input
                  id="oldPassword"
                  placeholder="Старий пароль"
                  className=" w-full min-h-12 p-2 rounded-xl bg-gray-200 mb-8"
                  type="password"
                ></input>
                <input
                  id="newPassword"
                  placeholder="Новий пароль"
                  className=" w-full min-h-12 p-2 rounded-xl bg-gray-200 mb-8"
                  type="password"
                ></input>
                <input
                  id="confirmNewPassword"
                  placeholder="Підтвердити новий пароль"
                  className=" w-full min-h-12 p-2 rounded-xl bg-gray-200 mb-8"
                  type="password"
                ></input>
              </div>
              <div className="w-4/6 flex flex-col mb-8 flex-wrap">
                <select
                  id="city"
                  className="h-12 w-full p-2 rounded-xl bg-gray-200 mb-8"
                  type="text"
                >
                  <option selected disabled value="0">
                    Харків
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              <input
                type="submit"
                value="Зберегти"
                className=" bg-violet-700 rounded-xl w-3/6 min-h-12 p-2 text-white cursor-pointer"
              ></input>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountChangingForm;
