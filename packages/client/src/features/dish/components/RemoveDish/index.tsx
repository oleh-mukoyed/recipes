import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button, ButtonTypes } from "components/Button";
import { DishPresenter } from "@api/generated";
import { useDeleteDish } from "@features/dish/hooks/useDeleteDish";
import { useNavigate } from "react-router-dom";
import { Paths } from "pages/Paths";
import { useTranslation } from "react-i18next";

export interface DishRemoveModalParams {
  dish: DishPresenter;
}

export function DishRemove({ dish }: DishRemoveModalParams): JSX.Element {
  const { t } = useTranslation();
  const cancelButtonRef = useRef(null);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const { mutateAsync } = useDeleteDish();

  const navigate = useNavigate();

  const deleteDish = async () => {
    try {
      await mutateAsync(dish.id);
      navigate(Paths.DISHES_PAGE);
      return;
    } catch (error) {
      console.log("deleteDish error: ", error);
    }
  };

  return (
    <>
      <Button
        text={t("dish_remove_btn")}
        onClick={() => setOpenRemoveModal(true)}
        btnType={ButtonTypes.danger}
      />
      <Transition.Root show={openRemoveModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setOpenRemoveModal(false)}
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
                          {t("dish_remove_popup_title")}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm tg-hint_color">
                            {t("dish_remove_popup_msg_prefix")}
                            {dish.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button
                      text={t("dish_remove_popup_remove_btn")}
                      onClick={deleteDish}
                      btnType={ButtonTypes.danger}
                      addClass="inline-flex w-full justify-center"
                    />
                    <Button
                      text={t("dish_remove_popup_cancel_btn")}
                      onClick={() => setOpenRemoveModal(false)}
                      ref={cancelButtonRef}
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
    </>
  );
}
