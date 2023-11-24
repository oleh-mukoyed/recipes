import { DishPresenter, IngredientPresenter } from "@api/generated";
import { Dialog, Transition } from "@headlessui/react";
import { CalculatorIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { Button, ButtonTypes } from "components/Button";
import { Input } from "components/Form/Input";
import { Select } from "components/Form/Select";
import { SelectOnFieldLabeled } from "components/Form/SelectOnFieldLabeled";
import { useMainButton } from "hooks/useMainButton";
import { ChangeEvent, Fragment, useEffect, useState } from "react";

interface Cook {
  number: string;
  measurementId: number;
  measurementShortName: string;
}

interface MeasurementsOptions {
  [key: number]: { value: string; name: string };
}

interface Calc {
  index: number;
  item: IngredientPresenter;
  measurementsOptions: MeasurementsOptions;
}

export function CookDishModal({ dish }: { dish: DishPresenter }): JSX.Element {
  const [openCookModal, setOpenCookModal] = useState(false);

  const mainButton = useMainButton({
    text: "Cook",
    clickHandler: cookButtonHandler,
  });

  useEffect(() => {
    mainButton.show();
  }, []);

  const [checked, setChecked] = useState(
    new Array<boolean>().fill(false, 0, dish.ingredients.length - 1)
  );

  const [openCalcModal, setOpenCalcModal] = useState(false);
  const [calcItem, setCalcItem] = useState<Calc | null>(null);
  const [calculated, setCalculated] = useState(false);
  const [calcNumber, setCalcNumber] = useState("");
  const [calcMeasurement, setCalcMeasurement] = useState(0);

  const initialCookValues = dish.ingredients.map((ingredient) => ({
    number: ingredient.number,
    measurementId: ingredient.measurement.id,
    measurementShortName: ingredient.measurement.shortName,
  }));
  const [cook, setCook] = useState<Array<Cook>>(initialCookValues);

  const checkedClass = "bg-green-200 bg-opacity-75 transition-opacity ";

  const checkHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const rows = [...checked];
    rows[index] = e.target.checked;
    setChecked(rows);
  };

  const clickCalcHandler = (index: number, item: IngredientPresenter) => {
    const calcMeasurement = item.measurement;
    const calcMeasurementOptions: MeasurementsOptions = {};
    calcMeasurementOptions[calcMeasurement.id] = {
      value: calcMeasurement.id.toString(),
      name: calcMeasurement.shortName,
    };
    if (calcMeasurement.child) {
      calcMeasurementOptions[calcMeasurement.child.id] = {
        value: calcMeasurement.child.id.toString(),
        name: calcMeasurement.child.shortName,
      };
    }
    if (calcMeasurement.parent) {
      calcMeasurementOptions[calcMeasurement.parent.id] = {
        value: calcMeasurement.parent.id.toString(),
        name: calcMeasurement.parent.shortName,
      };
    }

    setCalcItem({
      index: index,
      item: item,
      measurementsOptions: calcMeasurementOptions,
    });
    setCalcNumber(cook[index].number);
    setCalcMeasurement(cook[index].measurementId);
    setOpenCalcModal(true);
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

  const calc = () => {
    if (!calcItem) return;

    const measurement = calcItem.measurementsOptions[calcMeasurement];

    const number = parseFloat(calcNumber);
    const numberBefore = parseFloat(dish.ingredients[calcItem.index].number);

    if (
      number.toString() === dish.ingredients[calcItem.index].number &&
      measurement.value === cook[calcItem.index].measurementId.toString()
    ) {
      reset();
      setOpenCalcModal(false);
      return;
    }

    let multiplier = number / numberBefore;
    //if change measurement to higher
    if (
      calcMeasurement === calcItem.item.measurement?.parent?.id &&
      calcItem.item.measurement.parent?.childMultiplier
    ) {
      multiplier =
        (number * calcItem.item.measurement.parent.childMultiplier) /
        numberBefore;
      //if change measurement to lower
    } else if (
      calcMeasurement === calcItem.item.measurement.child?.id &&
      calcItem.item.measurement.childMultiplier
    ) {
      multiplier =
        number / calcItem.item.measurement.childMultiplier / numberBefore;
    }

    const cookUpdate: Array<Cook> = initialCookValues.map((c, index) => {
      if (index === calcItem.index) {
        return {
          ...c,
          number: number.toString(),
          measurementId: +measurement.value,
          measurementShortName: measurement.name,
        };
      } else {
        let newVal = parseFloat(c.number) * multiplier;

        const itemMeasurement = dish.ingredients[index].measurement;
        let measurementId = +itemMeasurement.id;
        let measurementName = itemMeasurement.shortName;

        if (
          itemMeasurement?.parent &&
          itemMeasurement?.parent?.childMultiplier &&
          newVal > itemMeasurement.parent.childMultiplier
        ) {
          newVal = newVal / itemMeasurement.parent.childMultiplier;
          measurementId = itemMeasurement.parent.id;
          measurementName = itemMeasurement.parent.shortName;
        }

        newVal = parseFloat(newVal.toFixed(2));

        return {
          ...c,
          number: newVal.toString(),
          measurementId: measurementId,
          measurementShortName: measurementName,
        };
      }
    });

    setCalculated(true);
    setCook(cookUpdate);
    setOpenCalcModal(false);
  };

  const reset = () => {
    setCalculated(false);
    setCook(initialCookValues);
    setCalcItem(null);
    setCalcNumber("");
    setCalcMeasurement(0);
  };

  const cancelModalHandler = () => {
    setOpenCookModal(false);
    mainButton.show();
  };

  function cookButtonHandler() {
    setOpenCookModal(true);
    mainButton.hide();
  }

  return (
    <>
      <Transition.Root show={openCookModal} as={Fragment}>
        <Dialog static as="div" className="relative z-10" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center py-4 px-2 text-center items-center sm:p-0 w-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                        <CalculatorIcon
                          // className="h-6 w-6 text-green-600"
                          className="h-6 w-6 tg-button_bg_as_color"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {dish.name}
                        </Dialog.Title>
                        <div className="mt-2 divide-y divide-gray-300">
                          {dish.ingredients.map((ingredient, index) => {
                            const isChecked = checked[index];
                            const addClass = isChecked ? checkedClass : "";

                            return (
                              <div
                                key={index}
                                className={
                                  addClass +
                                  "justify-between items-center pt-2 mb-2 mt-2 grid grid-cols-12 text-gray-900"
                                }
                              >
                                <div className="text-left items-center flex">
                                  <input
                                    autoFocus={false}
                                    type="checkbox"
                                    className="cursor-pointer w-5 h-5"
                                    onChange={(e) => checkHandler(e, index)}
                                  ></input>
                                </div>
                                <div className="text-left col-span-8 text-sm items-center flex">
                                  {ingredient.name}
                                </div>
                                <div className="col-span-2 text-right font-bold text-sm">
                                  {calculated ? (
                                    <>
                                      <div className="line-through text-gray-500">
                                        {ingredient.number}
                                        {ingredient.measurement.shortName}
                                        {"."}
                                      </div>
                                      <div>
                                        {cook[index].number}
                                        {cook[index].measurementShortName}
                                        {"."}
                                      </div>
                                    </>
                                  ) : (
                                    <div>
                                      {ingredient.number}
                                      {ingredient.measurement.shortName}
                                      {"."}
                                    </div>
                                  )}
                                </div>
                                <div className="text-right">
                                  <PencilSquareIcon
                                    // className="h-4 w-auto inline-block cursor-pointer text-green-600"
                                    className="h-6 w-auto inline-block cursor-pointer tg-button_bg_as_color"
                                    onClick={() =>
                                      clickCalcHandler(index, ingredient)
                                    }
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {calculated && (
                      <Button
                        text="Reset"
                        addClass="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto"
                        onClick={reset}
                      />
                      // <button
                      //   type="button"
                      //   className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      //   onClick={reset}
                      // >
                      //   Reset
                      // </button>
                    )}
                    {/* <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={cancelModalHandler}
                    >
                      Cancel
                    </button> */}
                    <Button
                      text="Cancel"
                      onClick={cancelModalHandler}
                      btnType={ButtonTypes.other}
                      addClass="mt-3 inline-flex w-full justify-center"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {calcItem && (
        <Transition.Root show={openCalcModal} as={Fragment}>
          <Dialog
            static
            as="div"
            className="relative z-10"
            onClose={() => null}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                          <CalculatorIcon
                            className="h-6 w-6 tg-button_bg_as_color"
                            aria-hidden="true"
                          />
                        </div>

                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Calculate ingredients by: {calcItem.item.name}
                          </Dialog.Title>
                          <div className="mt-2 text-gray-900">
                            <div>
                              Initial value:{" "}
                              <span className="font-semibold">
                                {calcItem.item.number}
                                {calcItem.item.measurement.shortName}
                                {"."}
                              </span>
                            </div>
                            <div className="relative mt-2 rounded-md shadow-sm">
                              <Input
                                type="text"
                                autoFocus={false}
                                placeholder="Enter number, formats: 5, 5.1, 5.01"
                                defaultValue={calcNumber}
                                onBeforeInput={(e) => formatNumber(e)}
                                onChange={(e) => setCalcNumber(e.target.value)}
                              />
                              <SelectOnFieldLabeled text="Measurement">
                                <Select
                                  options={Object.values(
                                    calcItem.measurementsOptions
                                  )}
                                  defaultValue={calcMeasurement}
                                  onChange={(e) =>
                                    setCalcMeasurement(parseInt(e.target.value))
                                  }
                                />
                              </SelectOnFieldLabeled>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <Button
                        text="Calc"
                        addClass="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto"
                        onClick={calc}
                      />
                      <Button
                        text="Cancel"
                        onClick={() => setOpenCalcModal(false)}
                        btnType={ButtonTypes.other}
                        addClass="mt-3 inline-flex w-full justify-center"
                      />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}
