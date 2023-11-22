import {
  DishPresenter,
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
import { mapDishPresenterToUpdateDishDto } from "@features/dish/mappers/mapDishPresenterToUpdateDishDto";
import { TrashIcon } from "@heroicons/react/20/solid";
import { Button, ButtonTypes } from "components/Button";
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
import { useGetUserInfo } from "hooks/useGetUserInfo";
import { useGetUserDish } from "@features/dish/hooks/useGetUserDish";
import { Paths } from "pages/Paths";
import { useMainButton } from "hooks/useMainButton";
import { DEFAULT_BUTTON_COLOR } from "data/constants";
import { Loader } from "components/Loader";

export function DishEditForm(): JSX.Element {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: userData } = useGetUserInfo();
  const userId = userData?.id || 0;

  const {
    data: dish,
    isLoading: isLoadingDish,
    error: dishError,
  } = useGetUserDish(Number(id), userId, !!userId);

  const { mutateAsync } = useUpdateDish();

  const {
    data: measurements,
    isLoading,
    error,
  } = useGetMeasurements(!!dish?.id);

  const dishUpdateDto = mapDishPresenterToUpdateDishDto(dish as DishPresenter);

  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [modalParams, setModalParams] =
    useState<DishIngredientRemoveModalParams>({
      name: "",
      index: 0,
    });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    control,
  } = useForm<UpdateDishDto>({
    resolver: zodResolver(updateDishSchema),
    defaultValues: dishUpdateDto,
  });

  const { fields, remove, append } = useFieldArray<UpdateDishDto>({
    control,
    name: "ingredients",
  });

  const submitButton = useRef<HTMLButtonElement>(null);

  const mainButton = useMainButton({
    text: "Save",
    hideAfterClick: false,
    color: DEFAULT_BUTTON_COLOR,
    clickHandler: () => submitButton.current?.click(),
  });

  useEffect(() => {
    isLoading ? mainButton.hide() : mainButton.show();
  }, [isLoading]);

  if (isLoading || isLoadingDish) return <Loader />;

  if (error || dishError) {
    const e = error || dishError;
    return <NotFound message={e!.message} />;
  }

  if (!dish) {
    return <NotFound message="Dish not found" />;
  }

  if (!Array.isArray(measurements) || !measurements.length) {
    return <NotFound message="Load data Error" />;
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
      navigate(Paths.compileDishUrl(dish.id));
    } catch (error) {
      console.log("mutateAsync error: ", error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight mb-3">{dish.name}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
          <img
            src={noPhoto}
            alt={dishUpdateDto.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4">
          <input
            type="hidden"
            defaultValue={dishUpdateDto.id}
            {...register("id", { valueAsNumber: true })}
          ></input>
          <LabeledField text="Name">
            <FormInput
              register={register}
              regName="name"
              type="text"
              placeholder="Enter name"
              defaultValue={dishUpdateDto.name}
            />
          </LabeledField>
          {formErrors.name && (
            <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              {formErrors.name.message}
            </span>
          )}
        </div>
        <div className="mt-4">
          <LabeledField text="Notes">
            <textarea
              {...register("notes")}
              placeholder="Enter notes"
              className="w-full h-40 border-0 py-1.5 pl-2 pr-2 text-sm focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-300"
              defaultValue={dishUpdateDto?.notes || ""}
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
            <h3 className="text-base font-semibold leading-7">Ingredients:</h3>
          </div>
          <div className="mt-2 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {fields.map((ingredient, index) => {
                return (
                  <div className="px-0 pb-2" key={index}>
                    {fields.length > 1 && (
                      <div className="relative w-full">
                        <TrashIcon
                          className="absolute max-h-4 max-w-4 top-2 right-2 cursor-pointer"
                          onClick={() => openRemoveIngredientModal(index)}
                        />
                      </div>
                    )}
                    <div className="px-0 py-2">
                      <input
                        type="hidden"
                        defaultValue={ingredient.id}
                        {...register(`ingredients.${index}.id`, {
                          valueAsNumber: true,
                        })}
                      ></input>
                      <LabeledField text="Name">
                        <FormInput
                          register={register}
                          regName={`ingredients.${index}.name`}
                          type="text"
                          placeholder="Enter name"
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
                      <LabeledField text="Number">
                        <FormInput
                          register={register}
                          regName={`ingredients.${index}.number`}
                          type="text"
                          placeholder="Enter number, formats: 5, 5.1, 5.01"
                          defaultValue={ingredient.number}
                          onBeforeInput={(e) => formatNumber(e)}
                        />
                        <SelectOnFieldLabeled text="Measurement">
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
                  btnType={ButtonTypes.success}
                  text="Add new ingredient"
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
