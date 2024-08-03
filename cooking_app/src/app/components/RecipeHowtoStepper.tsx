import React from 'react'


const RecipeHowtoStepper = ({
    howtoSize,
    order,
}: {
    howtoSize: number,
    order: number,
}) => {

  const completedOrders: number[] = Array.from({ length: order - 1 }, (_, i) => i + 1);
  const unfinishedOrders: number[] = Array.from({ length: howtoSize - order }, (_, i) => i + 2);

    return (
        <div dataHsStepper={`{ "currentIndex": ${order} }`}>
            <ul className="relative flex flex-row gap-x-2">
              {completedOrders.map((completedOrder, index) => (
                <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group success" dataHsStepperNavItem={`{ "index": ${index}, "isCompleted": true }`}>
                  <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
                    <span className="size-7 flex justify-center items-center shrink-0 bg-peach font-medium text-babypowder rounded-full hs-stepper-active:bg-xanthoussaturated hs-stepper-active:text-babypowder hs-stepper-success:bg-xanthous hs-stepper-success:text-babypowder hs-stepper-completed:bg-xanthous">
                      <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">{completedOrder}</span>
                      <svg className="hidden shrink-0 size-3 hs-stepper-success:block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                  </span>
                  <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-xanthous hs-stepper-completed:bg-xanthous"></div>
                </li> 
              ))}
              
          
              <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group active" dataHsStepperNavItem={`{ "index": ${order} }`}>
                <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
                  <span className="size-7 flex justify-center items-center shrink-0 bg-peach font-medium text-babypowder rounded-full hs-stepper-active:bg-xanthoussaturated hs-stepper-active:text-babypowder hs-stepper-success:bg-xanthous hs-stepper-success:text-babypowder hs-stepper-completed:bg-xanthous">
                    <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">{order}</span>
                    <svg className="hidden shrink-0 size-3 hs-stepper-success:block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                </span>
                <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-xanthous hs-stepper-completed:bg-xanthous dark:bg-neutral-700 dark:hs-stepper-success:bg-xanthous dark:hs-stepper-completed:bg-teal-600"></div>
              </li>
              {unfinishedOrders.map((unfinishedOrder, index) => (
                <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group" dataHsStepperNavItem={`{ "index": ${index + order} }`}>
                  <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
                    <span className="size-7 flex justify-center items-center shrink-0 bg-peach font-medium text-babypowder rounded-full group-focus:bg-gray-200 hs-stepper-active:bg-xanthoussaturated hs-stepper-active:text-babypowder hs-stepper-success:bg-xanthous hs-stepper-success:text-babypowder hs-stepper-completed:bg-xanthous">
                      <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">{unfinishedOrder}</span>
                      <svg className="hidden shrink-0 size-3 hs-stepper-success:block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                  </span>
                  <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-xanthous hs-stepper-completed:bg-xanthous"></div>
                </li>
              ))}
              
            </ul>
        </div>
    )
}

export default RecipeHowtoStepper