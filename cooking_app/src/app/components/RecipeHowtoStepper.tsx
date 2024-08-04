import React from 'react'


const RecipeHowtoStepper = ({
  howtoSize,
  order,
}: {
  howtoSize: number,
  order: number,
}) => {

  let completedOrders: number[] = []
  let unfinishedOrders: number[] = []
  let startIsFolded: boolean = false
  let endIsFolded: boolean = false

  if (howtoSize > 20) {
    if (order == 1) {
      completedOrders = [];
      unfinishedOrders = Array.from({ length: 18 }, (_, i) => i + order + 1);
      startIsFolded = false;
      endIsFolded = true;
    } else if (order == 2) {
      completedOrders = [1];
      unfinishedOrders = Array.from({ length: 17 }, (_, i) => i + order + 1);
      startIsFolded = false;
      endIsFolded = true;
    } else if (howtoSize - order > 17) {
      completedOrders = [order - 1];
      unfinishedOrders = Array.from({ length: 16 }, (_, i) => i + order + 1);
      startIsFolded = true;
      endIsFolded = true;
    } else if (howtoSize - order == 17) {
      completedOrders = [order - 1];
      unfinishedOrders = Array.from({ length: 17 }, (_, i) => i + order + 1);
      startIsFolded = true;
      endIsFolded = false;
    } else {
      completedOrders = Array.from({ length: order - 14 }, (_, i) => i + howtoSize - 17);
      unfinishedOrders = Array.from({ length: howtoSize - order }, (_, i) => i + order + 1);
      startIsFolded = true;
      endIsFolded = false;
    }
  } else {
    if (order == 1) {
      completedOrders = [];
    } else {
      completedOrders = Array.from({ length: order - 1 }, (_, i) => i + 1);
    }
    unfinishedOrders = Array.from({ length: howtoSize - order }, (_, i) => i + order + 1);
  }

  return (
    <div data-hs-stepper={`{ "currentIndex": ${order + (startIsFolded ? 1 : 0)} }`} className="mx-4">
      <ul className="relative flex flex-wrap gap-x-2">

        {startIsFolded && (
          <li className="flex items-center gap-x-2 py-0.5 shrink basis-0 flex-1 group" data-hs-stepper-nav-item='{ "index": 1 }'>
            <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
              <span className="size-7 flex justify-center items-center shrink-0 bg-xanthous font-medium text-babypowder rounded-full hs-stepper-active:bg-xanthoussaturated hs-stepper-active:text-babypowder hs-stepper-success:bg-xanthous hs-stepper-success:text-babypowder hs-stepper-completed:bg-xanthous">
                <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">...</span>
              </span>
            </span>
          </li>
        )}

      {completedOrders.map((completedOrder, index) => (
        <li className="flex items-center gap-x-2 py-0.5 shrink basis-0 flex-1 group success" data-hs-stepper-nav-item={`{ "index": ${index + 1 + (startIsFolded ? 1 : 0)}, "isCompleted": true}`} key={index}>
          <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
            <span className="size-7 flex justify-center items-center shrink-0 bg-peach font-medium text-babypowder rounded-full hs-stepper-active:bg-xanthoussaturated hs-stepper-active:text-babypowder hs-stepper-success:bg-xanthous hs-stepper-success:text-babypowder hs-stepper-completed:bg-xanthous">
              <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">{completedOrder}</span>
              <svg className="hidden shrink-0 size-3 hs-stepper-success:block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          </span>
        </li>
      ))}


      <li className="flex items-center gap-x-2 py-0.5 shrink basis-0 flex-1 group active" data-hs-stepper-nav-item={`{ "index": ${order} }`}>
        <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
          <span className="size-7 flex justify-center items-center shrink-0 bg-peach font-medium text-babypowder rounded-full hs-stepper-active:bg-xanthoussaturated hs-stepper-active:text-babypowder hs-stepper-success:bg-xanthous hs-stepper-success:text-babypowder hs-stepper-completed:bg-xanthous">
            <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">{order}</span>
            <svg className="hidden shrink-0 size-3 hs-stepper-success:block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
        </span>
      </li>

      {unfinishedOrders.map((unfinishedOrder, index) => (
        <li className="flex items-center gap-x-2 py-0.5 shrink basis-0 flex-1 group" data-hs-stepper-nav-item={`{ "index": ${index + order + 1} }`} key={index}>
          <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
            <span className="size-7 flex justify-center items-center shrink-0 bg-peach font-medium text-babypowder rounded-full group-focus:bg-gray-200 hs-stepper-active:bg-xanthoussaturated hs-stepper-active:text-babypowder hs-stepper-success:bg-xanthous hs-stepper-success:text-babypowder hs-stepper-completed:bg-xanthous">
              <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">{unfinishedOrder}</span>
              <svg className="hidden shrink-0 size-3 hs-stepper-success:block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          </span>
        </li>
      ))}

      {endIsFolded && (
        <li className="flex items-center gap-x-2 py-0.5 shrink basis-0 flex-1 group" data-hs-stepper-nav-item='{"index": 20 }'>
          <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
            <span className="size-7 flex justify-center items-center shrink-0 bg-peach font-medium text-babypowder rounded-full group-focus:bg-gray-200 hs-stepper-active:bg-xanthoussaturated hs-stepper-active:text-babypowder hs-stepper-success:bg-xanthous hs-stepper-success:text-babypowder hs-stepper-completed:bg-xanthous">
              <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">...</span>
              <svg className="hidden shrink-0 size-3 hs-stepper-success:block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          </span>
        </li>
      )}

      </ul >
    </div >
  )
}

export default RecipeHowtoStepper