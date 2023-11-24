import noPhoto from "@assets/images/no_photo.png";
import { useGetMeasurements } from "@features/measurement/hooks/useGetMeasurements";
import { useEffect, useRef, useState } from "react";
import {
  DishIngredientRemoveModal,
  DishIngredientRemoveModalParams,
} from "../DishIngredientRemoveModal";
import { useFieldArray, useForm } from "react-hook-form";
import {
  AddDishDto,
  AddIngredientDto,
  MeasurementPresenter,
} from "@api/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDishSchema } from "../validation/addDishSchema";
import { NotFound } from "components/NotFound";
import { useAddDish } from "@features/dish/hooks/useAddDish";
import { LabeledField } from "components/Form/LabeledField";
import { FormInput } from "components/Form/FormInput";
import { TrashIcon } from "@heroicons/react/20/solid";
import { SelectOnFieldLabeled } from "components/Form/SelectOnFieldLabeled";
import { FormSelect } from "components/Form/FormSelect";
import { Button } from "components/Button";
import { Paths } from "pages/Paths";
import { useNavigate } from "react-router-dom";
import { useGetUserInfo } from "hooks/useGetUserInfo";
import { useMainButton } from "hooks/useMainButton";
import { Loader } from "components/Loader";

export const AddDish = (): JSX.Element => {
  const { data: measurements, isLoading, error } = useGetMeasurements();

  const { mutateAsync } = useAddDish();

  const navigate = useNavigate();

  const { data: userData } = useGetUserInfo();
  const userId = userData?.id || 0;

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
  } = useForm<AddDishDto>({
    resolver: zodResolver(addDishSchema),
    defaultValues: {
      name: "",
      notes: "",
      userId: userId,
      ingredients: [
        {
          name: "",
          number: "",
        },
      ],
    },
  });

  const { fields, remove, append } = useFieldArray<AddDishDto>({
    control,
    name: "ingredients",
  });

  const submitButton = useRef<HTMLButtonElement>(null);

  const mainButton = useMainButton({
    text: "Save",
    clickHandler: () => submitButton.current?.click(),
  });

  useEffect(() => {
    isLoading ? mainButton.hide() : mainButton.show();
  }, [isLoading]);

  if (isLoading) return <Loader />;

  if (error) {
    return <NotFound message={error.message} />;
  }

  if (userId <= 0) {
    return <>Access denied</>;
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

    const newIngredient: AddIngredientDto = {
      name: "",
      number: "",
      measurementId: measurements[0].id,
    };

    append(newIngredient);
  };

  const onSubmit = async (data: AddDishDto) => {
    try {
      const dish = await mutateAsync(data);
      if (!dish?.id) {
        console.log("mutateAsync dish: ", dish);
        return;
      }
      navigate(Paths.compileDishUrl(dish.id), { replace: true });
    } catch (error) {
      console.log("mutateAsync error: ", error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight mb-3">
        {Paths.ADD_DISH_PAGE_TITLE}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
          <img
            src={noPhoto}
            alt="Add new dish"
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4">
          <LabeledField text="Name">
            <FormInput
              register={register}
              regName="name"
              autoComplete="false"
              type="text"
              placeholder="Enter name"
              defaultValue=""
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
              autoComplete="false"
              placeholder="Enter notes"
              className="w-full h-40 border-0 py-1.5 pl-2 pr-2 text-sm focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-300"
              defaultValue=""
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
                    <div className="px-0 py-2 relative w-full">
                      {fields.length > 1 && (
                        <TrashIcon
                          className="absolute h-4 max-w-4 top-2 right-2 cursor-pointer"
                          onClick={() => openRemoveIngredientModal(index)}
                        />
                      )}
                      <LabeledField text="Name">
                        <FormInput
                          register={register}
                          regName={`ingredients.${index}.name`}
                          type="text"
                          autoComplete="false"
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
                          autoComplete="false"
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
};
