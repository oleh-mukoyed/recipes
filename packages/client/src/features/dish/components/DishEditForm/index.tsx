import {
  MeasurementPresenter,
  UpdateDishDto,
  UpdateIngredientDto,
} from "@api/generated";
import noPhoto from "@assets/images/no_photo.png";
import { LabeledField } from "components/Form/LabeledField";
import { SelectOnFieldLabeled } from "components/Form/SelectOnFieldLabeled";
import { useEffect, useRef, useState } from "react";
import { useGetMeasurements } from "@features/measurement/hooks/useGetMeasurements";
import { NotFound } from "components/NotFound";
import { TrashIcon } from "@heroicons/react/20/solid";
import { Button } from "components/Button";
import { useUpdateDish } from "@features/dish/hooks/useUpdateDish";
import {
  DishIngredientRemoveModal,
  DishIngredientRemoveModalParams,
} from "../DishIngredientRemoveModal";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "components/Form/FormInput";
import { updateDishSchema } from "../validation/updateDishSchema";
import { FormSelect } from "components/Form/FormSelect";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserDish } from "@features/dish/hooks/useGetUserDish";
import { Paths } from "pages/Paths";
import { useMainButton } from "hooks/useMainButton";
import { Loader } from "components/Loader";
import { useTranslation } from "react-i18next";

