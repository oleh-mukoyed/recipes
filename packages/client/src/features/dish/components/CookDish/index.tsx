import { DishPresenter, IngredientPresenter } from "@api/generated";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { MainButton } from "@twa-dev/types";
import { Button, ButtonTypes } from "components/Button";
import { Input } from "components/Form/Input";
import { Select } from "components/Form/Select";
import { SelectOnFieldLabeled } from "components/Form/SelectOnFieldLabeled";
import React from "react";
import { ChangeEvent, useState } from "react";

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

export function CookDish({
  dish,
  mainButton,
}: {
  dish: DishPresenter;
  mainButton: MainButton;
}): JSX.Element {
  const [checked, setChecked] = useState(
    new Array<boolean>().fill(false, 0, dish.ingredients.length - 1)
  );

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
    mainButton.hide();
  };

  const clearCalcItem = () => {
    setCalcItem(null);
    setCalcNumber("");
    setCalcMeasurement(0);
    mainButton.show();
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
      // setOpenCalcModal(false);
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
    clearCalcItem();
  };

  const reset = () => {
    setCalculated(false);
    setCook(initialCookValues);
    setCalcItem(null);
    setCalcNumber("");
    setCalcMeasurement(0);
  };

  return (
    <>
      <div className="mt-2 divide-y">
        {dish.ingredients.map((ingredient, index) => {
          const isChecked = checked[index];
          const addClass = isChecked ? checkedClass : "";

          return (
            <React.Fragment key={index}>
              <div
                className={
                  addClass +
                  "justify-between items-center py-2 grid grid-cols-12 text-lg"
                }
              >
                <div className="text-left items-center flex">
                  <input
                    autoFocus={false}
                    type="checkbox"
                    className="cursor-pointer w-6 h-6"
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
                    className="h-7 w-auto mb-1 inline-block cursor-pointer tg-button_bg_as_color"
                    onClick={() => clickCalcHandler(index, ingredient)}
                  />
                </div>
              </div>
              {calcItem && calcItem.index === index && (
                <div className="py-3 text-center">
                  <h3 className="text-base font-semibold leading-6">
                    Calculate ingredients by: {calcItem.item.name}
                  </h3>
                  <div className="mt-2 tg-hint_color">
                    <div>
                      Initial value:{" "}
                      <span className="font-semibold">
                        {calcItem.item.number}
                        {calcItem.item.measurement.shortName}
                        {"."}
                      </span>
                    </div>
                    <div className="relative mt-2 mx-4 rounded-md shadow-sm">
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
                          options={Object.values(calcItem.measurementsOptions)}
                          defaultValue={calcMeasurement}
                          onChange={(e) =>
                            setCalcMeasurement(parseInt(e.target.value))
                          }
                        />
                      </SelectOnFieldLabeled>
                    </div>
                    <div className="px-4 py-3 sm:px-6">
                      <Button
                        text="Calc"
                        addClass="w-full rounded-md text-lg shadow-sm"
                        onClick={calc}
                      />
                      <Button
                        text="Cancel"
                        onClick={clearCalcItem}
                        btnType={ButtonTypes.other}
                        addClass="mt-3 text-lg w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {calculated && (
        <div className="mx-4 my-3">
          <Button
            text="Reset"
            addClass="w-full rounded-md font-semibold shadow-sm"
            onClick={reset}
          />
        </div>
      )}
    </>
  );
}
