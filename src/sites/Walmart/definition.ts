import { Browser } from "puppeteer";
import {
  createBlueprint,
  SubTask,
  SubTaskFactory,
} from "../../core/subtask-definition";
import { NextTask, Status, WalmartTasks } from "../../fixtures/enums";
import { Task } from "../../task";
import {
  getCurrentPage,
  clickXPath,
  typeXPath,
  waitTillHTMLRendered,
  waitandRefreshForElement,
} from "../../utils/_puppeteerUtils";

//initialize page
const intializePage = async (
  options: Ninja.TaskOptions,
  browser: Browser
): Promise<Ninja.TaskResult> => {
  const page = await getCurrentPage(browser);

  if (options.ProductInfo?.url) {
    await page.goto(options.ProductInfo?.url);
    await page.waitForTimeout(1000);
    return {
      status: Status.PAGE_LOADED,
      nextTask: NextTask.NEXT,
      terminate: false,
    };
  } else {
    return { status: Status.STOPPED, nextTask: NextTask.STOP, terminate: true };
  }
};

//login
const loginWalmart = async (
  options: Ninja.TaskOptions,
  browser: Browser
): Promise<Ninja.TaskResult> => {
  const page = await getCurrentPage(browser);
  await clickXPath(page, `//*[@id="vh-account-menu-root"]/div[2]/div/a[1]`);
  await typeXPath(page, `//*[@id="email"]`, options.AccountInfo?.username);
  await typeXPath(page, `//*[@id="password"]`, options.AccountInfo?.password);
  await clickXPath(page, `//*[@id="sign-in-form"]/button[1]`);

  return {
    status: Status.LOGGED_IN,
    nextTask: NextTask.NEXT,
    terminate: false,
  };
};
//availability
const checkAvailability = async (
  options: Ninja.TaskOptions,
  browser: Browser
): Promise<Ninja.TaskResult> => {
  const page = await getCurrentPage(browser);
  await page.waitForNavigation();
  await waitandRefreshForElement(
    page,
    `//*[@id="add-on-atc-container"]/div[1]/section/div[1]/div[3]/button`
  );

  return {
    status: Status.LOGGED_IN,
    nextTask: NextTask.NEXT,
    terminate: false,
  };
};
//add to cart
const addToCart = async (
  options: Ninja.TaskOptions,
  browser: Browser
): Promise<Ninja.TaskResult> => {
  const page = await getCurrentPage(browser);

  await clickXPath(
    page,
    `//*[@id="add-on-atc-container"]/div[1]/section/div[1]/div[3]/button`
  );

  return {
    status: Status.ADD_TO_CART,
    nextTask: NextTask.NEXT,
    terminate: false,
  };
};

//check out
const checkout = async (
  options: Ninja.TaskOptions,
  browser: Browser
): Promise<Ninja.TaskResult> => {
  const page = await getCurrentPage(browser);
  let checkoutInitialized = false;
  while (!checkoutInitialized) {
    await page.waitForNavigation();
    await clickXPath(
      page,
      `//*[@id="cart-root-container-content-skip"]/div[1]/div/div[2]/div/div/div/div/div[3]/div/div/div[2]/div[1]/div[2]/div/button[1]`
    );
    await page.waitForNavigation();
    const hasError = await page.$x(`//*[@id="CXO-modal-generic-dialog"]/span`);
    if (hasError.length) {
      await clickXPath(
        page,
        `/html/body/div[1]/div/div[3]/div[2]/div/div/div[2]/button`
      );
    } else {
      checkoutInitialized = true;
    }
  }

  return {
    status: Status.INIT_CHECKOUT,
    nextTask: NextTask.NEXT,
    terminate: false,
  };
};

//delivery options
const selectDelivery = async (
  options: Ninja.TaskOptions,
  browser: Browser
): Promise<Ninja.TaskResult> => {
  const page = await getCurrentPage(browser);
  await clickXPath(
    page,
    `/html/body/div[1]/div/div[1]/div/div[1]/div[3]/div/div/div/div[1]/div/div[2]/div/div/div/div[3]/div/div/div[3]/button`
  );

  return {
    status: Status.SELECT_DELIVERY,
    nextTask: NextTask.NEXT,
    terminate: false,
  };
};

//address
const inputDeliveryAddress = async (
  options: Ninja.TaskOptions,
  browser: Browser
): Promise<Ninja.TaskResult> => {
  const page = await getCurrentPage(browser);
  await clickXPath(
    page,
    `/html/body/div[1]/div/div[1]/div/div[1]/div[3]/div/div/div/div[2]/div[1]/div[2]/div/div/div/div[3]/div/div/div/div/div[3]/div[2]/button`
  );

  return {
    status: Status.INPUT_DELIVERY_ADDRESS,
    nextTask: NextTask.NEXT,
    terminate: false,
  };
};

//payment method
const inputPaymentMethod = async (
  options: Ninja.TaskOptions,
  browser: Browser
): Promise<Ninja.TaskResult> => {
  const page = await getCurrentPage(browser);
  await clickXPath(page, `//*[@id="payment-option-radio-2"]`);

  await clickXPath(
    page,
    `//*[@id="paypal-animation-content"]/div[1]/div[1]/div`
  );

  return {
    status: Status.INPUT_DELIVERY_ADDRESS,
    nextTask: NextTask.NEXT,
    terminate: false,
  };
};

//place order
//terminate
const confirmCheckout = async (
  options: Ninja.TaskOptions,
  browser: Browser
): Promise<Ninja.TaskResult> => {
  const page = await getCurrentPage(browser);

  return {
    status: Status.CHECKOUT_SUCCESS,
    nextTask: NextTask.STOP,
    terminate: true,
  };
};

const bluePrints: Ninja.SubTaskBluePrint[] = [];

bluePrints.push(createBlueprint(WalmartTasks.INITIALIZE, intializePage));
bluePrints.push(createBlueprint(WalmartTasks.LOGIN, loginWalmart));
bluePrints.push(
  createBlueprint(WalmartTasks.CHECK_AVAILABILITY, checkAvailability)
);
bluePrints.push(createBlueprint(WalmartTasks.ADD_TO_CART, addToCart));
//bluePrints.push(createBlueprint(WalmartTasks.CONFIRM_CHECKOUT, confirmCheckout));
bluePrints.push(createBlueprint(WalmartTasks.INIT_CHECKOUT, checkout));

bluePrints.push(createBlueprint(WalmartTasks.SELECT_DELIVERY, selectDelivery));

bluePrints.push(
  createBlueprint(WalmartTasks.SELECT_DELIVERY, inputDeliveryAddress)
);

bluePrints.push(createBlueprint(WalmartTasks.PAYMENT, inputPaymentMethod));
//we should check these tasks have all unique keys in the factory
const subTasks = SubTaskFactory(bluePrints);

export const purchaseWalmart = new Task(
  subTasks,
  subTasks.values().next().value
);
