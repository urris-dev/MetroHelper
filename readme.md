## Обзор
Мобильное веб-приложение, используемое для предоставления сопровождения маломобильным пассажирам при перемещении внутри Московского метрополитена.

## Функциональность
* создание аккаунта пассажира / сотрудника;
* создание заявок на сопровождение (пассажиром);
* просмотр статуса обработки поданных заявок (пассажиром);
* получение уведомлений о назначении сопровождающим (сотрудником);

## Используемые технологии
### Backend
* База данных: **PostgreSQL 17**
* ОRМ для работы с БД: **Ormar 0.20.2**
* Библиотека для генерации миграций БД: **Alembic 1.15.2**
* Язык программирования: **Python 3.12**
* Фреймворк для разработки API: **FastAPI 0.115.12**
### Frontend
* Фреймворк: **React 19.2**
* Конфигурация и сборка проекта: **Vite 6.3.2**

## Архитектура проекта
Для изучения архитектуры проекта можно перейти по ссылке:
[Архитектура MetroHelper](https://deepwiki.com/urris-dev/MetroHelper)

## Сборка и запуск проекта
Клонировать данный репозиторий:
```bash
git clone https://github.com/urris-dev/MetroHelper.git
```

### Backend
1. Установить PostgreSQL версии 17+
2. Установить Python версии 3.12+
3. Создать виртуальное окружение в папке backend проекта и активировать его:
```bash
cd backend/
mkdir media
python -m venv .venv
source .venv/bin/activate
```
4. Установить зависимости проекта из requirements.txt:
```bash
pip install -r requirements.txt
```
5. Создать .env файл и заполнить его, следуя шаблону из .env.temp.
```bash
touch .env
```
6. Сгенерировать и применить миграции БД:
```bash
alembic revision --autogenerate -m 'db_migrations' 
alembic upgrade head
```
1. Запустить backend:
```bash
uvicorn --host localhost --port 8000 main:app
```

### Frontend
1. Перейти в папку frontend проекта:
```bash
cd ../frontend
```
2. Установить зависимости:
```bash
npm install 
```
3. Запустить frontend:
```bash
npm run dev
```
