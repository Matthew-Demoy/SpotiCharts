declare namespace Ninja {
  interface subTask {
    definition: (any: any) => any;
    routine: (any: any) => any;
    fallbacks: fallBack[];
  }

  type SubTaskBluePrint = {
    name: string;
    execute: ExecuteFunction;
  };

  interface TaskResult {
    status: Status;
    nextTask: string;
    terminate: boolean;
  }

  interface FallBack {
    errorQueury: (any: any) => boolean;
    fallbackKey: string;
  }

  type AsyncFunction = () => Promise<any>;

  type ExecuteFunction = (
    options: TaskOptions,
    browser: Browser
  ) => Promise<TaskResult>;

  interface ProductInfo {
    url: string;
    quantity: number;
  }
  interface AccountInfo {
    username: string;
    password: string;
  }
  interface PaymentInfo {
    number: string;
    expiryMonth: string;
    expiryYear: string;
    CVV: string;
  }
  interface ShipmentInfo {
    FirstName: string;
    LastName: string;
    Address: string;
    Address2: string;
    ZipCode: string;
    PhoneNumber: string;
    City: string;
    Country: string;
    State: string;
  }

  interface TaskOptions {
    ProductInfo: ProductInfo;
    AccountInfo: AccountInfo;
    PaymentInfo: PaymentInfo;
    ShipmentInfo: ShipmentInfo;
  }

  interface TrackEntity {
    id: number;

    name: string;

    artists: Artist;

    spotifyId: string;

    href: string;
  }

  interface SearchResult {
    tracks: {
      items: {
        name: string,
        uri: string,
        artists: {
          name: string
        }[]
      }[]
    }
  }
}