export function DishEditForm(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    data: dish,
    isLoading: isLoadingDish,
    error: dishError,
  } = useGetUserDish(Number(id));

  const {
    data: measurements,
    isLoading,
    error,
  } = useGetMeasurements(!!dish?.id);

  const { mutateAsync } = useUpdateDish();

  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [modalParams, setModalParams] =
    useState<DishIngredientRemoveModalParams>({
      name: "",
      index: 0,
    });

  const [loaded, setLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    control,
    setValue,
    reset,
  } = useForm<UpdateDishDto>({
    resolver: zodResolver(updateDishSchema),
  });

  const { fields, remove, append } = useFieldArray<
    UpdateDishDto,
    "ingredients",
    "key"
  >({
    control,
    name: "ingredients",
    keyName: "key",
  });

  const submitButton = useRef<HTMLButtonElement>(null);

  const mainButton = useMainButton({
    text: t("main_button_save"),
    clickHandler: () => submitButton.current?.click(),
  });

  useEffect(() => {
    if (dish && !loaded) {
      setValue("id", dish.id, { shouldDirty: true });
      setValue("name", dish.name, { shouldDirty: true });
      setValue("notes", dish.notes, { shouldDirty: true });

      if (Array.isArray(dish.ingredients)) {
        dish.ingredients.forEach((ingredient) => {
          const newIngredient: UpdateIngredientDto = {
            id: ingredient.id,
            name: ingredient.name,
            number: ingredient.number,
            measurementId: ingredient.measurement.id,
          };

          append(newIngredient);
        });
      }

      setLoaded(true);
    }

    return () => {
      reset();
    };
  }, [dish]);

  useEffect(() => {
    loaded && !isLoadingDish && !isLoading
      ? mainButton.show()
      : mainButton.hide();
  }, [isLoading, loaded, isLoadingDish]);

  if (isLoading || isLoadingDish || !loaded) return <Loader />;

  if (error || dishError) {
    const e = error || dishError;
    return <NotFound message={e!.message} />;
  }

  if (!dish) {
    return <NotFound message={t("dish_not_found")} />;
  }

  if (!Array.isArray(measurements) || !measurements.length) {
    return <NotFound message={t("load_data_error")} />;
  }

  const openRemoveIngredientModal = (index: number) => {
    const ingredient = fields[index];
    setModalParams({ name: ingredient.name, index: index });
    setOpenRemoveModal(true);
  };

  const formatNumber = (
    e: React.FormEvent<HTMLInputElement> & { data?: string }
  ) => {
    const regex = /^(?!0{2,})\d+\.?(\d{1,2})?$/;
    const value = e?.data
      ? e.currentTarget.value + e?.data
      : e.currentTarget.value;
    if (!regex.test(value) && value !== "") {
      e.preventDefault();
      return;
    }
  };

  function removeIngredient(index: number) {
    remove(index);
  }

  const addIngredient = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const newIngredient: UpdateIngredientDto = {
      id: 0,
      name: "",
      number: "",
      measurementId: measurements[0].id,
    };

    append(newIngredient);
  };

  const onSubmit = async (data: UpdateDishDto) => {
    try {
      await mutateAsync(data);
      navigate(-1);
      navigate(Paths.compileDishUrl(dish.id), { replace: true });
    } catch (error) {
      console.log("mutateAsync error: ", error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight mb-3">
        {Paths.compileDishEditTitle(
          t("dish_edit_page_title_pattern"),
          dish.name
        )}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
          <img
            src={noPhoto}
            alt={dish.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4">
          <input
            type="hidden"
            defaultValue={dish.id}
            {...register("id", { valueAsNumber: true })}
          ></input>
          <LabeledField text={t("dishes_name_field_title")}>
            <FormInput
              register={register}
              regName="name"
              autoComplete="false"
              type="text"
              placeholder={t("dishes_name_field_placeholder")}
              defaultValue={dish.name}
            />
          </LabeledField>
          {formErrors.name && (
            <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              {formErrors.name.message}
            </span>
          )}
        </div>
        <div className="mt-4">
          <LabeledField text={t("dishes_notes_field_title")}>
            <textarea
              {...register("notes")}
              autoComplete="false"
              placeholder={t("dishes_notes_field_placeholder")}
              className="w-full h-40 border-0 py-1.5 pl-2 pr-2 text-sm focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-300"
              defaultValue={dish?.notes || ""}
            ></textarea>
          </LabeledField>
          {formErrors.notes && (
            <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              {formErrors.notes.message}
            </span>
          )}
        </div>
        <div>
          <div className="mt-2 px-0">
            <h3 className="text-base font-semibold leading-7">
              {t("dishes_ingredients_title")}
            </h3>
          </div>
          <div className="mt-2 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {fields.map((ingredient, index) => {
                return (
                  <div className="px-0 pb-2" key={index}>
                    <div className="px-0 py-2 relative w-full">
                      {fields.length > 1 && (
                        <TrashIcon
                          className="absolute h-4 max-w-4 top-2 right-2 cursor-pointer"
                          onClick={() => openRemoveIngredientModal(index)}
                        />
                      )}
                      <input
                        type="hidden"
                        defaultValue={ingredient.id}
                        {...register(`ingredients.${index}.id`, {
                          valueAsNumber: true,
                        })}
                      ></input>
                      <LabeledField
                        text={t("dishes_ingredient_name_field_title")}
                      >
                        <FormInput
                          register={register}
                          autoComplete="false"
                          regName={`ingredients.${index}.name`}
                          type="text"
                          placeholder={t(
                            "dishes_ingredient_name_field_placeholder"
                          )}
                          defaultValue={ingredient.name}
                        />
                      </LabeledField>
                      {Array.isArray(formErrors.ingredients) &&
                        formErrors.ingredients[index]?.name && (
                          <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                            {formErrors.ingredients[index].name.message}
                          </span>
                        )}
                    </div>
                    <div className="px-0 py-2">
                      <LabeledField
                        text={t("dishes_ingredient_number_field_title")}
                      >
                        <FormInput
                          register={register}
                          autoComplete="false"
                          regName={`ingredients.${index}.number`}
                          type="text"
                          placeholder={t(
                            "dishes_ingredient_number_field_placeholder"
                          )}
                          defaultValue={ingredient.number}
                          onBeforeInput={(e) => formatNumber(e)}
                        />
                        <SelectOnFieldLabeled
                          text={t("dishes_ingredient_measurement_field_title")}
                        >
                          <FormSelect
                            register={register}
                            regName={`ingredients.${index}.measurementId`}
                            regOptions={{ valueAsNumber: true }}
                            options={measurements.map(
                              (m: MeasurementPresenter) => {
                                return {
                                  value: m.id.toString(),
                                  name: m.shortName,
                                };
                              }
                            )}
                            defaultValue={ingredient.measurementId}
                          />
                        </SelectOnFieldLabeled>
                      </LabeledField>
                      {Array.isArray(formErrors.ingredients) &&
                        formErrors.ingredients[index]?.number && (
                          <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                            {formErrors.ingredients[index].number.message}
                          </span>
                        )}
                      {Array.isArray(formErrors.ingredients) &&
                        formErrors.ingredients[index]?.measurementId && (
                          <div className="mt-2 text-sm text-right text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                            {
                              formErrors.ingredients[index].measurementId
                                .message
                            }
                          </div>
                        )}
                    </div>
                  </div>
                );
              })}
            </dl>
            <div className="text-center">
              <div className="mb-2">
                <Button
                  onClick={(e) => addIngredient(e)}
                  text={t("dishes_add_new_ingredient_btn")}
                  addClass="px-2 py-0.5"
                />
              </div>
              {/* <Button text="Save" type="submit" /> */}
              <button hidden={true} type="submit" ref={submitButton}>
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
      <DishIngredientRemoveModal
        name={modalParams.name}
        index={modalParams.index}
        remove={removeIngredient}
        open={openRemoveModal}
        setOpen={setOpenRemoveModal}
      />
    </>
  );
}
