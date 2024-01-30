import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: window?.Telegram?.WebApp?.initDataUnsafe?.user?.language_code ?? "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        access_denied: "Access denied",

        main_button_add: "Add",
        main_button_save: "Save",
        main_button_cook: "Cook",
        main_button_cancel: "Cancel",

        dish_button_edit: "Edit",
        dish_button_share: "Share",
        dish_remove_btn: "Delete",

        page_not_found: "Page not found",
        page_not_found_msg:
          "Sorry, we couldn’t find the page you’re looking for.",
        load_data_error: "Load data Error",

        dish_not_found: "Dish not found",
        add_dish_page_title: "Add new dish",
        dishes_page_title: "Dishes",
        dishes_page_empty_msg: "You have no dishes. Add your first dish.",
        dishes_ingredients_title: "Ingredients:",
        dishes_name_field_title: "Name",
        dishes_name_field_placeholder: "Enter name",
        dishes_notes_field_title: "Notes",
        dishes_notes_field_placeholder: "Enter notes",
        dishes_ingredient_name_field_title: "Name",
        dishes_ingredient_name_field_placeholder: "Enter name",
        dishes_ingredient_number_field_title: "Amount",
        dishes_ingredient_number_field_placeholder:
          "Enter number, formats: 5, 5.1, 5.01",
        dishes_ingredient_measurement_field_title: "Measurement",
        dishes_add_new_ingredient_btn: "Add new ingredient",
        dishes_add_dish_btn: "Add dish",

        dishes_cook_calculate_by: "Calculate ingredients by:",
        dishes_cook_initial_value: "Initial value:",
        dishes_cook_number_field_placeholder:
          "Enter number, formats: 5, 5.1, 5.01",
        dishes_cook_measurement_field_title: "Measurement",
        dishes_cook_calc_btn: "Calc",
        dishes_cook_cancel_btn: "Cancel",
        dishes_cook_reset_btn: "Reset",

        remove_ingredient_popup_title: "Remove ingredient",
        remove_ingredient_popup_ask_prefix:
          "Are you sure you want to remove ingredient - ",
        remove_ingredient_popup_remove_btn: "Remove",
        remove_ingredient_popup_cancel_btn: "Cancel",

        dish_remove_popup_title: "Remove dish",
        dish_remove_popup_msg_prefix: "Are you sure you want to remove dish - ",
        dish_remove_popup_remove_btn: "Remove",
        dish_remove_popup_cancel_btn: "Cancel",

        dish_edit_page_title_pattern: "Edit :name",

        dish_validation_name_req: "Name is required",
        dish_validation_name_max: "Max length is 255",
        dish_validation_notes_max: "Max length is 3000",
        dish_ingredients_validation_req:
          "The dish must contain at least one ingredient",

        ingredient_validation_name_req: "Name is required",
        ingredient_validation_name_max: "Max length is 255",
        ingredient_validation_number_req: "Amount is required",
        ingredient_validation_number_format:
          "Enter number, formats: 5, 5.1, 5.01",
      },
    },
    uk: {
      translation: {
        access_denied: "Немає доступу",

        main_button_add: "Додати",
        main_button_save: "Зберегти",
        main_button_cook: "Готувати",
        main_button_cancel: "Скасувати",

        dish_button_edit: "Редагувати",
        dish_button_share: "Поділитися",
        dish_remove_btn: "Видалити",

        page_not_found: "Сторінку не знайдено",
        page_not_found_msg:
          "На жаль, нам не вдалося знайти сторінку, яку ви шукаєте.",
        load_data_error: "Помилка завантаження даних",

        dish_not_found: "Страва не знайдена",
        add_dish_page_title: "Додати нову страву",
        dishes_page_title: "Страви",
        dishes_page_empty_msg: "У вас немає страв. Додайте свою першу страву.",
        dishes_ingredients_title: "Інгредієнти:",
        dishes_name_field_title: "Назва",
        dishes_name_field_placeholder: "Введіть назву",
        dishes_notes_field_title: "Примітки",
        dishes_notes_field_placeholder: "Введіть примітки",
        dishes_ingredient_name_field_title: "Назва",
        dishes_ingredient_name_field_placeholder: "Введіть назву",
        dishes_ingredient_number_field_title: "Кількість",
        dishes_ingredient_number_field_placeholder:
          "Введіть число, формати: 5, 5.1, 5.01",
        dishes_ingredient_measurement_field_title: "Одиниці вимірювання",
        dishes_add_new_ingredient_btn: "Додати новий інгредієнт",
        dishes_add_dish_btn: "Додайте страву",

        dishes_cook_calculate_by: "Розрахунок інгредієнтів:",
        dishes_cook_initial_value: "Початкове значення:",
        dishes_cook_number_field_placeholder:
          "Введіть число, формати: 5, 5.1, 5.01",
        dishes_cook_measurement_field_title: "Одиниці вимірювання",
        dishes_cook_calc_btn: "Порахувати",
        dishes_cook_cancel_btn: "Скасувати",
        dishes_cook_reset_btn: "Скинути",

        remove_ingredient_popup_title: "Видалити інгредієнт",
        remove_ingredient_popup_ask_prefix:
          "Ви впевнені, що хочете видалити інгредієнт - ",
        remove_ingredient_popup_remove_btn: "Видалити",
        remove_ingredient_popup_cancel_btn: "Скасувати",

        dish_remove_popup_title: "Видалити страву",
        dish_remove_popup_msg_prefix:
          "Ви впевнені, що хочете видалити страву -",
        dish_remove_popup_remove_btn: "Видалити",
        dish_remove_popup_cancel_btn: "Скасувати",

        dish_edit_page_title_pattern: "Редагувати :name",

        dish_validation_name_req: "Необхідно вказати назву",
        dish_validation_name_max: "Максимальна довжина 255",
        dish_validation_notes_max: "Максимальна довжина 3000",
        dish_ingredients_validation_req:
          "Страва повинна містити хоча б один інгредієнт",

        ingredient_validation_name_req: "Необхідно вказати назву",
        ingredient_validation_name_max: "Максимальна довжина 255",
        ingredient_validation_number_req: "Необхідно вказати кількість",
        ingredient_validation_number_format:
          "Введіть число, формати: 5, 5.1, 5.01",
      },
    },
  },
});

export default i18n;
