export const formatPrice = (price: string) => {
    const amount = parseFloat(price);

    const formattedPrice = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(amount);

    return formattedPrice
};

export const removeDollarSign = (price: string) => {
    return price.slice(1);
};

export const subCurrencyPrice = (price: string) => {
    return Math.round(Number(price) * 100);
};

export const price = (amount: string) => {
    const str = removeDollarSign(amount);
    return formatPrice(str);
}