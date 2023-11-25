import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button, ButtonTypes } from "components/Button";
import { useTranslation } from "react-i18next";

export interface DishIngredientRemoveModalParams {
  name: string;
  index: number;
}

interface DishRemoveModalProps extends DishIngredientRemoveModalParams {
  remove(id: number): void;
  open: boolean;
  setOpen(open: boolean): void;
}

export function DishIngredientRemoveModal({
  name,
  remove,
  index,
  open: openRemoveModal,
  setOpen: setOpenRemoveModal,
}: DishRemoveModalProps): JSX.Element {
  const cancelButtonRef = useRef(null);
  const { t } = useTranslation();

  const removeHandler = () => {
    remove(index);
    setOpenRemoveModal(false);
  };

  return (
    <Transition.Root show={openRemoveModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpenRemoveModal}
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
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {t("remove_ingredient_popup_title")}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm tg-hint_color">
                          {t("remove_ingredient_popup_ask_prefix")}
                          {name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button
                    text={t("remove_ingredient_popup_remove_btn")}
                    btnType={ButtonTypes.danger}
                    addClass="inline-flex w-full justify-center"
                    onClick={removeHandler}
                  />
                  <Button
                    text={t("remove_ingredient_popup_cancel_btn")}
                    btnType={ButtonTypes.other}
                    addClass="mt-3 inline-flex w-full justify-center"
                    onClick={() => setOpenRemoveModal(false)}
                    ref={cancelButtonRef}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
