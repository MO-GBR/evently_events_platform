
// ====== EVENT PARAMS
export type DeleteEventParams = {
    eventId: string
    path: string
};

export type GetAllEventsParams = {
    query: string
    category: string
    limit: number
    page: number
};

export type GetEventsByUserParams = {
    userId: string
    limit?: number
    page: number
};



// ====== ORDER PARAMS
export type CheckoutOrderParams = {
    eventTitle: string
    eventId: string
    price: string
    buyerId: string
};

export type CreateOrderParams = {
    stripeId: string
    eventId: string
    buyerId: string
    totalAmount: string
};

export type GetOrdersByEventParams = {
    eventId: string
    searchString: string
};

export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
};

export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
};

export type PageProps = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};